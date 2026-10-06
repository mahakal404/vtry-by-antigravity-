import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function RefundPolicy() {
  return (
    <div className="bg-[#F8F7FC] min-h-screen text-gray-900 font-sans">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center text-[#6D3DF5] hover:text-indigo-600 mb-8 font-medium">
          <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Link>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 tracking-tight">Refund & Cancellation Policy</h1>
          <div className="prose prose-purple max-w-none text-gray-600">
            <div className="bg-purple-50 border-l-4 border-[#6D3DF5] p-4 mb-8 rounded-r-lg">
              <p className="text-gray-900 font-semibold m-0">V-Try sells digital tokens (V-Tokens) for AI generation. Please read our policy carefully before purchasing.</p>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Consumed Tokens (Strictly Non-Refundable)</h2>
            <p>Due to the computationally expensive nature of AI image generation, once V-Tokens are purchased and consumed/used for generation, they are <strong>STRICTLY NON-REFUNDABLE</strong>. By using your tokens to generate images, you acknowledge that the service has been rendered and the digital good has been consumed.</p>
            
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Unused Tokens</h2>
            <p>If you have purchased V-Tokens but have <strong>not used any of them</strong>, you may request a refund within 7 days of the original purchase date. These requests will be evaluated on a case-by-case basis.</p>
            
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Requesting a Refund</h2>
            <p>To request a refund for unused tokens, please email our support team at <a href="mailto:rc6542698@gmail.com" className="text-[#6D3DF5] font-medium hover:underline">rc6542698@gmail.com</a>. Please include your account email address and proof of purchase. We will process your request within 5-7 business days.</p>
            
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Account Suspension</h2>
            <p>If your account is suspended due to a violation of our Terms of Service (e.g., uploading inappropriate content), you forfeit any remaining V-Tokens, and no refunds will be issued.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
