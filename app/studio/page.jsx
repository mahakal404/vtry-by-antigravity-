'use client';
export const dynamic = 'force-dynamic';
import { useState, useRef, useEffect } from 'react';
import { useHistory } from '@/contexts/HistoryContext';
import { useTokens } from '@/contexts/TokenContext';
import { User, Shirt, Upload, Sparkles, Loader2, Coins, ChevronDown, CheckCircle2, History as HistoryIcon, ArrowRight, ChevronRight, ShieldCheck, Download, X } from 'lucide-react';
import { handleDownload } from '@/utils/download';
import { fileToBase64, loadImage } from '@/utils/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useStudio } from '@/contexts/StudioContext';
import VTokenIcon from "@/components/VTokenIcon";
import Link from "next/link";
import { toast } from 'react-hot-toast';
const uploadToCloudinary = async (base64String) => {
  try {
    const formData = new FormData();
    formData.append('file', base64String);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
    
    const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`Upload failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Upload Error:', error);
    throw error;
  }
};
export default function Studio() {
  const { userPhotoBase64, setUserPhotoBase64, clothingPhotoBase64, setClothingPhotoBase64, currentResult, setCurrentResult } = useStudio();
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeCategory, setActiveCategory] = useState(null);
  
  const personInputRef = useRef(null);
  const clothInputRef = useRef(null);
  const previewRef = useRef(null);
  const { addToHistory, history, isHistoryLoading } = useHistory();
  const { displayBalance, balance: vTokens, spendTokens, addTokens } = useTokens();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem('vtry_user_photo');
    if (savedUser) setUserPhotoBase64(savedUser);
    
    const savedCloth = localStorage.getItem('vtry_cloth_photo');
    if (savedCloth) setClothingPhotoBase64(savedCloth);
  }, []);

  const handleClearImage = (e, type) => {
    e.stopPropagation();
    if (type === 'person') {
      setUserPhotoBase64(null);
      localStorage.removeItem('vtry_user_photo');
      if (personInputRef.current) personInputRef.current.value = '';
    } else {
      setClothingPhotoBase64(null);
      localStorage.removeItem('vtry_cloth_photo');
      if (clothInputRef.current) clothInputRef.current.value = '';
    }
  };

  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      const base64 = await fileToBase64(file);
      if (type === 'person') {
        setUserPhotoBase64(base64);
        localStorage.setItem('vtry_user_photo', base64);
      } else {
        setClothingPhotoBase64(base64);
        localStorage.setItem('vtry_cloth_photo', base64);
      }
    } catch (error) {
      toast.error('Failed to process image');
    }
  };

  const handleTryOn = async () => {
    if (!userPhotoBase64 || !clothingPhotoBase64) return;
    if (vTokens < 5) {
      toast.error("Not enough V-Tokens!");
      return;
    }
    setIsProcessing(true);
    setCurrentResult(null);
    
    const success = await spendTokens(5);
    if (!success) {
      setIsProcessing(false);
      return;
    }
    toast.success("5 V-Tokens deducted. Generating try-on...");
    setTimeout(() => previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);
    
    setProgress(0);
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const remaining = 90 - prev;
        const increment = remaining * 0.08; // Moves 8% of the remaining distance each tick
        return Math.min(prev + increment, 90);
      });
    }, 800);
    
    try {
      // 1. Upload to Cloudinary
      toast.success("Uploading secure images...");
      const userImageUrl = await uploadToCloudinary(userPhotoBase64);
      const clothingImageUrl = await uploadToCloudinary(clothingPhotoBase64);

      toast.success("Generating magic...");

      // 2. Call API
      const response = await fetch('/api/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userImageUrl,
          clothingImageUrl,
          category: activeCategory || 'Auto-Detect'
        }),
        signal: controller.signal
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate try-on');
      }

      const data = await response.json();
      const actualResult = data.result;

      setProgress(100);
      setCurrentResult(actualResult);
      addToHistory({
        personImage: userPhotoBase64,
        clothImage: clothingPhotoBase64,
        resultImage: actualResult,
        type: activeCategory || 'Auto-Detect'
      });

    } catch (error) {
      console.error(error);
      if (error.message === "Safety Filter Triggered" || error.message?.includes('Safety Filter')) {
        toast.error("⚠️ AI Safety Filter Triggered: Please upload a photo with more modest clothing to comply with AI guidelines.", { duration: 5000 });
      } else {
        toast.error("Generation failed or timed out. Don't worry, your 5 V-Tokens have been refunded!");
      }
      await addTokens(5);
    } finally {
      clearInterval(progressInterval);
      clearTimeout(timeoutId);
      setIsProcessing(false);
    }
  };

  const categories = ['Auto', 'T-Shirt', 'Shirt', 'Hoodie', 'Dress', 'Jacket'];

  return (
    <div className="max-w-7xl mx-auto pb-32 lg:pb-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div className="text-center lg:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-text-main dark:text-[#F8FAFC] flex items-center justify-center lg:justify-start gap-2 transition-colors duration-200">
            Virtual <span className="text-brand-purple">Try-On</span> Studio
          </h1>
          <p className="text-sm mt-1 text-text-muted dark:text-[#94A3B8] transition-colors duration-200">
            See it. Try it. Love it.
          </p>
        </div>
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-border-soft shadow-sm text-sm font-medium">
            <VTokenIcon size={24} className="mr-2" />
            <span className="text-text-main font-bold">{displayBalance} <span className="font-normal text-text-muted hidden sm:inline">V-Tokens</span></span>
            <Link href="/vtokens">
              <button className="w-6 h-6 rounded-full bg-brand-purple text-white flex items-center justify-center text-lg font-bold ml-1 hover:opacity-90 transition-opacity cursor-pointer">+</button>
            </Link>
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
          <div className="bg-surface rounded-[20px] p-5 shadow-[0_4px_20px_rgba(31,16,64,0.06)] border border-border-soft dark:bg-[#1E1B2E] dark:border-[#2D2A45] transition-colors duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-indigo text-white flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                <div>
                  <h2 className="font-bold text-text-main dark:text-[#F8FAFC] text-base transition-colors duration-200">Your Photo</h2>
                  <p className="text-xs text-text-muted dark:text-[#94A3B8] transition-colors duration-200">Upload a clear photo of yourself</p>
                </div>
              </div>
              <div className="px-3 py-1 bg-[#FFFBEB] text-[#D97706] rounded-full text-[10px] font-bold border border-[#FEF3C7] flex items-center gap-1 shadow-sm">
                💡 Best Results
              </div>
            </div>

            <div 
              onClick={() => personInputRef.current?.click()}
              className="bg-surface-soft border-2 border-dashed border-[#D8D2EE] hover:border-brand-purple rounded-xl p-6 text-center cursor-pointer transition-colors duration-200 dark:bg-[#161324] dark:border-[#3B3663] hover:dark:border-[#8B5CF6] group relative overflow-hidden"
            >
              <input ref={personInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'person')} />
              {userPhotoBase64 ? (
                <div className="relative inline-block w-full">
                  <img src={userPhotoBase64} alt="Person" className="max-h-40 mx-auto rounded-lg object-contain" />
                  <button
                    onClick={(e) => handleClearImage(e, 'person')}
                    className="absolute top-2 right-2 bg-white/90 backdrop-blur p-1.5 rounded-full text-gray-500 hover:text-red-500 hover:bg-white shadow-sm transition-colors z-10"
                    title="Remove Photo"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="py-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-white border border-border-soft flex items-center justify-center mb-3 shadow-sm group-hover:scale-105 transition-transform">
                    <User size={24} className="text-text-main" />
                    <div className="absolute ml-8 mt-8 w-5 h-5 bg-brand-purple rounded-full flex items-center justify-center border-2 border-white text-white"><span className="text-[10px] font-bold">+</span></div>
                  </div>
                  <h3 className="font-semibold text-sm text-text-main dark:text-[#F8FAFC] mb-1 transition-colors duration-200">Drag & drop your photo here</h3>
                  <p className="text-xs text-text-muted dark:text-[#94A3B8] mb-4 transition-colors duration-200">or click to upload</p>
                  <button className="px-5 py-2 rounded-lg bg-brand-indigo text-white text-xs font-semibold shadow-sm hover:opacity-90 flex items-center gap-2 mx-auto">
                    <Upload size={14} /> Choose Photo
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-4 mt-4 text-[10px] text-text-muted dark:text-[#94A3B8] font-medium transition-colors duration-200">
               <span className="flex items-center gap-1"><User size={12}/> Clear face</span>
               <span className="flex items-center gap-1"><Sparkles size={12}/> Good lighting</span>
               <span className="flex items-center gap-1"><User size={12}/> Full/half body</span>
            </div>
          </div>

          {/* Card 2: Clothing */}
          <div className="bg-surface rounded-[20px] p-5 shadow-[0_4px_20px_rgba(31,16,64,0.06)] border border-border-soft dark:bg-[#1E1B2E] dark:border-[#2D2A45] transition-colors duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-brand-pink text-white flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
              <div>
                <h2 className="font-bold text-text-main dark:text-[#F8FAFC] text-base transition-colors duration-200">Clothing</h2>
                <p className="text-xs text-text-muted dark:text-[#94A3B8] transition-colors duration-200">Upload a clothing item</p>
              </div>
            </div>

            <div 
              onClick={() => clothInputRef.current?.click()}
              className="bg-surface-soft border-2 border-dashed border-[#D8D2EE] hover:border-brand-pink rounded-xl p-6 text-center cursor-pointer transition-colors duration-200 dark:bg-[#161324] dark:border-[#3B3663] hover:dark:border-[#8B5CF6] group relative overflow-hidden mb-4"
            >
              <input ref={clothInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'cloth')} />
              {clothingPhotoBase64 ? (
                <div className="relative inline-block w-full">
                  <img src={clothingPhotoBase64} alt="Cloth" className="max-h-40 mx-auto rounded-lg object-contain" />
                  <button
                    onClick={(e) => handleClearImage(e, 'cloth')}
                    className="absolute top-2 right-2 bg-white/90 backdrop-blur p-1.5 rounded-full text-gray-500 hover:text-red-500 hover:bg-white shadow-sm transition-colors z-10"
                    title="Remove Clothing"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="py-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-white border border-border-soft flex items-center justify-center mb-3 shadow-sm group-hover:scale-105 transition-transform">
                    <Shirt size={24} className="text-text-main" />
                    <div className="absolute ml-8 mt-8 w-5 h-5 bg-brand-pink rounded-full flex items-center justify-center border-2 border-white text-white"><span className="text-[10px] font-bold">+</span></div>
                  </div>
                  <h3 className="font-semibold text-sm text-text-main dark:text-[#F8FAFC] mb-1 transition-colors duration-200">Drag & drop clothing image</h3>
                  <p className="text-xs text-text-muted dark:text-[#94A3B8] mb-4 transition-colors duration-200">or click to upload</p>
                  <button className="px-5 py-2 rounded-lg bg-brand-indigo text-white text-xs font-semibold shadow-sm hover:opacity-90 flex items-center gap-2 mx-auto">
                    <Upload size={14} /> Choose Photo
                  </button>
                </div>
              )}
            </div>

            {/* Categories */}
            <div className="hidden md:flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {categories.map(cat => {
                  const isAuto = cat === 'Auto';
                  const isSelected = activeCategory === cat || (isAuto && !activeCategory);
                  return (
                   <button 
                     key={cat} 
                     onClick={() => setActiveCategory(isAuto ? null : cat)}
                     className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors duration-200 border ${isSelected ? 'border-brand-purple bg-[#F0E9FF] text-brand-purple dark:bg-[#8B5CF6] dark:border-[#8B5CF6] dark:text-[#FFFFFF]' : 'border-border-soft bg-surface hover:bg-surface-soft text-text-muted dark:bg-[#161324] dark:border-[#2D2A45] dark:text-[#E2EBF0]'}`}
                   >
                     {cat}
                   </button>
                  )
                })}
            </div>
          </div>
          
          {/* Photo Guidelines Info Box (Desktop) */}
          <div className="hidden lg:block bg-[#F8F5FF] dark:bg-[#2A243F] rounded-[20px] p-5 shadow-sm border border-[#E9D5FF] dark:border-[#4C1D95] transition-colors duration-200">
            <h3 className="font-bold text-brand-purple dark:text-[#C4B5FD] text-sm mb-3 flex items-center gap-2">
              💡 Tips & AI Guidelines
            </h3>
            <ul className="space-y-2 text-xs text-text-main dark:text-[#E2EBF0] font-medium">
              <li className="flex items-start gap-2 leading-relaxed">
                <span className="text-green-500 mt-0.5 flex-shrink-0">✅</span>
                <span><strong>Best Results:</strong> Use clear, well-lit, front-facing photos.</span>
              </li>
              <li className="flex items-start gap-2 leading-relaxed">
                <span className="text-green-500 mt-0.5 flex-shrink-0">✅</span>
                <span><strong>Clothing Fit:</strong> Upload flat-lay or front-facing clothing items on a plain background for accurate try-ons.</span>
              </li>
              <li className="flex items-start gap-2 leading-relaxed">
                <span className="text-red-500 mt-0.5 flex-shrink-0">❌</span>
                <span><strong>AI Safety Filters:</strong> Avoid swimwear, lingerie, or heavily skin-exposing outfits. The AI will reject these.</span>
              </li>
              <li className="flex items-start gap-2 leading-relaxed">
                <span className="text-red-500 mt-0.5 flex-shrink-0">❌</span>
                <span><strong>Avoid:</strong> Blurry images, extreme poses, or multiple people in one frame.</span>
              </li>
            </ul>
          </div>

          {/* Action Button */}
          <div className="fixed bottom-16 left-0 w-full px-4 py-3 bg-white/90 dark:bg-[#1E1B2E]/90 backdrop-blur-md z-40 border-t border-border-soft dark:border-[#2D2A45] lg:static lg:bg-transparent lg:border-none lg:p-0">
            <div className="hidden lg:flex mb-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 rounded-xl p-3 items-start gap-3 shadow-sm transition-colors duration-200">
              <ShieldCheck className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs font-medium text-green-800 dark:text-green-400/90 leading-relaxed">
                <strong className="block mb-0.5">100% Private & Secure</strong>
                Your photos stay on your local device and are never stored in the cloud.
              </p>
            </div>
            <button
              onClick={handleTryOn}
              disabled={!userPhotoBase64 || !clothingPhotoBase64 || vTokens < 5 || isProcessing}
              className={`w-full h-14 rounded-xl text-base font-bold text-white flex items-center justify-center gap-2 transition-all shadow-md group ${
                !userPhotoBase64 || !clothingPhotoBase64 || vTokens < 5 || isProcessing
                  ? 'bg-gray-300 opacity-50 cursor-not-allowed shadow-none'
                  : 'bg-gradient-to-r from-brand-indigo via-brand-purple to-brand-pink hover:opacity-90 hover:shadow-lg'
              }`}
            >
              {isProcessing ? (
                <><Loader2 size={20} className="animate-spin" /> Generating...</>
              ) : (
                <>
                  <Sparkles size={20} /> Generate Try-On <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  <div className="flex items-center bg-white/20 px-3 py-1 rounded-full text-sm ml-2">
                    <span className="mr-1">- 5</span>
                    <VTokenIcon size={18}/>
                  </div>
                </>
              )}
            </button>
            <div className="hidden lg:flex items-center justify-center gap-2 text-sm text-gray-500 font-medium mt-3">
              <span>Current Balance:</span>
              <span className="font-bold text-brand-purple">{vTokens}</span>
              <VTokenIcon size={20}/>
            </div>
          </div>

        </div>

        {/* Right Column - 60% */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Preview Card */}
          <div ref={previewRef} className="bg-surface rounded-[20px] p-5 shadow-[0_4px_20px_rgba(31,16,64,0.06)] border border-border-soft dark:bg-[#1E1B2E] dark:border-[#2D2A45] flex flex-col flex-1 min-h-[500px] transition-colors duration-200">
             <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F0E9FF] text-brand-purple flex items-center justify-center">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h2 className="font-bold text-text-main dark:text-[#F8FAFC] text-base transition-colors duration-200">Try-On Preview</h2>
                    <p className="text-xs text-text-muted dark:text-[#94A3B8] transition-colors duration-200">Your AI fashion studio result will appear here</p>
                  </div>
                </div>
                <div className="px-2 py-1 bg-surface border border-border-soft rounded flex items-center gap-1 text-[10px] font-bold text-brand-indigo shadow-sm">
                  <span className="px-1 bg-[#F0E9FF] rounded">HD</span> High Quality AI Result
                </div>
             </div>

             <div className="flex-1 bg-preview-bg rounded-xl border border-border-soft dark:bg-[#161324] flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-200">
                {isProcessing && !currentResult ? (
                  <div className="text-center w-full max-w-md mx-auto px-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-brand-purple/10 flex items-center justify-center mb-6 shadow-inner">
                      <Sparkles size={28} className="text-brand-purple animate-pulse" />
                    </div>
                    <h3 className="font-bold text-text-main dark:text-[#F8FAFC] mb-3 transition-colors duration-200 text-lg">Generating Magic...</h3>
                    
                    {/* Progress Bar Container */}
                    <div className="w-full bg-surface-soft dark:bg-[#2D2A45] rounded-full h-3 mb-2 overflow-hidden shadow-inner border border-border-soft dark:border-transparent">
                      <div 
                        className="bg-gradient-to-r from-brand-indigo via-brand-purple to-brand-pink h-full rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-xs text-text-muted dark:text-[#94A3B8] font-semibold">
                      <span>Fitting clothes</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                  </div>
                ) : currentResult ? (
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
                    <img src={currentResult} alt="Result" className="max-h-full max-w-full rounded-lg object-contain shadow-md" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-green-600 flex items-center gap-1 shadow-sm">
                       <CheckCircle2 size={14}/> Success
                    </div>
                    <button 
                      onClick={() => setCurrentResult(null)}
                      className="absolute top-4 left-4 bg-white/90 backdrop-blur p-1.5 rounded-full text-gray-500 hover:text-red-500 hover:bg-white shadow-sm transition-colors"
                      title="Clear Result"
                    >
                      <X size={16} />
                    </button>
                    <div className="mt-4">
                      <button 
                        onClick={() => handleDownload(currentResult, 'vtry-result.png')}
                        className="flex items-center gap-2 px-6 py-2.5 bg-brand-purple text-white rounded-xl font-bold shadow-lg hover:opacity-90 transition-opacity"
                      >
                        <Download size={18} /> Download Result
                      </button>
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
                     <h3 className="font-bold text-lg text-text-main dark:text-[#F8FAFC] mb-2 transition-colors duration-200">Upload your photo and clothing</h3>
                     <p className="text-sm text-text-muted dark:text-[#94A3B8] transition-colors duration-200">Then click "Generate Try-On" to see the result here</p>
                  </div>
                )}
             </div>
          </div>

          {/* Recent Try-Ons */}
          <div className="hidden lg:block bg-surface rounded-[20px] p-5 shadow-[0_4px_20px_rgba(31,16,64,0.06)] border border-border-soft dark:bg-[#1E1B2E] dark:border-[#2D2A45] transition-colors duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <HistoryIcon size={16} className="text-text-main dark:text-[#F8FAFC]" />
                  <h3 className="font-bold text-text-main dark:text-[#F8FAFC] text-sm transition-colors duration-200">Recent Try-Ons</h3>
                </div>
                <Link href="/history">
                  <button className="text-xs font-bold text-brand-purple flex items-center gap-1 hover:opacity-80">
                    View All <ArrowRight size={14}/>
                  </button>
                </Link>
             </div>
             
             <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {isHistoryLoading ? (
                  <div className="w-full flex justify-center py-4">
                    <div className="w-6 h-6 border-2 border-brand-purple border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : history.length > 0 ? (
                  history.slice(0, 10).map(result => (
                    <div key={result.id} className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-xl overflow-hidden border border-border-soft shadow-sm group relative">
                      <img src={result.resultImage} alt={result.type || 'Result'} className="w-full h-full object-cover" />
                    </div>
                  ))
                ) : (
                  [1,2,3,4,5].map(i => (
                    <div key={i} className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-preview-bg rounded-xl border border-border-soft dark:bg-[#1E1B2E] dark:border-[#2D2A45] transition-colors duration-200 flex items-center justify-center text-border-active/40">
                      <User size={24} />
                    </div>
                  ))
                )}
             </div>
          </div>

        </div>

      </div>

      <div className="lg:hidden flex flex-col gap-4 mt-6">
        {/* Privacy Banner (Mobile) */}
        <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 rounded-xl p-3 flex items-start gap-3 shadow-sm transition-colors duration-200">
          <ShieldCheck className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs font-medium text-green-800 dark:text-green-400/90 leading-relaxed">
            <strong className="block mb-0.5">100% Private & Secure</strong>
            Your photos stay on your local device and are never stored in the cloud.
          </p>
        </div>

        {/* Photo Guidelines Info Box (Mobile) */}
        <div className="bg-[#F8F5FF] dark:bg-[#2A243F] rounded-[20px] p-5 shadow-sm border border-[#E9D5FF] dark:border-[#4C1D95] transition-colors duration-200">
          <h3 className="font-bold text-brand-purple dark:text-[#C4B5FD] text-sm mb-3 flex items-center gap-2">
            💡 Tips & AI Guidelines
          </h3>
          <ul className="space-y-2 text-xs text-text-main dark:text-[#E2EBF0] font-medium">
            <li className="flex items-start gap-2 leading-relaxed">
              <span className="text-green-500 mt-0.5 flex-shrink-0">✅</span>
              <span><strong>Best Results:</strong> Use clear, well-lit, front-facing photos.</span>
            </li>
            <li className="flex items-start gap-2 leading-relaxed">
              <span className="text-green-500 mt-0.5 flex-shrink-0">✅</span>
              <span><strong>Clothing Fit:</strong> Upload flat-lay or front-facing clothing items on a plain background for accurate try-ons.</span>
            </li>
            <li className="flex items-start gap-2 leading-relaxed">
              <span className="text-red-500 mt-0.5 flex-shrink-0">❌</span>
              <span><strong>AI Safety Filters:</strong> Avoid swimwear, lingerie, or heavily skin-exposing outfits. The AI will reject these.</span>
            </li>
            <li className="flex items-start gap-2 leading-relaxed">
              <span className="text-red-500 mt-0.5 flex-shrink-0">❌</span>
              <span><strong>Avoid:</strong> Blurry images, extreme poses, or multiple people in one frame.</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
}
