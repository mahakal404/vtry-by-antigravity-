import Link from 'next/link';
import { ArrowLeft, Mail } from 'lucide-react';

export default function Contact() {
  return (
    <div className="bg-[#F8F7FC] min-h-screen text-gray-900 font-sans flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center text-[#6D3DF5] hover:text-indigo-600 mb-8 font-medium">
          <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Link>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center">
          <div className="w-16 h-16 bg-purple-100 text-[#6D3DF5] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail size={32} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">Contact Us</h1>
          <p className="text-lg text-gray-500 mb-10 max-w-md mx-auto">
            Have questions or need support? Reach out to us anytime. Our team is here to help you with your V-Try experience.
          </p>
          
          <a 
            href="mailto:rc6542698@gmail.com" 
            className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#6D3DF5] to-indigo-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            rc6542698@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
