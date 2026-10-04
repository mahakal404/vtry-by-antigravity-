import Link from 'next/link';
import { Sparkles, ArrowRight, Camera, Scissors, Wand2, ChevronDown } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-purple-200">
      
      {/* Header */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <span className="text-white font-bold text-xl font-serif">V</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">V-TRY</span>
          </div>
          <Link 
            href="/login" 
            className="px-6 py-2.5 text-sm font-semibold text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-full transition-colors border border-purple-100"
          >
            Log In
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full pt-24 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-8">
            <Sparkles size={16} />
            <span>The Future of Fashion is Here</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-8 leading-[1.1]">
            Premium AI Virtual <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Try-On Studio</span>
          </h1>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience garments before you buy. Upload a photo, choose an outfit, and let our advanced AI seamlessly blend them with stunning, photorealistic precision.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/login"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-bold text-lg hover:opacity-90 transition-all shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Get Started for Free <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-24 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">Three simple steps to visualize your perfect outfit.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <Camera className="w-8 h-8 text-purple-600" />,
                title: "1. Upload Photo",
                desc: "Upload a clear, front-facing photo of yourself. The AI uses this as the base canvas."
              },
              {
                icon: <Scissors className="w-8 h-8 text-indigo-600" />,
                title: "2. Choose Garment",
                desc: "Upload the clothing item you want to try on. It can be a top, bottom, or full dress."
              },
              {
                icon: <Wand2 className="w-8 h-8 text-purple-600" />,
                title: "3. See Magic",
                desc: "Our AI generates a high-fidelity image of you wearing the garment in seconds."
              }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 rounded-3xl bg-slate-50 border border-slate-100 transition-transform hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-900/5">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm shadow-slate-200">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-24 bg-slate-50 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {[
              { q: "Is the generated image realistic?", a: "Yes, V-Try uses state-of-the-art diffusion models to maintain your body shape, lighting, and skin tone for incredibly photorealistic results." },
              { q: "What types of clothing are supported?", a: "We currently support tops, bottoms, and full-body dresses. For best results, use flat-lay or model photos of the garment." },
              { q: "Is my data secure?", a: "Absolutely. We do not store your personal photos permanently unless you explicitly save them to your V-Try History." },
              { q: "Do I get free tokens to start?", a: "Yes! Every new user receives a Welcome Bonus of 5 V-Tokens instantly upon signing up." }
            ].map((faq, idx) => (
              <details key={idx} className="group bg-white rounded-2xl border border-slate-200 cursor-pointer overflow-hidden transition-all duration-300">
                <summary className="flex justify-between items-center font-bold text-lg p-6 text-slate-900 select-none">
                  {faq.q}
                  <span className="transition group-open:rotate-180">
                    <ChevronDown size={20} className="text-slate-400" />
                  </span>
                </summary>
                <div className="text-slate-600 px-6 pb-6 pt-0 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="w-full py-24 bg-white border-b border-slate-200 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-12 text-center text-white shadow-2xl shadow-purple-600/20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to upgrade your wardrobe?</h2>
          <p className="text-purple-100 text-xl mb-10 max-w-2xl mx-auto">Join thousands of users who are shopping smarter and styling better with AI.</p>
          <Link 
            href="/login"
            className="inline-block px-10 py-4 bg-white text-purple-700 rounded-full font-bold text-lg hover:bg-slate-50 transition-colors shadow-lg"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="w-full bg-white py-8 text-center text-slate-500 px-6">
        <p>© {new Date().getFullYear()} V-Try AI Studio. All rights reserved.</p>
      </footer>
    </div>
  );
}
