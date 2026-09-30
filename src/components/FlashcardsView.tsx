import React, { useState } from 'react';
import { 
  RotateCw, 
  Volume2, 
  CheckCircle, 
  Search, 
  LayoutGrid, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  BookMarked,
  Sparkles,
  Award
} from 'lucide-react';
import { CardCategory, Flashcard } from '../types';

interface FlashcardsViewProps {
  cards: Flashcard[];
  masteredCardIds: string[];
  onToggleMastery: (id: string) => void;
  onSelectPracticeQuiz: () => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  cards,
  masteredCardIds,
  onToggleMastery,
  onSelectPracticeQuiz,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Filter cards
  const filteredCards = cards.filter((card) => {
    const matchCategory = selectedCategory === 'all' || card.category === selectedCategory;
    const matchSearch =
      searchQuery === '' ||
      card.frontTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.frontKeyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.backDetail.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase())) ||
      card.keyTakeaway.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSpeak = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-TW';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const categories = [
    { id: 'all', name: '全部字卡', count: cards.length },
    { id: 'core', name: '核心概念', count: cards.filter((c) => c.category === 'core').length },
    { id: 'defense', name: '食品防護', count: cards.filter((c) => c.category === 'defense').length },
    { id: 'regulations', name: '法規比較', count: cards.filter((c) => c.category === 'regulations').length },
    { id: 'ghp_practice', name: 'GHP實務', count: cards.filter((c) => c.category === 'ghp_practice').length },
  ];

  const currentCarouselCard = filteredCards[carouselIndex] || filteredCards[0];
  const isCurrentFlipped = currentCarouselCard ? !!flippedCards[currentCarouselCard.id] : false;

  return (
    <div className="space-y-6">
      {/* Top Banner & Strategy Summary */}
      <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
            <BookMarked className="w-3.5 h-3.5" />
            Chapter 1 廚房安全衛生守則
          </div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            互動核心學習字卡
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            點擊卡片可 3D 翻轉查看背面深度解析與法規條文。點選喇叭圖示可自動朗讀要點，點選勾選框標記「已掌握」，幫助高效複習！
          </p>
        </div>

        {/* Action quick links */}
        <div className="flex items-center gap-2">
          <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl px-4 py-2.5 text-center">
            <div className="text-xs text-emerald-700 font-medium">總學習掌握度</div>
            <div className="text-xl font-black text-emerald-800">
              {Math.round((masteredCardIds.length / cards.length) * 100)}%
            </div>
          </div>
          <button
            onClick={onSelectPracticeQuiz}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            進入模擬測驗
          </button>
        </div>
      </div>

      {/* Control Bar: Categories, Search, View Mode */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setCarouselIndex(0);
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-emerald-50 hover:text-emerald-700'
              }`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        {/* Right: Search & View toggle */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCarouselIndex(0);
              }}
              placeholder="搜尋關鍵字（例如：911、GHP、三專）"
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-2xl text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>

          <div className="flex items-center bg-white border border-slate-200 rounded-2xl p-1 shadow-2xs">
            <button
              onClick={() => setViewMode('grid')}
              title="網格檢視"
              className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-emerald-100 text-emerald-800' : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('carousel')}
              title="單卡專注輪播模式"
              className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                viewMode === 'carousel' ? 'bg-emerald-100 text-emerald-800' : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main View Area */}
      {filteredCards.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <p className="text-slate-500 text-base">找不到符合「{searchQuery}」的字卡</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-3 text-xs font-bold text-emerald-600 underline"
          >
            重設篩選條件
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid Mode */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCards.map((card) => {
            const isFlipped = !!flippedCards[card.id];
            const isMastered = masteredCardIds.includes(card.id);

            return (
              <div
                key={card.id}
                onClick={() => toggleFlip(card.id)}
                className="perspective-1000 min-h-[300px] cursor-pointer group"
              >
                <div
                  className={`relative w-full h-full duration-500 transform-style-3d transition-transform rounded-3xl ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* FRONT SIDE */}
                  <div className="absolute inset-0 backface-hidden bg-white rounded-3xl p-6 border-2 border-slate-200/90 hover:border-emerald-400 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          {card.categoryName}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => handleSpeak(`${card.frontTitle}。${card.frontKeyword}`, e)}
                            title="語音朗讀"
                            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-emerald-600 transition-colors"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleMastery(card.id);
                            }}
                            title={isMastered ? '已掌握' : '標記已掌握'}
                            className={`p-1.5 rounded-full transition-colors ${
                              isMastered
                                ? 'text-emerald-600 bg-emerald-50'
                                : 'text-slate-300 hover:text-emerald-500'
                            }`}
                          >
                            <CheckCircle className="w-4 h-4 fill-current" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                          重點考點
                        </div>
                        <h3 className="text-xl font-black text-slate-800 tracking-tight mt-1 leading-snug">
                          {card.frontTitle}
                        </h3>
                      </div>

                      <div className="mt-4 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center">
                        <div className="text-xs text-emerald-700 font-semibold mb-1">記憶口訣 / 關鍵字</div>
                        <div className="text-lg font-black text-emerald-900 font-mono">
                          {card.frontKeyword}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                      <span className="font-mono">{card.slideRef}</span>
                      <span className="flex items-center gap-1 text-emerald-600 font-medium group-hover:translate-x-0.5 transition-transform">
                        點擊翻轉解析 <RotateCw className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* BACK SIDE */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-3xl p-6 border-2 border-emerald-700 shadow-xl flex flex-col justify-between overflow-y-auto">
                    <div>
                      <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                          深度解析・{card.categoryName}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => handleSpeak(card.backDetail.join('。'), e)}
                          title="朗讀解析"
                          className="p-1 rounded-full text-emerald-300 hover:text-white"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      <h4 className="text-base font-black text-emerald-200 mb-3">
                        {card.frontTitle}
                      </h4>

                      <ul className="space-y-2 text-xs sm:text-sm text-slate-200/90 leading-relaxed list-disc pl-4">
                        {card.backDetail.map((detail, idx) => (
                          <li key={idx} className="marker:text-emerald-400">
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 mt-3 border-t border-white/10">
                      <div className="text-[11px] text-amber-300 font-semibold mb-0.5">必記精要：</div>
                      <div className="text-xs text-white bg-white/10 p-2.5 rounded-xl border border-white/10">
                        {card.keyTakeaway}
                      </div>
                      <div className="mt-2 text-right">
                        <span className="text-[10px] text-emerald-400/80">點擊任意處翻回正面</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Carousel / Focused Single Card Mode */
        <div className="max-w-2xl mx-auto space-y-4">
          <div
            onClick={() => toggleFlip(currentCarouselCard.id)}
            className="perspective-1000 min-h-[380px] sm:min-h-[420px] cursor-pointer"
          >
            <div
              className={`relative w-full h-full min-h-[380px] sm:min-h-[420px] duration-500 transform-style-3d transition-transform rounded-3xl ${
                isCurrentFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* Carousel FRONT */}
              <div className="absolute inset-0 backface-hidden bg-white rounded-3xl p-8 border-2 border-emerald-300 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                      {currentCarouselCard.categoryName}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => handleSpeak(`${currentCarouselCard.frontTitle}。${currentCarouselCard.frontKeyword}`, e)}
                        className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-emerald-600"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleMastery(currentCarouselCard.id);
                        }}
                        className={`p-2 rounded-full ${
                          masteredCardIds.includes(currentCarouselCard.id)
                            ? 'text-emerald-600 bg-emerald-50'
                            : 'text-slate-300 hover:text-emerald-500'
                        }`}
                      >
                        <CheckCircle className="w-5 h-5 fill-current" />
                      </button>
                    </div>
                  </div>

                  <div className="my-6 text-center">
                    <span className="text-xs font-semibold text-emerald-600 tracking-wider">
                      核心守則主題
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">
                      {currentCarouselCard.frontTitle}
                    </h3>
                  </div>

                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center my-4">
                    <div className="text-xs text-emerald-700 font-semibold mb-1">關鍵記憶記憶點</div>
                    <div className="text-xl sm:text-2xl font-black text-emerald-900 font-mono">
                      {currentCarouselCard.frontKeyword}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-4">
                  <span>{currentCarouselCard.slideRef}</span>
                  <span className="flex items-center gap-1 text-emerald-700 font-bold">
                    點擊卡片翻閱解答與解析 <RotateCw className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Carousel BACK */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white rounded-3xl p-8 border-2 border-emerald-500 shadow-2xl flex flex-col justify-between overflow-y-auto">
                <div>
                  <div className="flex items-center justify-between border-b border-white/15 pb-3 mb-4">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300">
                      深度解析 • {currentCarouselCard.categoryName}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleSpeak(currentCarouselCard.backDetail.join('。'), e)}
                      className="p-1 rounded-full text-emerald-300 hover:text-white"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>

                  <h4 className="text-xl font-black text-emerald-300 mb-4">
                    {currentCarouselCard.frontTitle}
                  </h4>

                  <ul className="space-y-3 text-sm text-slate-200 list-disc pl-5 leading-relaxed">
                    {currentCarouselCard.backDetail.map((d, i) => (
                      <li key={i} className="marker:text-emerald-400">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10 mt-4">
                  <div className="text-xs text-amber-300 font-bold mb-1">重要考點掌握：</div>
                  <div className="text-xs sm:text-sm text-white bg-white/10 p-3 rounded-xl border border-white/15">
                    {currentCarouselCard.keyTakeaway}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between bg-white px-6 py-3 rounded-2xl border border-slate-200 shadow-xs">
            <button
              onClick={() => setCarouselIndex((prev) => Math.max(0, prev - 1))}
              disabled={carouselIndex === 0}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-xs font-bold text-slate-700">
              {carouselIndex + 1} / {filteredCards.length}
            </div>
            <button
              onClick={() => setCarouselIndex((prev) => Math.min(filteredCards.length - 1, prev + 1))}
              disabled={carouselIndex === filteredCards.length - 1}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
