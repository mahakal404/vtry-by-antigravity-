'use client';
import { useState, useRef } from 'react';
import { useHistory } from '@/contexts/HistoryContext';
import { useTokens } from '@/contexts/TokenContext';
import { User, Shirt, Upload, Sparkles, Loader2, Coins, ChevronDown, CheckCircle2, History as HistoryIcon, ArrowRight, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Studio() {
  const [personImage, setPersonImage] = useState(null);
  const [clothImage, setClothImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeCategory, setActiveCategory] = useState('T-Shirt');
  
  const personInputRef = useRef(null);
  const clothInputRef = useRef(null);
  const { addToHistory } = useHistory();
  const { displayBalance } = useTokens();
  const { user } = useAuth();
  const router = useRouter();

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'person') setPersonImage(reader.result);
      else setClothImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleTryOn = async () => {
    if (!personImage || !clothImage) return;
    setIsProcessing(true);
    setResultImage(null);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');
    const personImg = new Image();
    personImg.src = personImage;
    await new Promise(resolve => { personImg.onload = resolve; });
    const clothImg = new Image();
    clothImg.src = clothImage;
    await new Promise(resolve => { clothImg.onload = resolve; });
    ctx.drawImage(personImg, 0, 0, 400, 500);
    ctx.globalAlpha = 0.7;
    const clothW = 200;
    const clothH = 250;
    ctx.drawImage(clothImg, 100, 120, clothW, clothH);
    ctx.globalAlpha = 1.0;
    ctx.fillStyle = 'rgba(124, 58, 237, 0.3)';
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('V-Try Result', 200, 480);
    const resultDataUrl = canvas.toDataURL('image/png');
    setResultImage(resultDataUrl);
    setIsProcessing(false);
    addToHistory({
      personImage,
      clothImage,
      resultImage: resultDataUrl,
    });
  };

  const categories = ['T-Shirt', 'Shirt', 'Hoodie', 'Dress', 'Jacket'];

  return (
    <div className="max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-main flex items-center gap-2">
            Virtual <span className="text-brand-purple">Try-On</span> Studio
          </h1>
          <p className="text-sm mt-1 text-text-muted">
            See it. Try it. Love it.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-border-soft shadow-sm text-sm font-medium">
            <Coins size={16} className="text-brand-pink" />
            <span className="text-text-main font-bold">{displayBalance} <span className="font-normal text-text-muted hidden sm:inline">V-Tokens</span></span>
            <button className="w-6 h-6 rounded-full bg-brand-purple text-white flex items-center justify-center text-lg font-bold ml-1 hover:opacity-90 transition-opacity">+</button>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-2 py-1.5 rounded-full bg-surface border border-border-soft shadow-sm cursor-pointer hover:bg-surface-soft transition-colors">
             <div className="w-7 h-7 rounded-full bg-brand-indigo text-white flex items-center justify-center text-xs font-bold overflow-hidden">
               {user?.avatar?.startsWith('http') ? <img src={user.avatar} alt="Profile" className="w-full h-full object-cover"/> : (user?.firstName?.[0] || 'U')}
             </div>
             <span className="text-sm font-medium text-text-main pl-1 pr-2">{user?.firstName || 'User'}</span>
             <ChevronDown size={14} className="text-text-muted" />
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* Left Column - 40% */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Card 1: Your Photo */}
          <div className="bg-surface rounded-[20px] p-5 shadow-[0_4px_20px_rgba(31,16,64,0.06)] border border-border-soft">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-indigo text-white flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <h2 className="font-bold text-text-main text-base">Your Photo</h2>
                  <p className="text-xs text-text-muted">Upload a clear photo of yourself</p>
                </div>
              </div>
              <div className="px-3 py-1 bg-[#FFFBEB] text-[#D97706] rounded-full text-[10px] font-bold border border-[#FEF3C7] flex items-center gap-1 shadow-sm">
                💡 Best Results
              </div>
            </div>

            <div 
              onClick={() => personInputRef.current?.click()}
              className="bg-surface-soft border-2 border-dashed border-[#D8D2EE] hover:border-brand-purple rounded-xl p-6 text-center cursor-pointer transition-colors group relative overflow-hidden"
            >
              <input ref={personInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'person')} />
              {personImage ? (
                <img src={personImage} alt="Person" className="max-h-40 mx-auto rounded-lg object-contain" />
              ) : (
                <div className="py-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-white border border-border-soft flex items-center justify-center mb-3 shadow-sm group-hover:scale-105 transition-transform">
                    <User size={24} className="text-text-main" />
                    <div className="absolute ml-8 mt-8 w-5 h-5 bg-brand-purple rounded-full flex items-center justify-center border-2 border-white text-white"><span className="text-[10px] font-bold">+</span></div>
                  </div>
                  <h3 className="font-semibold text-sm text-text-main mb-1">Drag & drop your photo here</h3>
                  <p className="text-xs text-text-muted mb-4">or click to upload</p>
                  <button className="px-5 py-2 rounded-lg bg-brand-indigo text-white text-xs font-semibold shadow-sm hover:opacity-90 flex items-center gap-2 mx-auto">
                    <Upload size={14} /> Choose Photo
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-4 mt-4 text-[10px] text-text-muted font-medium">
               <span className="flex items-center gap-1"><User size={12}/> Clear face</span>
               <span className="flex items-center gap-1"><Sparkles size={12}/> Good lighting</span>
               <span className="flex items-center gap-1"><User size={12}/> Full/half body</span>
            </div>
          </div>

          {/* Card 2: Clothing */}
          <div className="bg-surface rounded-[20px] p-5 shadow-[0_4px_20px_rgba(31,16,64,0.06)] border border-border-soft">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-brand-pink text-white flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <h2 className="font-bold text-text-main text-base">Clothing</h2>
                <p className="text-xs text-text-muted">Upload a clothing item</p>
              </div>
            </div>

            <div 
              onClick={() => clothInputRef.current?.click()}
              className="bg-surface-soft border-2 border-dashed border-[#D8D2EE] hover:border-brand-pink rounded-xl p-6 text-center cursor-pointer transition-colors group relative overflow-hidden mb-4"
            >
              <input ref={clothInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'cloth')} />
              {clothImage ? (
                <img src={clothImage} alt="Cloth" className="max-h-40 mx-auto rounded-lg object-contain" />
              ) : (
                <div className="py-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-white border border-border-soft flex items-center justify-center mb-3 shadow-sm group-hover:scale-105 transition-transform">
                    <Shirt size={24} className="text-text-main" />
                    <div className="absolute ml-8 mt-8 w-5 h-5 bg-brand-pink rounded-full flex items-center justify-center border-2 border-white text-white"><span className="text-[10px] font-bold">+</span></div>
                  </div>
                  <h3 className="font-semibold text-sm text-text-main mb-1">Drag & drop clothing image</h3>
                  <p className="text-xs text-text-muted mb-4">or click to upload</p>
                  <button className="px-5 py-2 rounded-lg bg-brand-indigo text-white text-xs font-semibold shadow-sm hover:opacity-90 flex items-center gap-2 mx-auto">
                    <Upload size={14} /> Choose Photo
                  </button>
                </div>
              )}
            </div>

            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
               {categories.map(cat => (
                 <button 
                   key={cat} 
                   onClick={() => setActiveCategory(cat)}
                   className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border ${activeCategory === cat ? 'border-brand-purple bg-[#F0E9FF] text-brand-purple' : 'border-border-soft bg-surface hover:bg-surface-soft text-text-muted'}`}
                 >
                   {cat}
                 </button>
               ))}
            </div>
          </div>

          {/* Action Button */}
          <div>
            <button
              onClick={handleTryOn}
              disabled={!personImage || !clothImage || isProcessing}
              className={`w-full h-14 rounded-xl text-base font-bold text-white flex items-center justify-center gap-2 transition-all shadow-md group ${
                !personImage || !clothImage || isProcessing
                  ? 'bg-gray-300 opacity-50 cursor-not-allowed shadow-none'
                  : 'bg-gradient-to-r from-brand-indigo via-brand-purple to-brand-pink hover:opacity-90 hover:shadow-lg'
              }`}
            >
              {isProcessing ? (
                <><Loader2 size={20} className="animate-spin" /> Generating...</>
              ) : (
                <><Sparkles size={20} /> Generate Try-On <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
            <p className="text-center text-[10px] font-bold text-text-muted mt-3 flex items-center justify-center gap-1">
              <Coins size={12} className="text-brand-pink"/> 1 V-Token per try-on
            </p>
          </div>

        </div>

        {/* Right Column - 60% */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Preview Card */}
          <div className="bg-surface rounded-[20px] p-5 shadow-[0_4px_20px_rgba(31,16,64,0.06)] border border-border-soft flex flex-col flex-1 min-h-[500px]">
             <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F0E9FF] text-brand-purple flex items-center justify-center">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h2 className="font-bold text-text-main text-base">Try-On Preview</h2>
                    <p className="text-xs text-text-muted">Your AI fashion studio result will appear here</p>
                  </div>
                </div>
                <div className="px-2 py-1 bg-surface border border-border-soft rounded flex items-center gap-1 text-[10px] font-bold text-brand-indigo shadow-sm">
                  <span className="px-1 bg-[#F0E9FF] rounded">HD</span> High Quality AI Result
                </div>
             </div>

             <div className="flex-1 bg-preview-bg rounded-xl border border-border-soft flex flex-col items-center justify-center relative overflow-hidden">
                {isProcessing ? (
                  <div className="text-center animate-pulse">
                    <div className="w-20 h-20 mx-auto rounded-full bg-brand-purple/10 flex items-center justify-center mb-4">
                      <Loader2 size={32} className="animate-spin text-brand-purple" />
                    </div>
                    <h3 className="font-bold text-text-main mb-1">Generating Magic...</h3>
                    <p className="text-sm text-text-muted">Fitting the clothes perfectly to your body</p>
                  </div>
                ) : resultImage ? (
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
                    <img src={resultImage} alt="Result" className="max-h-full max-w-full rounded-lg object-contain shadow-md" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-green-600 flex items-center gap-1 shadow-sm">
                       <CheckCircle2 size={14}/> Success
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-8">
                     {/* Placeholder illustration representation */}
                     <div className="w-48 h-48 mx-auto mb-6 relative">
                       <div className="absolute inset-0 bg-gradient-to-tr from-brand-indigo/20 to-brand-pink/20 rounded-full animate-pulse-slow blur-xl opacity-60"></div>
                       <div className="relative w-full h-full flex items-center justify-center bg-white rounded-full shadow-lg border border-border-soft">
                          <Shirt size={64} className="text-brand-purple opacity-50" />
                       </div>
                     </div>
                     <h3 className="font-bold text-lg text-text-main mb-2">Upload your photo and clothing</h3>
                     <p className="text-sm text-text-muted">Then click "Generate Try-On" to see the result here</p>
                  </div>
                )}
             </div>
          </div>

          {/* Recent Try-Ons */}
          <div className="bg-surface rounded-[20px] p-5 shadow-[0_4px_20px_rgba(31,16,64,0.06)] border border-border-soft">
             <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <HistoryIcon size={16} className="text-text-main" />
                  <h3 className="font-bold text-text-main text-sm">Recent Try-Ons</h3>
                </div>
                <button className="text-xs font-bold text-brand-purple flex items-center gap-1 hover:opacity-80">
                  View All <ArrowRight size={14}/>
                </button>
             </div>
             
             <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {/* Empty placeholders for recent items */}
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-preview-bg rounded-xl border border-border-soft flex items-center justify-center text-border-active/40">
                    <User size={24} />
                  </div>
                ))}
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}
