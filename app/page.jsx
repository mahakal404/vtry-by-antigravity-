import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-2xl fade-in">
        <div className="w-20 h-20 mx-auto bg-brand-purple/10 rounded-3xl flex items-center justify-center mb-8 shadow-inner border border-brand-purple/20">
          <Sparkles className="text-brand-purple w-10 h-10" />
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-6 font-serif">
          Premium Virtual Try-On Studio
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
          Experience the future of fashion. Use advanced AI to instantly visualize how premium outfits look on you with stunning realism.
        </p>
        <Link 
          href="/login"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-purple to-brand-pink text-white rounded-2xl font-bold text-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          Get Started <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}
