import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#F8F7FC] min-h-screen text-gray-900 font-sans">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center text-[#6D3DF5] hover:text-indigo-600 mb-8 font-medium">
          <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Link>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 tracking-tight">Privacy Policy</h1>
          <div className="prose prose-purple max-w-none text-gray-600">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
            <p>At V-Try, we collect essential information required to provide our AI-powered virtual try-on service. This primarily includes your email address, which is collected strictly for authentication and account management purposes.</p>
            
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Photo Processing and Security</h2>
            <p>To use our virtual try-on features, you may upload photos of yourself. These images are processed securely and exclusively for the purpose of generating your virtual try-on results. We use state-of-the-art AI infrastructure to ensure your photos are handled with the utmost security.</p>
            
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Data Sharing</h2>
            <p>We respect your privacy. <strong>We do not sell, rent, or trade your personal data or uploaded photos to third parties.</strong> Your data is used solely to deliver and improve the V-Try experience.</p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:rc6542698@gmail.com" className="text-[#6D3DF5] hover:underline">rc6542698@gmail.com</a>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
