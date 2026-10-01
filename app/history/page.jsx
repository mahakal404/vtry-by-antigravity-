'use client';
import { useState } from 'react';
import { Search, ChevronDown, Heart, MoreVertical, RefreshCcw } from 'lucide-react';

const historyData = [
  { id: 1, imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80', date: '10 Jan 2026, 04:32 PM', clothingType: 'Hoodie', isFavorite: true },
  { id: 2, imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80', date: '09 Jan 2026, 02:15 PM', clothingType: 'Dress', isFavorite: false },
  { id: 3, imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80', date: '08 Jan 2026, 11:45 AM', clothingType: 'T-Shirt', isFavorite: true },
  { id: 4, imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80', date: '07 Jan 2026, 09:20 AM', clothingType: 'Jacket', isFavorite: false },
  { id: 5, imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80', date: '05 Jan 2026, 05:10 PM', clothingType: 'Sweater', isFavorite: false },
  { id: 6, imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80', date: '04 Jan 2026, 01:30 PM', clothingType: 'Pants', isFavorite: true },
  { id: 7, imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80', date: '02 Jan 2026, 10:05 AM', clothingType: 'Shirt', isFavorite: false },
  { id: 8, imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80', date: '01 Jan 2026, 08:00 AM', clothingType: 'Coat', isFavorite: true },
];

const tabs = ['All', 'Try-On Results', 'My Photos', 'Clothing Items'];

export default function History() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-[#FBFAFC]">
          History
        </h1>
        <p className="text-sm mt-1 text-slate-500 dark:text-[#94A3B8]">
          View your past virtual try-ons and reuse images.
        </p>
      </div>

      {/* Top Header & Controls */}
      <div className="flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center mt-8">
        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto w-full xl:w-auto pb-2 xl:pb-0 hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap transition-colors duration-200 border ${
                activeTab === tab
                  ? 'bg-[#8B5CF6] text-[#FFFFFF] rounded-full px-4 py-1.5 text-sm border-transparent'
                  : 'bg-[#F1F5FF] text-[#475569] border-transparent rounded-full px-4 py-1.5 text-sm hover:bg-[#E2E8F0] dark:bg-[#161324] dark:border-[#2D2A45] dark:text-[#94A3B8]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Search by outfit, date or type..."
              className="w-full bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg pl-9 pr-4 py-2 text-sm outline-none focus:border-[#8B5CF6] transition-colors duration-200 dark:bg-[#161324] dark:border-[#2D2A45] dark:text-[#FBFAFC] dark:placeholder-[#94A3B8]"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center justify-center gap-2 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors duration-200 dark:bg-[#161324] dark:border-[#2D2A45] dark:text-[#94A3B8] whitespace-nowrap flex-1 sm:flex-none">
              All Types <ChevronDown size={14} />
            </button>
            <button className="flex items-center justify-center gap-2 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors duration-200 dark:bg-[#161324] dark:border-[#2D2A45] dark:text-[#94A3B8] whitespace-nowrap flex-1 sm:flex-none">
              Latest First <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {historyData.map((item) => (
          <div
            key={item.id}
            className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[16px] p-4 transition-all duration-200 hover:border-[#D8B4FE] hover:shadow-[0_8px_24px_rgba(139,92,246,0.08)] dark:bg-[#1E1B2E] dark:border-[#2D2A45] hover:dark:border-[#3B3663]"
          >
            {/* Image Area */}
            <div className="aspect-[4/5] rounded-[12px] relative overflow-hidden mb-4 bg-gray-100 dark:bg-[#161324]">
              <img src={item.imageUrl} alt={item.clothingType} className="w-full h-full object-cover" />
              <button className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors duration-200">
                <Heart size={16} fill={item.isFavorite ? '#EC4899' : 'transparent'} color={item.isFavorite ? '#EC4899' : '#94A3B8'} />
              </button>
            </div>

            {/* Row 1 (Date & Menu) */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#94A3B8] text-sm dark:text-[#94A3B8]">{item.date}</span>
              <button className="text-[#94A3B8] hover:text-[#6366F1] transition-colors duration-200 p-1">
                <MoreVertical size={16} />
              </button>
            </div>

            {/* Row 2 (Tag & Action) */}
            <div className="flex items-center justify-between">
              <span className="bg-[#F1F5FF] text-[#6366F1] px-2.5 py-1 rounded-md text-xs font-medium border border-transparent dark:bg-[#161324] dark:border-[#2D2A45] dark:text-[#E2EBF0]">
                {item.clothingType}
              </span>
              <button className="bg-[#F8FAFF] border border-[#E5E7EB] text-[#6366F1] px-3 py-1 rounded-lg text-sm flex items-center gap-1.5 hover:bg-[#F1F5FF] transition-colors duration-200 dark:bg-[#161324] dark:border-[#3B3663] dark:text-[#FBFAFC] hover:dark:bg-[#2D2A45]">
                <RefreshCcw size={14} /> Reuse
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
