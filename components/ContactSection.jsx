'use client';
import Link from 'next/link';
import { Mail, Phone, ShieldCheck, FileText, ScrollText } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="w-full py-24 bg-white px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Get In Touch</h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Have questions or need support? Reach out to us anytime. I will reply as soon as I am available.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-center mb-16">
          <div className="flex-1 bg-[#F8F7FC] p-8 rounded-3xl border border-purple-100 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-purple-100 text-[#6D3DF5] rounded-2xl flex items-center justify-center mb-6">
              <Mail size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Email Us</h3>
            <p className="text-gray-500 mb-6">Send us an email and we'll get back to you shortly.</p>
            <a href="mailto:rc6542698@gmail.com" className="w-full px-6 py-3 bg-[#6D3DF5] text-white font-bold rounded-xl hover:-translate-y-1 hover:shadow-lg transition-all">
              rc6542698@gmail.com
            </a>
          </div>

          <div className="flex-1 bg-[#F8F7FC] p-8 rounded-3xl border border-purple-100 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-purple-100 text-[#6D3DF5] rounded-2xl flex items-center justify-center mb-6">
              <Phone size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Call Us</h3>
            <p className="text-gray-500 mb-6">Available during standard business hours.</p>
            <a href="tel:+918347725447" className="w-full px-6 py-3 bg-white text-[#6D3DF5] border-2 border-[#6D3DF5] font-bold rounded-xl hover:-translate-y-1 hover:shadow-lg transition-all">
              +91 8347725447
            </a>
          </div>
        </div>

        <div className="w-full max-w-2xl bg-white p-8 rounded-3xl border border-gray-100 shadow-xl mb-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Send a Message</h3>
          <form action="mailto:rc6542698@gmail.com" method="POST" encType="text/plain" className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" name="Name" placeholder="Your Name" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6D3DF5]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea name="Message" rows="4" placeholder="How can we help?" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6D3DF5]"></textarea>
            </div>
            <button type="submit" className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors">
              Submit Request
            </button>
            <p className="text-xs text-center text-gray-400 mt-2">I will reply as soon as I am available.</p>
          </form>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
          <Link href="/privacy-policy" className="flex-1 max-w-xs flex items-center justify-center gap-2 px-8 py-4 bg-purple-50 text-[#6D3DF5] rounded-full font-bold hover:bg-purple-100 transition-colors text-sm sm:text-base whitespace-nowrap">
            <ShieldCheck size={20} /> Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="flex-1 max-w-xs flex items-center justify-center gap-2 px-8 py-4 bg-purple-50 text-[#6D3DF5] rounded-full font-bold hover:bg-purple-100 transition-colors text-sm sm:text-base whitespace-nowrap">
            <FileText size={20} /> Terms of Service
          </Link>
          <Link href="/refund-policy" className="flex-1 max-w-xs flex items-center justify-center gap-2 px-8 py-4 bg-purple-50 text-[#6D3DF5] rounded-full font-bold hover:bg-purple-100 transition-colors text-sm sm:text-base whitespace-nowrap">
            <ScrollText size={20} /> Refund Policy
          </Link>
        </div>
      </div>
    </section>
  );
}
