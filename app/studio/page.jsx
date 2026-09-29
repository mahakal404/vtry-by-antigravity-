'use client';
import { useState, useRef } from 'react';
import { useHistory } from '@/contexts/HistoryContext';
import { useTokens } from '@/contexts/TokenContext';
import { User, Shirt, Upload, Sparkles, Loader2, Coins } from 'lucide-react';
import { useRouter } from 'next/navigation';

/**
 * Studio Page — Core virtual try-on functionality
 * - Two upload boxes: person photo & clothing item
 * - Full box + icon clickable to open file picker
 * - Try On button triggers simulated processing
 * - Result saved to history via localStorage
 */
export default function Studio() {
  const [personImage, setPersonImage] = useState(null);
  const [clothImage, setClothImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const personInputRef = useRef(null);
  const clothInputRef = useRef(null);
  const { addToHistory } = useHistory();
  const { displayBalance } = useTokens();
  const navigate = useRouter();

  // Handle image selection and convert to data URL for preview
  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'person') setPersonImage(reader.result);
      else setClothImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Simulate virtual try-on processing
  const handleTryOn = async () => {
    if (!personImage || !clothImage) return;

    setIsProcessing(true);
    setResultImage(null);

    // Simulate a 2-second processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create a simulated result by overlaying images on a canvas
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');

    // Load and draw person image
    const personImg = new Image();
    personImg.src = personImage;
    await new Promise(resolve => { personImg.onload = resolve; });

    // Load and draw cloth image
    const clothImg = new Image();
    clothImg.src = clothImage;
    await new Promise(resolve => { clothImg.onload = resolve; });

    // Draw person as background
    ctx.drawImage(personImg, 0, 0, 400, 500);

    // Overlay cloth image with transparency in the center
    ctx.globalAlpha = 0.7;
    const clothW = 200;
    const clothH = 250;
    ctx.drawImage(clothImg, 100, 120, clothW, clothH);
    ctx.globalAlpha = 1.0;

    // Add "V-Try" watermark
    ctx.fillStyle = 'rgba(136, 82, 224, 0.3)';
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('V-Try Result', 200, 480);

    const resultDataUrl = canvas.toDataURL('image/png');
    setResultImage(resultDataUrl);
    setIsProcessing(false);

    // Save result to history (localStorage)
    addToHistory({
      personImage,
      clothImage,
      resultImage: resultDataUrl,
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--color-text)', fontFamily: 'serif' }}>
          V-Try
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>
          Virtual Try-On Experience
        </p>
      </div>

      {/* Upload Boxes */}
      <div className="space-y-4">
        {/* Box 1: Upload Person Image */}
        <div
          onClick={() => personInputRef.current?.click()}
          className="upload-box rounded-2xl p-6 sm:p-8 text-center cursor-pointer"
          style={{ backgroundColor: 'var(--color-card)' }}
        >
          <input
            ref={personInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageUpload(e, 'person')}
          />
          {personImage ? (
            <img src={personImage} alt="Person" className="max-h-48 mx-auto rounded-xl object-contain" />
          ) : (
            <>
              <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3"
                   style={{ backgroundColor: 'rgba(136, 82, 224, 0.15)' }}>
                <User size={24} style={{ color: 'var(--color-primary)' }} />
              </div>
              <h3 className="font-semibold text-base mb-1" style={{ color: 'var(--color-text)' }}>
                Upload Your Image
              </h3>
              <p className="text-xs mb-3" style={{ color: 'var(--color-muted)' }}>
                Tap anywhere to add a photo of yourself
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--color-primary)' }}>
                <Upload size={14} /> Choose Photo
              </span>
            </>
          )}
        </div>

        {/* Box 2: Upload Cloth Image */}
        <div
          onClick={() => clothInputRef.current?.click()}
          className="upload-box rounded-2xl p-6 sm:p-8 text-center cursor-pointer"
          style={{ backgroundColor: 'var(--color-card)' }}
        >
          <input
            ref={clothInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageUpload(e, 'cloth')}
          />
          {clothImage ? (
            <img src={clothImage} alt="Cloth" className="max-h-48 mx-auto rounded-xl object-contain" />
          ) : (
            <>
              <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3"
                   style={{ backgroundColor: 'rgba(220, 82, 150, 0.15)' }}>
                <Shirt size={24} style={{ color: '#dc5296' }} />
              </div>
              <h3 className="font-semibold text-base mb-1" style={{ color: 'var(--color-text)' }}>
                Upload Your Cloth
              </h3>
              <p className="text-xs mb-3" style={{ color: 'var(--color-muted)' }}>
                Tap anywhere to add a clothing item
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--color-primary)' }}>
                <Upload size={14} /> Choose Photo
              </span>
            </>
          )}
        </div>
      </div>

      {/* Token Display */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium"
             style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', color: 'var(--color-muted)' }}>
          <Coins size={14} style={{ color: 'var(--color-primary)' }} />
          <span style={{ color: 'var(--color-primary)' }}>{displayBalance}</span> V-Tokens
        </div>
      </div>

      {/* Try On Button */}
      <button
        onClick={handleTryOn}
        disabled={!personImage || !clothImage || isProcessing}
        className="w-full py-4 rounded-xl text-base font-semibold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: (!personImage || !clothImage || isProcessing)
            ? 'var(--color-border)'
            : 'linear-gradient(135deg, #8852e0, #b47aff)',
        }}
      >
        {isProcessing ? (
          <>
            <Loader2 size={20} className="animate-spin" /> Processing...
          </>
        ) : (
          <>
            <User size={18} /> Try On
            <span className="ml-2 px-2 py-0.5 rounded text-xs font-bold"
                  style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
              Free
            </span>
          </>
        )}
      </button>

      {/* Result Preview Box */}
      <div className="rounded-2xl p-6 sm:p-8 text-center"
           style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
        {isProcessing ? (
          <div className="py-8">
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 pulse-glow"
                 style={{ backgroundColor: 'rgba(136, 82, 224, 0.2)' }}>
              <Loader2 size={28} className="animate-spin" style={{ color: 'var(--color-primary)' }} />
            </div>
            <h3 className="font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Processing...</h3>
            <p className="text-xs" style={{ color: 'var(--color-muted)' }}>Creating your virtual try-on</p>
          </div>
        ) : resultImage ? (
          <div>
            <img src={resultImage} alt="Result" className="max-h-72 mx-auto rounded-xl object-contain mb-3" />
            <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
              Result saved to your History!
            </p>
          </div>
        ) : (
          <>
            <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3"
                 style={{ backgroundColor: 'rgba(136, 82, 224, 0.1)' }}>
              <Sparkles size={24} style={{ color: 'var(--color-muted)' }} />
            </div>
            <h3 className="font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
              Result Preview
            </h3>
            <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
              Upload your photo and clothing, then click "Try On" to see the result here
            </p>
          </>
        )}
      </div>
    </div>
  );
}
