import React, { useState } from 'react';
import { ArrowRight, Calendar, Clock, User, X, BookOpen, Share2 } from 'lucide-react';
import { NewsArticle } from '../types';

interface NewsSectionProps {
  articles: NewsArticle[];
  onSelectArticle?: (article: NewsArticle) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ articles, onSelectArticle }) => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const handleRead = (article: NewsArticle) => {
    if (onSelectArticle) {
      onSelectArticle(article);
    } else {
      setSelectedArticle(article);
    }
  };

  return (
    <section className="py-20 bg-white border-b border-stone-200" id="news">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-800">
            Press & Community Bulletins
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
            News & Updates
          </h2>
          <div className="w-12 h-1 bg-amber-500 mx-auto mt-3 rounded-full" />
          <p className="text-stone-600 text-sm mt-4 leading-relaxed">
            Stay informed with verified field reports, project milestones, upcoming humanitarian drives, and seasonal appeals in Potiskum.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <article
              key={art.id}
              className="bg-[#faf8f4] rounded-xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="aspect-16/10 relative overflow-hidden bg-stone-200">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-emerald-950/80 backdrop-blur-xs text-amber-300 text-[11px] font-medium rounded">
                      {art.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  {/* Unboxed Metadata with · separator */}
                  <div className="flex items-center gap-2 text-[11px] text-stone-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-emerald-700" />
                      {art.date}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-700" />
                      {art.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-emerald-950 transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-stone-600 mt-2.5 leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => handleRead(art)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
            <div className="relative aspect-16/9 bg-stone-900">
              <img
                src={selectedArticle.imageUrl}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 bg-emerald-900 text-amber-300 text-xs font-semibold rounded">
                  {selectedArticle.category}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 border-b border-stone-200 pb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                  {selectedArticle.date}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-700" />
                  {selectedArticle.readTime}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-emerald-700" />
                  {selectedArticle.author}
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                {selectedArticle.title}
              </h2>

              <div className="space-y-4 text-stone-700 text-sm leading-relaxed pt-2">
                {selectedArticle.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="pt-6 border-t border-stone-200 flex items-center justify-between text-xs">
                <div className="text-stone-500">
                  Published by <span className="font-medium text-emerald-950">Zanjabeel Communications Bureau</span>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-md font-medium"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
