import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="bg-[#F8F7FC] min-h-screen text-gray-900 font-sans">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center text-[#6D3DF5] hover:text-indigo-600 mb-8 font-medium">
          <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Link>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 tracking-tight">Terms of Service</h1>
          <div className="prose prose-purple max-w-none text-gray-600">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using V-Try, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our application.</p>
            
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. User Conduct and Content</h2>
            <p>You agree to use V-Try responsibly. <strong>Users must not upload inappropriate, explicit, or NSFW (Not Safe For Work) images.</strong> V-Try actively monitors for misuse and retains the right to immediately suspend or terminate accounts that violate these rules without prior notice.</p>
            
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. V-Tokens (Digital Goods)</h2>
            <p>V-Try operates on a token-based system. V-Tokens are digital goods used exclusively within the V-Try platform for image generation and have no real-world monetary value outside the application.</p>
            
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Disclaimer of Warranties</h2>
            <p>The V-Try service is provided strictly on an "as is" and "as available" basis. We make no guarantees regarding the exact visual accuracy of the AI-generated try-on results.</p>
            
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Contact Information</h2>
            <p>For any questions regarding these Terms, contact us at <a href="mailto:rc6542698@gmail.com" className="text-[#6D3DF5] hover:underline">rc6542698@gmail.com</a>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
