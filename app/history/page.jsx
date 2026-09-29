'use client';
import { useHistory } from '@/contexts/HistoryContext';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Trash2 } from 'lucide-react';

/**
 * History Page
 * - Displays past virtual try-on results from localStorage
 * - Shows empty state with CTA if no history exists
 * - Grid layout for result cards
 */
export default function History() {
  const { history, removeFromHistory, clearHistory } = useHistory();
  const navigate = useRouter();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--color-text)', fontFamily: 'serif' }}>
          History
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>
          View your past virtual try-ons and reuse images.
        </p>
      </div>

      {history.length === 0 ? (
        /* Empty State */
        <div className="rounded-2xl p-8 sm:p-12 text-center"
             style={{ backgroundColor: 'var(--color-card)', border: '2px dashed var(--color-border)' }}>
          <p className="text-sm mb-4" style={{ color: 'var(--color-muted)' }}>
            No generations yet. Visit the Studio to start.
          </p>
          <button
            onClick={() => navigate('/studio')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Go to Studio <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <>
          {/* Clear All Button */}
          <div className="flex justify-end">
            <button
              onClick={clearHistory}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
              style={{ color: '#ef4444' }}
            >
              <Trash2 size={14} /> Clear All
            </button>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl overflow-hidden card-hover"
                style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}
              >
                {/* Result Image */}
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img
                    src={item.resultImage}
                    alt="Try-on result"
                    className="w-full h-full object-cover"
                  />
                  {/* Remove button overlay */}
                  <button
                    onClick={() => removeFromHistory(item.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg backdrop-blur-sm transition-opacity hover:opacity-100 opacity-70"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                  >
                    <Trash2 size={14} className="text-red-400" />
                  </button>
                </div>

                {/* Card Footer */}
                <div className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Sparkles size={12} style={{ color: 'var(--color-primary)' }} />
                    <span className="text-xs" style={{ color: 'var(--color-muted)' }}>
                      {new Date(item.timestamp).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric'
                      })}
                    </span>
                  </div>
                  {/* Thumbnail previews of source images */}
                  <div className="flex -space-x-2">
                    <img src={item.personImage} alt="" className="w-6 h-6 rounded-full border border-gray-700 object-cover" />
                    <img src={item.clothImage} alt="" className="w-6 h-6 rounded-full border border-gray-700 object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
