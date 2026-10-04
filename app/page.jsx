'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Camera, Sparkles, Shirt, Zap, ShieldCheck, Clock, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8F7FC] font-sans selection:bg-purple-200 text-gray-900">
      
      {/* Sticky Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F8F7FC]/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-xl font-serif">V</span>
            </div>
            <span className="font-bold text-2xl tracking-tight text-gray-900">V-TRY</span>
          </Link>
          
          {/* Right Links */}
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="hidden sm:block text-gray-600 font-medium hover:text-gray-900 transition-colors"
            >
              Log In
            </Link>
            <Link 
              href="/login" 
              className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-full shadow-md shadow-purple-500/30 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              Try V-Try Free &rarr;
            </Link>
          </div>
        </div>
      </nav>

      {/* Split Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="max-w-2xl z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-6 border border-purple-200"
            >
              <Sparkles size={16} />
              <span>AI-POWERED VIRTUAL TRY-ON</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-gray-900 mb-6"
            >
              See It. Wear It. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Love It.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-500 mb-10 max-w-lg leading-relaxed"
            >
              Stop guessing your size or fit. Use our state-of-the-art AI to instantly visualize how any garment looks on your unique body shape.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Link 
                href="/login"
                className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white rounded-full font-bold text-lg hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Try V-Try Free
              </Link>
              <a 
                href="#how-it-works"
                className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 rounded-full font-bold text-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                See How It Works
              </a>
            </motion.div>
          </div>

          {/* Right Visual Placeholder */}
          <div className="relative h-[400px] lg:h-[500px] w-full flex justify-center items-center">
            {/* Background decorative blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/3 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl"></div>

            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute left-[10%] top-[20%] bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center gap-2 z-20"
            >
              <div className="w-16 h-16 bg-purple-50 rounded-xl flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-purple-600" />
              </div>
              <span className="text-xs font-semibold text-gray-500">Your Photo</span>
            </motion.div>

            <motion.div 
              animate={{ y: [15, -15, 15] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute right-[10%] bottom-[20%] bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center gap-2 z-20"
            >
              <div className="w-16 h-16 bg-indigo-50 rounded-xl flex items-center justify-center">
                <Shirt className="w-8 h-8 text-indigo-600" />
              </div>
              <span className="text-xs font-semibold text-gray-500">Garment</span>
            </motion.div>

            <motion.div 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="relative z-10 w-64 h-80 bg-gradient-to-br from-white to-gray-50 rounded-[2rem] shadow-2xl border-4 border-white flex flex-col items-center justify-center p-6 overflow-hidden"
            >
              <Sparkles className="w-16 h-16 text-purple-600 mb-4 animate-pulse" />
              <h3 className="text-xl font-bold text-gray-900 text-center">AI Generation <br/>in progress...</h3>
              <div className="w-full h-2 bg-gray-100 rounded-full mt-6 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-600"
                  animate={{ width: ["0%", "100%", "0%"] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="w-full py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Your new fitting room is one click away.</h2>
            <p className="text-xl text-gray-500">Skip the hassle of returning clothes. Try them on instantly from your living room.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Camera className="w-8 h-8 text-white" />, title: "1. Upload Photo", desc: "Snap a front-facing selfie or upload a full-body picture." },
              { icon: <Shirt className="w-8 h-8 text-white" />, title: "2. Choose Your Style", desc: "Upload a picture of the top, bottom, or dress you want to try." },
              { icon: <Sparkles className="w-8 h-8 text-white" />, title: "3. Let AI Work", desc: "Watch our advanced diffusion models seamlessly merge the two." }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 rounded-3xl bg-[#F8F7FC] border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-purple-500/20">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full py-24 bg-[#F8F7FC] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">More than a virtual try-on.</h2>
            <p className="text-xl text-gray-500">Built with cutting-edge technology for premium shopping experiences.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Zap />, title: "Instant Results", desc: "Generates ultra-realistic try-on images in mere seconds." },
              { icon: <ImageIcon />, title: "Photorealistic AI", desc: "Maintains lighting, skin tone, and body posture perfectly." },
              { icon: <ShieldCheck />, title: "Privacy First", desc: "Your photos are processed securely and never sold to third parties." },
              { icon: <CheckCircle2 />, title: "Smart Clothing Fit", desc: "AI understands fabric draping and physics automatically." },
              { icon: <Clock />, title: "24/7 Fitting Room", desc: "Try on outfits anytime, anywhere without leaving your home." },
              { icon: <Sparkles />, title: "Welcome Bonus", desc: "Get 5 free V-Tokens when you create a new account today." }
            ].map((feat, i) => (
              <div key={i} className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feat.title}</h3>
                <p className="text-gray-500">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="w-full py-24 px-6 bg-white border-t border-gray-200 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Ready to see yourself in a new light?</h2>
          <p className="text-xl text-gray-500 mb-10">Join thousands of smart shoppers using V-Try today.</p>
          <Link 
            href="/login"
            className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-bold text-xl hover:opacity-90 shadow-xl shadow-purple-500/30 hover:shadow-2xl transition-all hover:-translate-y-1"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 bg-[#F8F7FC] border-t border-gray-200 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm font-serif">V</span>
            </div>
            <span className="font-bold text-lg tracking-tight text-gray-900">V-TRY</span>
          </div>
          
          <div className="flex gap-8 text-sm font-medium text-gray-500">
            <Link href="#" className="hover:text-purple-600 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-purple-600 transition-colors">Terms</Link>
            <Link href="#" className="hover:text-purple-600 transition-colors">Contact</Link>
          </div>
          
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} V-Try AI. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
