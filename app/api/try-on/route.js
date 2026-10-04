import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { userImageUrl, clothingImageUrl } = await request.json();
    
    if (!userImageUrl || !clothingImageUrl) {
      return NextResponse.json(
        { error: 'Both user image and clothing image are required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.LIGHTX_API_KEY;
    if (!apiKey) {
      console.error('LightX API key missing in environment');
      return NextResponse.json(
        { error: 'LightX API key not configured on the server.' },
        { status: 500 }
      );
    }

    // 1. Initial Call to LightX Virtual Try-On API to get orderId
    const initResponse = await fetch('https://api.lightxeditor.com/external/api/v2/aivirtualtryon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      },
      body: JSON.stringify({
        imageUrl: userImageUrl,
        styleImageUrl: clothingImageUrl
      }),
    });

    const initData = await initResponse.json();
    console.log("🚨 LIGHTX RAW INIT RESPONSE:", initData);

    if (!initResponse.ok || (initData.statusCode !== 2000 && initData.statusCode !== 200)) {
      return NextResponse.json(
        { error: initData.message || 'Failed to initialize try-on task' },
        { status: initResponse.status || 500 }
      );
    }

    const orderId = initData.body?.orderId || initData.orderId;
    if (!orderId) {
      return NextResponse.json(
        { error: 'Failed to retrieve orderId from LightX API' },
        { status: 500 }
      );
    }

    console.log(`✅ Task initialized successfully. Order ID: ${orderId}`);

    // 2. Polling loop mechanism
    let attempts = 0;
    const maxAttempts = 24; // 24 attempts * 5 seconds = 120 seconds max timeout
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    while (attempts < maxAttempts) {
      await delay(5000); // 5 seconds wait per poll
      attempts++;
      
      console.log(`⏳ Polling attempt ${attempts} for orderId: ${orderId}...`);

      try {
        // Status check API - LightX requires POST for checking order status
        const statusResponse = await fetch('https://api.lightxeditor.com/external/api/v1/order-status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.LIGHTX_API_KEY
          },
          body: JSON.stringify({
            orderId: orderId
          })
        });

        const statusData = await statusResponse.json();
        const currentStatus = statusData.body?.status;

        console.log(`📊 Status check response:`, statusData);

        if (currentStatus === 'active' || statusData.body?.status === 'completed' || statusData.body?.status === 'success' || statusData.statusCode === 2000) {
           // We might need to handle specific active states. Let's look for output URL.
           const output = statusData.body?.output;
           if (output) {
              return NextResponse.json({ result: output });
           }
        } 
        
        if (currentStatus === 'FAIL' || statusData.statusCode === 5041 || statusData.message === 'INVALID_PROMPTS_DETECTED') {
          return NextResponse.json(
            { error: "Safety Filter Triggered", details: "The AI detected potentially unsafe content or restricted clothing (e.g., too much skin exposure). Please try a different photo." },
            { status: 400 }
          );
        }
        
        if (currentStatus === 'failed') {
          return NextResponse.json(
            { error: 'LightX generation task failed on the server.' },
            { status: 500 }
          );
        }
        
      } catch (pollError) {
        console.error('Error during status polling:', pollError);
        // We continue polling even if one network request fails
      }
    }

    // Timeout reached
    return NextResponse.json(
      { error: 'Generation timed out. Please try again later.' },
      { status: 504 }
    );
    
  } catch (error) {
    console.error('Try-On API Route Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}