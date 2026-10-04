'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Camera, Sparkles, Shirt, Zap, ShieldCheck, Clock, Image as ImageIcon, 
  CheckCircle2, ArrowRight, Star, ShoppingBag, Fingerprint, Scissors,
  Layers, ArrowRightCircle
} from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function LandingPage() {
  return (
    <div className="bg-[#F8F7FC] font-sans selection:bg-[#6D3DF5]/20 text-gray-900 overflow-x-hidden">
      
      {/* 1. Premium Sticky Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F8F7FC]/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[#6D3DF5] to-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-[#6D3DF5]/20 group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-xl font-serif">V</span>
            </div>
            <span className="font-bold text-2xl tracking-tight text-gray-900">V-TRY</span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8 font-medium text-sm text-gray-600">
            <a href="#how-it-works" className="hover:text-[#6D3DF5] transition-colors">How It Works</a>
            <a href="#features" className="hover:text-[#6D3DF5] transition-colors">Features</a>
            <a href="#experience" className="hover:text-[#6D3DF5] transition-colors">Experience</a>
            <a href="#brands" className="hover:text-[#6D3DF5] transition-colors">For Brands</a>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="hidden sm:block text-gray-600 font-medium hover:text-gray-900 transition-colors text-sm"
            >
              Log In
            </Link>
            <Link 
              href="/login" 
              className="px-5 py-2.5 bg-gradient-to-r from-[#6D3DF5] to-indigo-600 text-white font-medium rounded-full shadow-md shadow-[#6D3DF5]/30 hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm"
            >
              Try V-Try Free &rarr;
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative pt-32 pb-24 px-6 lg:pt-40 lg:pb-32 overflow-hidden bg-[#F8F7FC]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="max-w-2xl z-10"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100/50 text-[#6D3DF5] text-xs font-bold tracking-wider mb-8 border border-purple-200">
              <Sparkles size={14} />
              <span>AI-POWERED VIRTUAL TRY-ON</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-gray-900 mb-6">
              See It. Wear It. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D3DF5] to-indigo-600">Love It.</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-500 mb-10 max-w-lg leading-relaxed">
              Stop guessing your size or fit. Use our state-of-the-art AI to instantly visualize how any garment looks on your unique body shape.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <Link 
                href="/login"
                className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white rounded-full font-bold text-lg hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                Try V-Try Free <ArrowRight size={20} />
              </Link>
              <a 
                href="#how-it-works"
                className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 rounded-full font-bold text-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                See How It Works
              </a>
            </motion.div>
            <motion.p variants={fadeInUp} className="text-sm text-gray-400 font-medium flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-500"/> No credit card required. 5 Free Tokens.
            </motion.p>
          </motion.div>

          <div className="relative h-[500px] w-full flex justify-center items-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#6D3DF5]/10 rounded-full blur-3xl"></div>
            
            <div className="relative w-full max-w-md h-[400px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50/30"></div>
              
              <motion.div animate={{ y: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute left-6 top-10 w-24 h-32 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col items-center justify-center gap-2 z-20">
                 <ImageIcon className="text-gray-300 w-8 h-8" />
                 <span className="text-[10px] font-bold text-gray-400">User Photo</span>
              </motion.div>

              <motion.div animate={{ y: [10, -10, 10] }} transition={{ repeat: Infinity, duration: 5 }} className="absolute right-6 bottom-10 w-24 h-32 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col items-center justify-center gap-2 z-20">
                 <Shirt className="text-indigo-300 w-8 h-8" />
                 <span className="text-[10px] font-bold text-gray-400">Garment</span>
              </motion.div>

              <div className="relative z-10 w-48 h-64 bg-white rounded-2xl shadow-xl border-4 border-[#F8F7FC] flex flex-col items-center justify-center overflow-hidden">
                <Sparkles className="w-12 h-12 text-[#6D3DF5] mb-2 animate-pulse" />
                <span className="text-sm font-bold text-gray-800">Processing...</span>
                <div className="w-3/4 h-1.5 bg-gray-100 rounded-full mt-4 overflow-hidden">
                  <motion.div className="h-full bg-gradient-to-r from-[#6D3DF5] to-indigo-600" animate={{ width: ["0%", "100%"] }} transition={{ repeat: Infinity, duration: 2 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Trust Bar */}
      <section className="w-full py-10 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Trusted by the next generation of fashion shoppers</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale">
            {['VOGUE', 'UrbanWear', 'StyleLab', 'NovaFashion', 'TrendSet'].map(brand => (
              <span key={brand} className="text-xl md:text-2xl font-black font-serif text-gray-800 tracking-tighter">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. How It Works Section */}
      <section id="how-it-works" className="w-full py-24 bg-[#F8F7FC] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Your new fitting room is one click away.</h2>
            <p className="text-xl text-gray-500">Online shopping shouldn't be a guessing game. Follow these simple steps.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-purple-100 via-indigo-100 to-purple-100"></div>
            {[
              { icon: <Camera />, title: "1. Upload Photo", desc: "Snap a clear selfie." },
              { icon: <Shirt />, title: "2. Choose Style", desc: "Pick your garment." },
              { icon: <Sparkles />, title: "3. Let AI Work", desc: "AI maps the fabric." },
              { icon: <ImageIcon />, title: "4. See Yourself", desc: "Instant photorealism." }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center relative z-10 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <div className="w-16 h-16 bg-[#F8F7FC] border border-gray-100 rounded-full flex items-center justify-center text-[#6D3DF5] mb-6 shadow-sm">
                  <div className="w-8 h-8">{step.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Features Grid */}
      <section id="features" className="w-full py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">More than a virtual try-on.</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <ImageIcon />, title: "Photorealistic AI", desc: "Maintains lighting, skin tone, and body posture perfectly." },
              { icon: <CheckCircle2 />, title: "Smart Clothing Fit", desc: "AI understands fabric draping and physics automatically." },
              { icon: <Layers />, title: "Multiple Styles", desc: "Try on tops, bottoms, or full-body dresses effortlessly." },
              { icon: <Zap />, title: "Instant Results", desc: "Generates ultra-realistic try-on images in mere seconds." },
              { icon: <ShieldCheck />, title: "Privacy First", desc: "Your photos are processed securely and never sold." },
              { icon: <ShoppingBag />, title: "Built for Fashion", desc: "Designed specifically to enhance the online apparel shopping experience." }
            ].map((feat, i) => (
              <div key={i} className="p-8 bg-[#F8F7FC] rounded-3xl border border-gray-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-white shadow-sm border border-gray-100 rounded-2xl flex items-center justify-center text-[#6D3DF5] mb-6">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feat.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Virtual Fitting Room Demo (Dark Section) */}
      <section id="experience" className="w-full py-24 bg-[#0B0F19] px-6 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 tracking-tight">Meet your virtual fitting room.</h2>
          
          <div className="w-full aspect-video bg-gray-900 rounded-[2rem] border border-gray-800 shadow-2xl overflow-hidden flex flex-col">
            <div className="h-12 border-b border-gray-800 flex items-center px-6 gap-2">
               <div className="w-3 h-3 rounded-full bg-red-500"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
               <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 p-8 flex items-center justify-center relative">
               <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-[#A78BFA] border border-white/10 flex items-center gap-2">
                 <Zap size={14} /> AI Generated in 8.4s
               </div>
               
               <div className="grid grid-cols-3 gap-8 w-full max-w-3xl h-full items-center">
                 <div className="bg-gray-800 rounded-2xl aspect-[3/4] flex items-center justify-center border border-gray-700">
                    <span className="text-gray-500 font-medium">Your Photo</span>
                 </div>
                 <div className="flex items-center justify-center text-gray-600">
                    <ArrowRightCircle size={40} className="animate-pulse text-[#6D3DF5]" />
                 </div>
                 <div className="bg-gradient-to-br from-[#6D3DF5]/20 to-indigo-600/20 rounded-2xl aspect-[3/4] flex items-center justify-center border border-[#6D3DF5]/50 shadow-[0_0_30px_rgba(109,61,245,0.3)]">
                    <span className="text-white font-bold">Stunning Result</span>
                 </div>
               </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-12 text-sm font-bold text-gray-400 overflow-x-auto hide-scrollbar whitespace-nowrap">
            <span className="px-4 py-2 bg-gray-800 rounded-full flex items-center gap-2"><ImageIcon size={16} className="text-[#A78BFA]"/> Photo Input</span>
            <ArrowRight size={16} className="hidden md:block"/>
            <span className="px-4 py-2 flex items-center gap-2"><Fingerprint size={16}/> Body Detection</span>
            <ArrowRight size={16} className="hidden md:block"/>
            <span className="px-4 py-2 flex items-center gap-2"><Scissors size={16}/> Clothing Analysis</span>
            <ArrowRight size={16} className="hidden md:block"/>
            <span className="px-4 py-2 bg-[#6D3DF5] text-white rounded-full flex items-center gap-2"><Sparkles size={16}/> Virtual Try-On</span>
          </div>
        </div>
      </section>

      {/* 6. For Brands & Shoppers + Stats */}
      <section id="brands" className="w-full py-24 bg-[#F8F7FC] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 mb-24">
            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-gray-100 transition-all hover:shadow-md hover:-translate-y-1">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Shop with confidence</h3>
              <ul className="space-y-4 mb-8 text-gray-600">
                <li className="flex items-center gap-3"><CheckCircle2 className="text-green-500"/> Stop dealing with return shipping</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-green-500"/> See exactly how colors match your skin</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-green-500"/> Build your digital dream closet</li>
              </ul>
              <Link href="/login" className="text-[#6D3DF5] font-bold hover:underline flex items-center gap-1">For Shoppers <ArrowRight size={16}/></Link>
            </div>
            
            <div className="bg-gradient-to-br from-gray-900 to-indigo-950 p-12 rounded-[2.5rem] shadow-xl text-white transition-all hover:shadow-2xl hover:-translate-y-1">
              <h3 className="text-3xl font-bold mb-6">Turn your store into a virtual fitting room</h3>
              <ul className="space-y-4 mb-8 text-gray-300">
                <li className="flex items-center gap-3"><CheckCircle2 className="text-[#A78BFA]"/> Reduce return rates by up to 40%</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-[#A78BFA]"/> Increase conversion rates instantly</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-[#A78BFA]"/> Seamless API integration</li>
              </ul>
              <Link href="/login" className="text-[#A78BFA] font-bold hover:underline flex items-center gap-1">For Brands <ArrowRight size={16}/></Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 text-center divide-x divide-gray-200 bg-white p-12 rounded-[2.5rem] shadow-sm border border-gray-100">
            <div><h4 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">10K+</h4><p className="text-gray-500 font-medium">Active Users</p></div>
            <div><h4 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">98%</h4><p className="text-gray-500 font-medium">Satisfaction</p></div>
            <div><h4 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">&lt;10s</h4><p className="text-gray-500 font-medium">Generation Time</p></div>
            <div><h4 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">24/7</h4><p className="text-gray-500 font-medium">Fitting Room</p></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[1,2,3].map((i) => (
              <div key={i} className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex gap-1 text-yellow-400 mb-4"><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/></div>
                <p className="text-gray-600 mb-6 italic">"V-Try completely changed how I shop online. I never buy a dress now without trying it on here first!"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div><p className="font-bold text-gray-900 text-sm">Sarah Jenkins</p><p className="text-xs text-gray-500">Fashion Enthusiast</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-24 px-6 bg-white border-b border-gray-200 text-center">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-gray-900 to-[#1e1b4b] rounded-[3rem] p-16 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#6D3DF5]/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Your next outfit is already waiting.</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Get 5 free tokens instantly when you sign up today. No credit card required.</p>
            <Link 
              href="/login"
              className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-[#6D3DF5] to-indigo-500 text-white rounded-full font-bold text-xl hover:opacity-90 shadow-xl shadow-[#6D3DF5]/30 transition-all hover:scale-105"
            >
              Get Started Now <ArrowRight size={20}/>
            </Link>
          </div>
        </div>
      </section>

      {/* Mega Footer */}
      <footer className="w-full bg-[#F8F7FC] pt-20 pb-10 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-[#6D3DF5] to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm font-serif">V</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900">V-TRY</span>
            </Link>
            <p className="text-gray-500 mb-6 max-w-xs leading-relaxed">The premium AI-powered virtual try-on studio for modern fashion shoppers and brands.</p>
            <div className="flex gap-4 text-gray-400">
              <svg className="w-5 h-5 hover:text-[#6D3DF5] cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              <svg className="w-5 h-5 hover:text-[#6D3DF5] cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              <svg className="w-5 h-5 hover:text-[#6D3DF5] cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Product</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><Link href="/login" className="hover:text-[#6D3DF5]">Studio</Link></li>
              <li><Link href="#pricing" className="hover:text-[#6D3DF5]">Pricing</Link></li>
              <li><Link href="#brands" className="hover:text-[#6D3DF5]">For Brands</Link></li>
              <li><Link href="#" className="hover:text-[#6D3DF5]">API Docs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Company</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><Link href="#" className="hover:text-[#6D3DF5]">About Us</Link></li>
              <li><Link href="#" className="hover:text-[#6D3DF5]">Careers</Link></li>
              <li><Link href="#" className="hover:text-[#6D3DF5]">Blog</Link></li>
              <li><Link href="#" className="hover:text-[#6D3DF5]">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Stay Updated</h4>
            <p className="text-gray-500 text-sm mb-4">Subscribe to our newsletter.</p>
            <div className="flex bg-white rounded-lg border border-gray-200 overflow-hidden focus-within:border-[#6D3DF5] transition-colors">
              <input type="email" placeholder="Email address" className="w-full px-4 py-2 text-sm outline-none text-gray-900" />
              <button className="bg-[#F8F7FC] px-3 text-gray-500 hover:text-[#6D3DF5] border-l border-gray-200"><ArrowRight size={16}/></button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400 font-medium">
          <p>© {new Date().getFullYear()} V-Try AI. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-[#6D3DF5]">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#6D3DF5]">Terms of Service</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
