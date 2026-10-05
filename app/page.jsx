'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Camera, Sparkles, Shirt, Zap, ShieldCheck, Clock, Image as ImageIcon, 
  CheckCircle2, ArrowRight, Star, ShoppingBag, Fingerprint, Scissors,
  Layers, ArrowRightCircle, ChevronDown
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
      <section className="relative pt-32 pb-24 px-6 lg:pt-40 lg:pb-32 overflow-hidden bg-gradient-to-br from-[#F8F7FC] via-white to-purple-50/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="col-span-1 lg:col-span-5 z-10"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100/50 text-[#6D3DF5] text-xs font-bold tracking-wider mb-8 border border-purple-200">
              <Sparkles size={14} />
              <span>AI-POWERED VIRTUAL TRY-ON</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-gray-900 mb-6 flex flex-col lg:block w-full">
              <span className="self-start lg:inline">See it. </span>
              <span className="self-end lg:inline">Try it. </span>
              <span className="self-start lg:block text-transparent bg-clip-text bg-gradient-to-r from-[#6D3DF5] to-indigo-600">Love it.</span>
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

          <div className="col-span-1 lg:col-span-7 flex justify-end relative w-full items-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-200/40 to-indigo-100/40 blur-3xl rounded-full scale-150 -z-10"></div>
            
            <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-2 sm:gap-4 lg:gap-8 w-full max-w-md lg:max-w-none mx-auto mt-8 lg:mt-0 relative transform origin-center lg:origin-right scale-100 lg:scale-90 xl:scale-100">
              
              {/* Garments Column (The 5 small dresses) */}
              <div className="flex flex-row lg:flex-col order-1 lg:order-2 w-full lg:w-auto justify-center items-center gap-2 lg:gap-4 mb-4 lg:mb-0">
                {['/t2.webp', '/t3.webp', '/t4.webp', '/t6.webp', '/t7.webp'].map((src, idx) => (
                  <div key={idx} className={`relative rounded-md overflow-hidden bg-white/50 shadow-sm border border-gray-100 flex items-center justify-center ${idx === 0 ? 'ring-4 ring-[#6D3DF5] shadow-lg scale-110 z-10 bg-white' : 'opacity-70 scale-95 hover:opacity-100 hover:scale-100 transition-all'}`}>
                    <Image src={src} alt="Garment" width={56} height={80} className="w-12 h-16 lg:w-14 lg:h-20 object-contain rounded-md bg-white pointer-events-none select-none" draggable={false} />
                  </div>
                ))}
              </div>

              {/* Your Photo Card */}
              <div className="order-2 lg:order-1 flex-shrink-0 relative bg-white/60 backdrop-blur-xl p-2 rounded-2xl shadow-xl border border-white/80 flex flex-col items-center w-28 h-40 lg:w-48 lg:h-64 justify-center">
                <Image src="/t1.webp" alt="Your Photo" width={200} height={300} className="w-full h-full object-cover object-top rounded-xl pointer-events-none select-none" draggable={false} priority />
                <div className="absolute -bottom-3 lg:-bottom-4 bg-white text-[#6D3DF5] font-bold text-[10px] lg:text-sm px-3 lg:px-4 py-1.5 rounded-full shadow-lg border border-purple-100 whitespace-nowrap z-10">
                  Your Photo
                </div>
              </div>

              {/* AI Node */}
              <div className="order-3 lg:order-3 flex-shrink-0 mx-2 lg:mx-0 relative z-20">
                <div className="w-10 h-10 lg:w-16 lg:h-16 bg-gradient-to-r from-[#6D3DF5] to-indigo-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(109,61,245,0.4)] border-2 lg:border-4 border-white">
                  <span className="text-white font-black text-xs lg:text-base tracking-wider">AI</span>
                </div>
                <div className="absolute -top-1 -right-1 lg:-top-2 lg:-right-2 text-yellow-400 animate-pulse"><Sparkles size={16} /></div>
                <div className="absolute -bottom-1 -left-1 lg:-bottom-2 lg:-left-2 text-purple-300 animate-pulse" style={{ animationDelay: '0.5s' }}><Sparkles size={16} /></div>
              </div>

              {/* V-Try Result Card */}
              <div className="order-4 lg:order-4 flex-shrink-0 relative bg-white/60 backdrop-blur-xl p-2.5 rounded-2xl shadow-2xl border border-white/80 flex flex-col items-center w-28 h-40 lg:w-48 lg:h-64 justify-center z-10">
                <Image src="/t5.webp" alt="V-Try Result" width={240} height={350} className="w-full h-full object-cover object-top rounded-xl pointer-events-none select-none" draggable={false} priority />
                <div className="absolute -bottom-3 lg:-bottom-5 bg-[#6D3DF5] text-white font-bold text-[10px] lg:text-sm px-3 lg:px-5 py-1.5 lg:py-2 rounded-full shadow-lg border border-indigo-400 whitespace-nowrap z-10">
                  V-Try Result
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Brand Trust Bar */}
      <section className="w-full py-8 lg:py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Trusted by the next generation of fashion shoppers</p>
          <div className="flex flex-wrap justify-center items-center gap-y-6 gap-x-4 lg:gap-12 w-full opacity-50 grayscale">
            {['VOGUE', 'UrbanWear', 'StyleLab', 'NovaFashion', 'TrendSet'].map((brand, idx) => (
              <span key={brand} className={`text-xl md:text-2xl font-black font-serif text-gray-800 tracking-tighter flex justify-center ${idx === 2 ? 'w-full sm:w-auto lg:w-auto' : 'w-[40%] sm:w-auto lg:w-auto'}`}>
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 4. The Problem Section */}
      <section className="w-full py-24 bg-[#F8F7FC] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Online shopping shouldn't be a guessing game.</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">Skip the hassle of returning clothes. Know exactly how it looks before you buy.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { q: "Will it fit me?", icon: <Scissors className="w-10 h-10 text-[#6D3DF5]" /> },
              { q: "Will it actually look good?", icon: <Sparkles className="w-10 h-10 text-[#6D3DF5]" /> },
              { q: "Should I buy it?", icon: <ShoppingBag className="w-10 h-10 text-[#6D3DF5]" /> }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center gap-6 h-56 hover:-translate-y-1 transition-transform">
                <div className="w-20 h-20 rounded-2xl bg-[#F8F7FC] flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 italic">"{item.q}"</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. How It Works Section */}
      <section id="how-it-works" className="w-full py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Your new fitting room is one click away.</h2>
            <p className="text-xl text-gray-500">Four simple steps to your perfect digital outfit.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-purple-100 via-indigo-100 to-purple-100"></div>
            {[
              { 
                icon: <Camera />, title: "1. Upload Photo", desc: "Snap a clear selfie.",
                visual: <Image src="/t1.webp" alt="Upload Photo" fill className="object-cover object-top pointer-events-none select-none" draggable={false} />
              },
              { 
                icon: <Shirt />, title: "2. Choose Style", desc: "Pick your garment.",
                visual: <Image src="/t2.webp" alt="Choose Style" fill className="object-contain p-4 drop-shadow-md pointer-events-none select-none" draggable={false} />
              },
              { 
                icon: <Sparkles />, title: "3. Let AI Work", desc: "AI maps the fabric.",
                visual: (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-indigo-50 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-purple-600 shadow-[0_0_30px_rgba(147,51,234,0.5)] flex items-center justify-center animate-pulse">
                      <Sparkles className="text-white" size={24} />
                    </div>
                  </div>
                )
              },
              { 
                icon: <ImageIcon />, title: "4. See Yourself", desc: "Instant photorealism.",
                visual: <Image src="/t5.webp" alt="See Yourself" fill className="object-cover object-top pointer-events-none select-none" draggable={false} />
              }
            ].map((step, i) => (
              <div key={i} className="flex flex-col relative z-10 bg-white rounded-3xl shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300 overflow-hidden">
                <div className="relative w-full h-56 bg-slate-50 overflow-hidden">
                  {step.visual}
                </div>
                <div className="p-8 flex flex-col items-center text-center bg-[#F8F7FC] flex-1">
                  <div className="w-12 h-12 bg-white border border-gray-100 rounded-full flex items-center justify-center text-[#6D3DF5] mb-4 shadow-sm z-10 -mt-14">
                    <div className="w-6 h-6">{step.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Virtual Fitting Room Demo (Dark Section) */}
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
               
               <div className="flex flex-col lg:flex-row items-center justify-center gap-6 w-full max-w-4xl h-full p-2 md:p-6">
                 {/* Left Column (Your Photo) */}
                 <div className="relative bg-white/5 backdrop-blur-xl p-2 rounded-xl shadow-xl border border-white/10 flex flex-col items-center shrink-0">
                   <Image src="/t1.webp" alt="Your Photo" width={220} height={320} className="object-cover object-top rounded-lg pointer-events-none select-none w-[140px] h-[200px] md:w-[220px] md:h-[320px]" draggable={false} />
                   <div className="absolute -bottom-4 bg-gray-800 text-gray-200 font-bold text-sm px-4 py-1.5 rounded-full shadow-lg border border-gray-700 whitespace-nowrap">
                     Your Photo
                   </div>
                 </div>

                 {/* Visual Connection */}
                 <div className="hidden md:flex flex-col items-center justify-center shrink-0 text-gray-600">
                   <ArrowRight size={24} />
                 </div>

                 {/* Middle Column (Garment Selection) */}
                 <div className="flex flex-row lg:flex-col flex-wrap justify-center gap-2 md:gap-3 shrink-0">
                   {['/t2.webp', '/t3.webp', '/t4.webp', '/t6.webp', '/t7.webp'].map((src, idx) => (
                     <div key={idx} className={`relative rounded-md overflow-hidden flex items-center justify-center transition-all ${idx === 0 ? 'bg-white ring-2 ring-purple-500 scale-110 opacity-100 shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'bg-white/10 opacity-60 hover:opacity-100 scale-95 hover:scale-100'}`}>
                       <Image src={src} alt="Garment" width={56} height={64} className="w-10 h-12 md:w-14 md:h-16 object-contain p-1 pointer-events-none select-none" draggable={false} />
                     </div>
                   ))}
                 </div>

                 {/* Visual Connection */}
                 <div className="hidden md:flex flex-col items-center justify-center shrink-0 text-gray-600">
                   <ArrowRight size={24} />
                 </div>

                 {/* Right Column (Stunning Result) */}
                 <div className="relative bg-white/5 backdrop-blur-xl p-2 rounded-xl shadow-2xl border border-white/10 flex flex-col items-center shrink-0">
                   <Image src="/t5.webp" alt="Stunning Result" width={220} height={320} className="object-cover object-top rounded-lg pointer-events-none select-none w-[140px] h-[200px] md:w-[220px] md:h-[320px]" draggable={false} />
                   <div className="absolute -bottom-4 bg-[#6D3DF5] text-white font-bold text-sm px-5 py-1.5 rounded-full shadow-[0_0_15px_rgba(109,61,245,0.5)] border border-[#6D3DF5] whitespace-nowrap">
                     V-Try Result
                   </div>
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

      {/* 7. Features Grid */}
      <section id="features" className="w-full py-24 bg-[#F8F7FC] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">More than a virtual try-on.</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <ImageIcon />, title: "Photorealistic AI", desc: "Maintains lighting, skin tone, and body posture perfectly." },
              { icon: <CheckCircle2 />, title: "Smart Clothing Fit", desc: "AI understands fabric draping and physics automatically." },
              { icon: <Layers />, title: "Multiple Styles", desc: "Try on tops, bottoms, or full-body dresses effortlessly." },
              { icon: <Zap />, title: "Instant Results", desc: "Generates ultra-realistic try-on images in mere seconds." },
              { icon: <ShieldCheck />, title: "Privacy First", desc: "Your photos are processed securely and never sold." },
              { icon: <ShoppingBag />, title: "Built for Fashion", desc: "Designed specifically to enhance the online apparel shopping experience." }
            ].map((feat, i) => (
              <div key={i} className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-[#F8F7FC] shadow-sm border border-gray-100 rounded-2xl flex items-center justify-center text-[#6D3DF5] mb-6">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feat.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. For Brands & Shoppers */}
      <section id="brands" className="w-full py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 mb-24">
            <div className="bg-[#F8F7FC] p-12 rounded-[2.5rem] shadow-sm border border-gray-100 transition-all hover:shadow-md hover:-translate-y-1">
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
        </div>
      </section>

      {/* 9. Stats & Testimonials */}
      <section className="w-full py-24 bg-[#F8F7FC] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24 text-center divide-x divide-gray-200 bg-white p-12 rounded-[2.5rem] shadow-sm border border-gray-100">
            <div><h4 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">10K+</h4><p className="text-gray-500 font-medium">Active Users</p></div>
            <div><h4 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">98%</h4><p className="text-gray-500 font-medium">Satisfaction</p></div>
            <div><h4 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">&lt;10s</h4><p className="text-gray-500 font-medium">Generation Time</p></div>
            <div><h4 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">24/7</h4><p className="text-gray-500 font-medium">Fitting Room</p></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Sarah Jenkins", initial: "S", role: "Fashion Enthusiast", color: "bg-blue-100 text-blue-600" },
              { name: "Emily Watson", initial: "E", role: "Daily Shopper", color: "bg-green-100 text-green-600" },
              { name: "Michael Chang", initial: "M", role: "Boutique Owner", color: "bg-purple-100 text-purple-600" }
            ].map((user, i) => (
              <div key={i} className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex gap-1 text-yellow-400 mb-4"><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/></div>
                <p className="text-gray-600 mb-6 italic">"V-Try completely changed how I shop online. I never buy a dress now without trying it on here first!"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${user.color}`}>
                    {user.initial}
                  </div>
                  <div><p className="font-bold text-gray-900 text-sm">{user.name}</p><p className="text-xs text-gray-500">{user.role}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ Section */}
      <section className="w-full py-24 bg-white px-6 border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {[
              { q: "Is the generated image realistic?", a: "Yes, V-Try uses state-of-the-art diffusion models to maintain your body shape, lighting, and skin tone for incredibly photorealistic results." },
              { q: "What types of clothing are supported?", a: "We currently support tops, bottoms, and full-body dresses. For best results, use flat-lay or model photos of the garment." },
              { q: "Is my data secure?", a: "Absolutely. We do not store your personal photos permanently unless you explicitly save them to your V-Try History." },
              { q: "Do I get free tokens to start?", a: "Yes! Every new user receives a Welcome Bonus of 5 V-Tokens instantly upon signing up." }
            ].map((faq, idx) => (
              <details key={idx} className="group bg-[#F8F7FC] rounded-2xl border border-gray-100 cursor-pointer overflow-hidden transition-all duration-300">
                <summary className="flex justify-between items-center font-bold text-lg p-6 text-gray-900 select-none">
                  {faq.q}
                  <span className="transition group-open:rotate-180">
                    <ChevronDown size={20} className="text-gray-400" />
                  </span>
                </summary>
                <div className="text-gray-600 px-6 pb-6 pt-0 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Final CTA */}
      <section className="w-full py-24 px-6 bg-[#F8F7FC] text-center">
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

      {/* 12. Mega Footer */}
      <footer className="w-full bg-white pt-20 pb-10 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 flex-wrap gap-8 mb-16">
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
            <div className="flex bg-[#F8F7FC] rounded-lg border border-gray-200 overflow-hidden focus-within:border-[#6D3DF5] transition-colors">
              <input type="email" placeholder="Email address" className="w-full px-4 py-2 text-sm outline-none text-gray-900 bg-transparent" />
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
