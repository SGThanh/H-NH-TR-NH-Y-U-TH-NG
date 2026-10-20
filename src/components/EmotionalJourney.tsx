import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Compass, 
  Crown, 
  BookOpen, 
  Award, 
  Coffee, 
  Palette, 
  Gift, 
  CheckCircle2, 
  Eye,
  Quote,
  Camera,
  Pencil,
  Check,
  X,
  RotateCcw
} from 'lucide-react';
import { EmotionStage, TimelineMilestone } from '../types';
import { emotionalStages } from '../data/emotionalData';

const STORAGE_KEY_KEEPSAKES = 'danthanh_ngocyen_custom_keepsakes_v2';

interface EmotionalJourneyProps {
  milestones: TimelineMilestone[];
  onSelectMilestone: (milestone: TimelineMilestone) => void;
  onOpenLightbox: (imageUrl: string, title: string, subtitle: string) => void;
  customImages?: Record<string, string>;
  onOpenPhotoManager?: (milestoneId?: string) => void;
}

export const EmotionalJourney: React.FC<EmotionalJourneyProps> = ({
  milestones,
  onSelectMilestone,
  onOpenLightbox,
  customImages = {},
  onOpenPhotoManager,
}) => {
  const [activeStageId, setActiveStageId] = useState<string>(emotionalStages[0].id);

  // Custom keepsakes persisted in localStorage
  const [customKeepsakes, setCustomKeepsakes] = useState<
    Record<string, { title: string; description: string; symbol: string }>
  >(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_KEEPSAKES);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Edit keepsake modal state
  const [editingKeepsake, setEditingKeepsake] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editSymbol, setEditSymbol] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_KEEPSAKES, JSON.stringify(customKeepsakes));
    } catch {
      // guard
    }
  }, [customKeepsakes]);

  const activeStage = emotionalStages.find((s) => s.id === activeStageId) || emotionalStages[0];
  const activeIndex = emotionalStages.findIndex((s) => s.id === activeStageId);

  // Current active keepsake (customized or default)
  const currentKeepsake = customKeepsakes[activeStage.id] || activeStage.keepsake;

  // Get associated milestone objects
  const associatedMilestones = milestones.filter((m) =>
    activeStage.associatedMilestoneIds.includes(m.id)
  );

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % emotionalStages.length;
    setActiveStageId(emotionalStages[nextIndex].id);
  };

  const handlePrev = () => {
    const prevIndex = (activeIndex - 1 + emotionalStages.length) % emotionalStages.length;
    setActiveStageId(emotionalStages[prevIndex].id);
  };

  const handleSaveKeepsake = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTitle.trim()) return;
    setCustomKeepsakes((prev) => ({
      ...prev,
      [activeStage.id]: {
        title: editTitle.trim(),
        description: editDesc.trim(),
        symbol: editSymbol.trim() || '☕',
      },
    }));
    setEditingKeepsake(false);
  };

  const handleResetKeepsake = () => {
    setCustomKeepsakes((prev) => {
      const next = { ...prev };
      delete next[activeStage.id];
      return next;
    });
    setEditingKeepsake(false);
  };

  const handleApplyCoffeePreset = () => {
    setEditTitle('Ly cà phê gặp gỡ đầu tiên');
    setEditDesc('Ly cà phê gặp gỡ đầu tiên lúc này chúng tôi uống tại E-coffee Trung Nguyên Củ Chi (ngày 30/09/2022)');
    setEditSymbol('☕');
  };

  return (
    <section id="emotional-journey-section" className="py-16 sm:py-20 px-4 sm:px-6 relative bg-gradient-to-b from-[#FAF6F0] via-[#F5EFE6] to-[#FAF6F0] border-y border-[#E5DAD0]">
      {/* Decorative background traditional motifs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full pointer-events-none opacity-40 overflow-hidden">
        <div className="absolute top-10 left-6 w-72 h-72 rounded-full bg-[#8C1D2F]/5 blur-3xl" />
        <div className="absolute bottom-10 right-6 w-80 h-80 rounded-full bg-[#D4AF37]/8 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header - Sized 1 step smaller for optimal single-line harmony */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8C1D2F]/10 border border-[#8C1D2F]/20 text-[#8C1D2F] text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Tâm Thức Đồng Hành • Hòa Quyện Linh Hồn</span>
          </div>

          <h2 className="font-serif-cormorant text-2xl sm:text-4xl font-bold text-[#231D1B] tracking-tight leading-tight">
            Hành Trình Qua Từng Cung Bậc Cảm Xúc
          </h2>

          <p className="font-serif-cormorant text-sm sm:text-base italic text-[#5E5248] mt-2.5 leading-relaxed">
            "Tình yêu đích thực không chỉ là những ngày rực rỡ nắng ấm, mà là từng giọt mồ hôi cùng nhau san sẻ, từng bước chân đồng cam cộng khổ để ngày chung đôi thêm muôn phần thiêng liêng."
          </p>

          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4" />
        </div>

        {/* Emotion Spectrum Step Navigator (Ribbon of 8 emotional stages) */}
        <div className="mb-10 overflow-x-auto pb-4 pt-2 scrollbar-thin">
          <div className="flex items-center justify-between min-w-[760px] relative px-4">
            {/* Connecting line */}
            <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-[2px] bg-[#E2D5C5] z-0" />

            {emotionalStages.map((stage, idx) => {
              const isActive = stage.id === activeStageId;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageId(stage.id)}
                  className={`relative z-10 flex flex-col items-center group cursor-pointer transition-all duration-300 focus:outline-hidden ${
                    isActive ? 'scale-110' : 'opacity-75 hover:opacity-100 hover:scale-105'
                  }`}
                >
                  {/* Circle badge */}
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold transition-all shadow-md ${
                      isActive
                        ? 'bg-[#8C1D2F] text-[#FAF2DC] ring-4 ring-[#D4AF37]/50 shadow-[#8C1D2F]/30 scale-105'
                        : 'bg-white text-[#5E5248] border-2 border-[#D8C9B8] hover:border-[#8C1D2F]'
                    }`}
                  >
                    <span>{stage.keepsake.symbol}</span>
                  </div>

                  {/* Stage Name & Step number */}
                  <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-[#8A7D71]">
                    Cung Bậc 0{stage.order}
                  </span>
                  <span
                    className={`text-xs font-semibold text-center whitespace-nowrap mt-0.5 ${
                      isActive ? 'text-[#8C1D2F] font-bold' : 'text-[#4A413A]'
                    }`}
                  >
                    {stage.name.split('&')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Detailed Card */}
        <div className="bg-white/95 rounded-3xl border-2 border-[#D4AF37]/40 shadow-xl shadow-black/5 overflow-hidden transition-all duration-300">
          {/* Card Top Banner with Royal Accents */}
          <div className="bg-gradient-to-r from-[#FAF0DC] via-[#FAF6F0] to-[#FAF0DC] px-6 sm:px-10 py-6 border-b border-[#E8DFD3] flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#8C1D2F] text-[#FAF2DC] text-xs font-bold uppercase tracking-wider shadow-xs">
                  Cung Bậc 0{activeStage.order} / 08
                </span>
                <span className="text-xs font-semibold text-[#8C1D2F] bg-[#8C1D2F]/10 px-2.5 py-0.5 rounded-full border border-[#8C1D2F]/20">
                  {activeStage.subtitle}
                </span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-serif-cormorant font-bold text-[#231D1B] tracking-tight">
                {activeStage.name}
              </h3>
            </div>

            {/* Intimacy & Emotional depth meter */}
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-[#D4AF37]/40 shadow-2xs">
              <div className="text-right">
                <span className="block text-[10px] uppercase font-bold text-[#8A7D71] tracking-wider">
                  Mức Độ Gắn Kết
                </span>
                <span className="text-base sm:text-lg font-bold text-[#8C1D2F] font-serif-cormorant">
                  {activeStage.intimacyScore}% Tình Tri Kỷ
                </span>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#8C1D2F]/10 flex items-center justify-center text-[#8C1D2F]">
                <Heart className="w-5 h-5 fill-[#8C1D2F]" />
              </div>
            </div>
          </div>

          {/* Main Content Body */}
          <div className="p-6 sm:p-10 space-y-8">
            {/* Emotional Tagline / Mood */}
            <div className="p-4 rounded-2xl bg-[#FAF6F0] border-l-4 border-[#8C1D2F] flex items-start gap-3.5">
              <Quote className="w-6 h-6 text-[#8C1D2F] shrink-0 mt-0.5 opacity-80" />
              <div>
                <span className="text-[11px] uppercase font-bold text-[#8C1D2F] tracking-wider block">
                  Cảm Xúc Chủ Đạo
                </span>
                <p className="text-sm sm:text-base font-serif-cormorant italic text-[#38302A] font-medium leading-snug">
                  "{activeStage.tagline}"
                </p>
              </div>
            </div>

            {/* Narrative Story */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#73665C] flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                <span>Hành Trình Đồng Hành Thực Tế</span>
              </h4>
              <p className="text-sm sm:text-base text-[#423832] leading-relaxed font-normal bg-[#FAF8F5]/60 p-5 rounded-2xl border border-[#EDE4D8]">
                {activeStage.narrative}
              </p>
            </div>

            {/* Two Perspectives: Husband (1992) & Wife (1995) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              {/* Husband Reflection */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#F8F5F0] to-[#F1ECE3] border border-[#DCD0C2] space-y-3 relative shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#2B4C5F] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                    T
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-[#231D1B] whitespace-nowrap">
                      Trần Đan Thanh (1992)
                    </h5>
                    <span className="text-[10px] text-[#73685E] font-medium">
                      Phu Quân • Người chở che &amp; Hậu phương vững chắc
                    </span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#4E433C] italic leading-relaxed">
                  "{activeStage.husbandReflection}"
                </p>
              </div>

              {/* Wife Reflection */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#FAF2F4] to-[#F5E6EB] border border-[#E8C2CA] space-y-3 relative shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#8C1D2F] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                    Y
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-[#231D1B] whitespace-nowrap">
                      Đồng Thị Ngọc Yến (1995)
                    </h5>
                    <span className="text-[10px] text-[#8C1D2F] font-medium">
                      Hiền Thê • Thạc sĩ MBA &amp; Trái tim ấm áp
                    </span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#4E433C] italic leading-relaxed">
                  "{activeStage.wifeReflection}"
                </p>
              </div>
            </div>

            {/* Companion Lesson & Keepsake */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {/* Lesson */}
              <div className="sm:col-span-2 p-4 sm:p-5 rounded-2xl bg-[#F4EFE7] border border-[#DFCFC0] flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#3E6D59] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] uppercase font-bold text-[#3E6D59] tracking-wider block">
                    Nền Tảng Phu Thê
                  </span>
                  <p className="text-xs sm:text-sm text-[#453D37] leading-relaxed mt-0.5">
                    {activeStage.companionLesson}
                  </p>
                </div>
              </div>

              {/* Keepsake box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF0DC] border border-[#D4AF37]/50 flex items-center justify-between gap-3 shadow-2xs group relative">
                <div className="flex items-center gap-3">
                  <div className="text-3xl sm:text-4xl shrink-0">
                    {currentKeepsake.symbol}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] uppercase font-bold text-[#8C1D2F] tracking-wider block">
                        Kỷ Vật Cảm Xúc
                      </span>
                      {customKeepsakes[activeStage.id] && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#8C1D2F]/10 text-[#8C1D2F] font-semibold">
                          Đã cập nhật
                        </span>
                      )}
                    </div>
                    <h6 className="text-xs sm:text-sm font-bold text-[#231D1B] leading-tight">
                      {currentKeepsake.title}
                    </h6>
                    <p className="text-[11px] text-[#70645A] mt-0.5 line-clamp-2">
                      {currentKeepsake.description}
                    </p>
                  </div>
                </div>

                {/* Edit Keepsake Button */}
                <button
                  type="button"
                  onClick={() => {
                    setEditTitle(currentKeepsake.title);
                    setEditDesc(currentKeepsake.description);
                    setEditSymbol(currentKeepsake.symbol);
                    setEditingKeepsake(true);
                  }}
                  className="p-2 rounded-xl bg-white/90 hover:bg-white text-[#8C1D2F] border border-[#D4AF37]/50 shadow-2xs hover:scale-105 transition-all cursor-pointer shrink-0"
                  title="Chỉnh sửa Kỷ Vật Cảm Xúc cho cung bậc này"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Associated Milestones Preview Cards */}
            {associatedMilestones.length > 0 && (
              <div className="pt-4 border-t border-[#E8DFD3] space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#7A6E65] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Khoảnh Khắc Đời Thực Thuộc Cung Bậc Này ({associatedMilestones.length})</span>
                  </h5>
                  <span className="text-[11px] text-[#8C1D2F] font-semibold">
                    Nhấp vào ảnh để xem kỷ niệm
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {associatedMilestones.map((milestone) => {
                    const milestonePhoto =
                      customImages[milestone.id] || milestone.customImage || milestone.defaultImage;
                    return (
                      <div
                        key={milestone.id}
                        onClick={() => onSelectMilestone(milestone)}
                        className="group cursor-pointer bg-[#FAF6F0] rounded-2xl border border-[#E5DAD0] hover:border-[#8C1D2F] p-3 transition-all hover:shadow-md flex items-center gap-3.5 relative"
                      >
                        <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-[#D4AF37]/40 bg-[#EFE9DF]">
                          <img
                            src={milestonePhoto}
                            alt={milestone.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1.5 transition-opacity text-white">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenLightbox(milestonePhoto, milestone.title, milestone.date);
                              }}
                              className="p-1.5 rounded-full bg-black/50 hover:bg-black/70"
                              title="Phóng to ảnh"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            {onOpenPhotoManager && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onOpenPhotoManager(milestone.id);
                                }}
                                className="p-1.5 rounded-full bg-[#8C1D2F] hover:bg-[#701524]"
                                title="Đổi ảnh từ Dòng Thời Gian Tình Yêu"
                              >
                                <Camera className="w-3.5 h-3.5 text-[#FFD700]" />
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-bold text-[#8C1D2F] bg-white px-2 py-0.5 rounded-full border border-[#D4AF37]/30 shadow-2xs">
                              {milestone.date}
                            </span>
                            {customImages[milestone.id] && (
                              <span className="text-[9px] font-semibold text-[#4E775B] bg-[#EAF0EC] px-1.5 py-0.2 rounded-full border border-[#D2E2D6]">
                                Đã cập nhật
                              </span>
                            )}
                          </div>
                          <h6 className="text-[11px] sm:text-xs font-bold text-[#231D1B] line-clamp-2 leading-snug mt-1 group-hover:text-[#8C1D2F] transition-colors">
                            {milestone.title}
                          </h6>
                          <p className="text-[10px] sm:text-[11px] text-[#7A6E65] line-clamp-1 mt-0.5">
                            {milestone.subtitle}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Bottom Navigation Buttons between stages */}
            <div className="pt-6 border-t border-[#E8DFD3] flex items-center justify-between">
              <button
                onClick={handlePrev}
                className="px-4 py-2.5 rounded-full bg-white border border-[#D8C9B8] hover:border-[#8C1D2F] text-xs font-semibold text-[#4A413A] hover:text-[#8C1D2F] flex items-center gap-2 transition-all shadow-2xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Cung bậc trước</span>
              </button>

              <div className="text-center text-xs text-[#8A7D71] font-medium hidden sm:block">
                Cung bậc {activeIndex + 1} / {emotionalStages.length}:{' '}
                <span className="font-bold text-[#231D1B]">{activeStage.name}</span>
              </div>

              <button
                onClick={handleNext}
                className="px-5 py-2.5 rounded-full bg-[#8C1D2F] hover:bg-[#731424] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-sm border border-[#D4AF37]/50"
              >
                <span>Cung bậc kế tiếp</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FFD700]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Keepsake Modal */}
      {editingKeepsake && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg bg-[#FAF8F5] rounded-3xl p-6 shadow-2xl border border-[#E8DFD5] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD5]">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{editSymbol || '☕'}</span>
                <div>
                  <h4 className="text-base font-bold text-[#231D1B]">
                    Chỉnh Sửa Kỷ Vật Cảm Xúc
                  </h4>
                  <span className="text-xs text-[#8C1D2F] font-semibold">
                    Cung bậc: {activeStage.name}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingKeepsake(false)}
                className="p-1.5 rounded-full hover:bg-[#EAE0D4] text-[#70645A] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick preset for Coffee at E-coffee Trung Nguyên Củ Chi if on stage spark */}
            {activeStage.id === 'spark' && (
              <div className="p-3 rounded-2xl bg-[#FAF0DC] border border-[#D4AF37]/50 flex items-center justify-between gap-2">
                <span className="text-xs text-[#70645A]">
                  Khuyên dùng cho lần đầu gặp gỡ:
                </span>
                <button
                  type="button"
                  onClick={handleApplyCoffeePreset}
                  className="px-3 py-1 rounded-xl bg-[#8C1D2F] text-[#FAF4EA] text-xs font-semibold hover:bg-[#701625] transition-colors cursor-pointer"
                >
                  Áp dụng: Ly cà phê E-coffee Củ Chi
                </button>
              </div>
            )}

            <form onSubmit={handleSaveKeepsake} className="space-y-3.5">
              <div className="grid grid-cols-4 gap-2">
                <div className="col-span-1">
                  <label className="block text-[11px] font-bold text-[#70645A] uppercase tracking-wider mb-1">
                    Biểu tượng
                  </label>
                  <input
                    type="text"
                    value={editSymbol}
                    onChange={(e) => setEditSymbol(e.target.value)}
                    maxLength={4}
                    className="w-full px-3 py-2 text-center text-xl rounded-xl bg-white border border-[#DCD1C4] focus:outline-none focus:ring-1 focus:ring-[#8C1D2F]"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-[11px] font-bold text-[#70645A] uppercase tracking-wider mb-1">
                    Tên Kỷ Vật
                  </label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    required
                    placeholder="VD: Ly cà phê gặp gỡ đầu tiên"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-white border border-[#DCD1C4] focus:outline-none focus:ring-1 focus:ring-[#8C1D2F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#70645A] uppercase tracking-wider mb-1">
                  Lời Kể / Kỷ Niệm Gắn Liền
                </label>
                <textarea
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  rows={3}
                  required
                  placeholder="VD: Ly cà phê gặp gỡ đầu tiên lúc này chúng tôi uống tại E-coffee Trung Nguyên Củ Chi..."
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-white border border-[#DCD1C4] focus:outline-none focus:ring-1 focus:ring-[#8C1D2F] resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleResetKeepsake}
                  className="px-3 py-1.5 rounded-xl border border-[#DCD1C4] text-xs text-[#70645A] hover:bg-white flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Khôi phục gốc</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingKeepsake(false)}
                    className="px-4 py-1.5 rounded-xl text-xs text-[#70645A] hover:bg-[#EAE0D4] cursor-pointer"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-[#8C1D2F] text-white text-xs font-semibold hover:bg-[#701625] flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Lưu Kỷ Vật</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
