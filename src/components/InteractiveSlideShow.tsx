import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Calendar, 
  MapPin, 
  Sparkles, 
  Camera, 
  Maximize2, 
  RotateCcw,
  Heart,
  Crown
} from 'lucide-react';
import { TimelineMilestone } from '../types';

interface InteractiveSlideShowProps {
  milestones: TimelineMilestone[];
  customImages: Record<string, string>;
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
  onUpdateCustomImage: (milestoneId: string, dataUrl: string) => void;
  onResetImage: (milestoneId: string) => void;
  onOpenLightbox: (imageUrl: string, title: string, subtitle: string) => void;
  onOpenPhotoManager?: (milestoneId?: string) => void;
}

export const InteractiveSlideShow: React.FC<InteractiveSlideShowProps> = ({
  milestones,
  customImages,
  currentIndex: controlledIndex,
  onIndexChange,
  onUpdateCustomImage,
  onResetImage,
  onOpenLightbox,
  onOpenPhotoManager,
}) => {
  const [internalIndex, setInternalIndex] = useState(0);
  const currentIndex = controlledIndex !== undefined ? controlledIndex : internalIndex;

  const setCurrentIndex = (indexOrFn: number | ((prev: number) => number)) => {
    const newIdx = typeof indexOrFn === 'function' ? indexOrFn(currentIndex) : indexOrFn;
    if (onIndexChange) {
      onIndexChange(newIdx);
    } else {
      setInternalIndex(newIdx);
    }
  };
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentMilestone = milestones[currentIndex];
  const activeImage = customImages[currentMilestone.id] || currentMilestone.defaultImage;
  const isRoyalMilestone =
    currentMilestone.id === 'wedding_nhatbinh' || currentMilestone.id === 'milestone-wedding';

  // Autoplay timer
  const SLIDE_DURATION = 6000; // 6 seconds per slide

  useEffect(() => {
    let interval: number | null = null;
    let progressTimer: number | null = null;

    if (isPlaying) {
      setProgress(0);
      const startTime = Date.now();

      progressTimer = window.setInterval(() => {
        const elapsed = Date.now() - startTime;
        const pct = Math.min(100, (elapsed / SLIDE_DURATION) * 100);
        setProgress(pct);
      }, 50);

      interval = window.setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % milestones.length);
        setProgress(0);
      }, SLIDE_DURATION);
    } else {
      setProgress(0);
    }

    return () => {
      if (interval) clearTimeout(interval);
      if (progressTimer) clearInterval(progressTimer);
    };
  }, [isPlaying, currentIndex, milestones.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % milestones.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + milestones.length) % milestones.length);
    setProgress(0);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          onUpdateCustomImage(currentMilestone.id, result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="interactive-slideshow" className="relative py-12 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Hidden file input for custom photo upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#8C1D2F] bg-[#FAF0DC] px-3.5 py-1 rounded-full border border-[#D4AF37]/50 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Trình Chiếu Kỷ Niệm • Họa Cảnh Kim Duyên</span>
          </span>
          <h2 className="mt-2 text-2xl sm:text-4xl font-serif-cormorant font-bold text-[#231D1B]">
            Dòng Thời Gian Tình Yêu Của Chúng Mình
          </h2>
        </div>

        {/* Play / Pause Autoplay and Nav Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-xs ${
              isPlaying
                ? 'bg-[#8C1D2F] text-white'
                : 'bg-white text-[#4A4037] border border-[#E5DAD0] hover:bg-[#FAF4EC]'
            }`}
            title={isPlaying ? 'Tạm dừng tự động phát' : 'Tự động phát trình chiếu'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" /> Tạm dừng
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" /> Tự động chiếu
              </>
            )}
          </button>

          <button
            onClick={handlePrev}
            className="w-9 h-9 rounded-full bg-white border border-[#E5DAD0] text-[#4A4037] hover:bg-[#FAF4EC] hover:text-[#8C1D2F] flex items-center justify-center transition-colors shadow-2xs"
            title="Cột mốc trước"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleNext}
            className="w-9 h-9 rounded-full bg-white border border-[#E5DAD0] text-[#4A4037] hover:bg-[#FAF4EC] hover:text-[#8C1D2F] flex items-center justify-center transition-colors shadow-2xs"
            title="Cột mốc tiếp theo"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Line for Autoplay */}
      {isPlaying && (
        <div className="w-full h-1 bg-[#E8DFD3] rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-[#D4AF37] to-[#8C1D2F] transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Milestone Navigation Tabs / Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none no-scrollbar">
        {milestones.map((milestone, idx) => {
          const isActive = idx === currentIndex;
          const isWedding =
            milestone.id === 'wedding_nhatbinh' || milestone.id === 'milestone-wedding';
          return (
            <button
              key={milestone.id}
              onClick={() => {
                setCurrentIndex(idx);
                setProgress(0);
              }}
              className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all text-left flex items-center gap-2 border ${
                isActive
                  ? isWedding
                    ? 'bg-[#8C1D2F] text-white border-[#D4AF37] shadow-md'
                    : 'bg-white text-[#8C1D2F] border-[#D4AF37] shadow-sm'
                  : isWedding
                  ? 'bg-[#FAF0DC] text-[#8C1D2F] border-[#D4AF37]/50 hover:bg-[#F5E6CC]'
                  : 'bg-white/70 text-[#73685E] border-transparent hover:bg-white hover:text-[#231D1B]'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isActive
                    ? isWedding
                      ? 'bg-[#FAF2DC] text-[#8C1D2F]'
                      : 'bg-[#8C1D2F] text-white'
                    : isWedding
                    ? 'bg-[#D4AF37] text-white'
                    : 'bg-[#EAE1D5] text-[#6B6157]'
                }`}
              >
                {isWedding ? '👑' : String(idx + 1).padStart(2, '0')}
              </span>
              <span className="truncate max-w-[140px] sm:max-w-none">{milestone.tag}</span>
            </button>
          );
        })}
      </div>

      {/* Main Slide Card with Smooth Motion Transition & Royal Border */}
      <div className={`relative bg-white/95 backdrop-blur-md rounded-3xl overflow-hidden transition-all shadow-xl ${
        isRoyalMilestone
          ? 'border-2 border-[#D4AF37] shadow-[#8C1D2F]/15'
          : 'border border-[#E5DAD0] shadow-black/5'
      }`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMilestone.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]"
          >
            {/* Visual Image Section (7 Cols on desktop) */}
            <div className="lg:col-span-7 relative overflow-hidden bg-[#1E1917] min-h-[300px] sm:min-h-[420px] lg:min-h-full group">
              {/* Subtle Ken Burns Zoom Animation */}
              <motion.img
                key={activeImage}
                src={activeImage}
                alt={currentMilestone.title}
                referrerPolicy="no-referrer"
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 8, ease: 'easeOut' }}
                className="w-full h-full object-cover object-center absolute inset-0 opacity-95"
              />

              {/* Gentle gradient vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25" />

              {/* Photo Action Buttons */}
              <div className="absolute top-4 right-4 flex items-center gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
                {customImages[currentMilestone.id] && (
                  <button
                    onClick={() => onResetImage(currentMilestone.id)}
                    className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 transition-colors"
                    title="Khôi phục ảnh mẫu ban đầu"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
                {onOpenPhotoManager ? (
                  <button
                    onClick={() => onOpenPhotoManager(currentMilestone.id)}
                    className="px-3 py-1.5 rounded-full bg-[#852233]/85 hover:bg-[#852233] text-white backdrop-blur-md border border-[#D4AF37]/40 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
                    title="Mở công cụ đổi & sửa ảnh cho mốc này"
                  >
                    <Camera className="w-3.5 h-3.5 text-[#FFD700]" />
                    <span>Đổi/Chỉnh ảnh</span>
                  </button>
                ) : (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 text-xs font-medium flex items-center gap-1.5 transition-colors"
                    title="Tải ảnh riêng của 2 bạn thay cho ảnh này"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Thay ảnh thật</span>
                  </button>
                )}
                <button
                  onClick={() =>
                    onOpenLightbox(activeImage, currentMilestone.title, currentMilestone.date)
                  }
                  className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 transition-colors"
                  title="Phóng to ảnh"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Image bottom badge info */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/90 text-xs">
                <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
                  <MapPin className="w-3.5 h-3.5 text-[#FFD700]" />
                  <span>{currentMilestone.location}</span>
                </div>
                <div className="bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 font-semibold text-[#FAF2DC]">
                  {currentIndex + 1} / {milestones.length}
                </div>
              </div>
            </div>

            {/* Narrative & Milestone Information (5 Cols on desktop) */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-[#FFFDF9] to-[#FAF5EE]">
              <div>
                {/* Milestone Badge and Date */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md flex items-center gap-1 ${
                    isRoyalMilestone
                      ? 'bg-[#8C1D2F] text-[#FFD700] border border-[#D4AF37]'
                      : 'bg-[#FAF0DC] text-[#8C1D2F] border border-[#D4AF37]/40'
                  }`}>
                    {isRoyalMilestone && <Crown className="w-3 h-3 text-[#FFD700]" />}
                    <span>{currentMilestone.tag}</span>
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#6B6157]">
                    <Calendar className="w-3.5 h-3.5 text-[#8C1D2F]" />
                    <span className="font-semibold">{currentMilestone.date}</span>
                  </div>
                </div>

                {/* Title - Reduced by 1 step */}
                <h3 className="text-xl sm:text-2xl font-serif-cormorant font-bold text-[#231D1B] leading-snug">
                  {currentMilestone.title}
                </h3>
                <p className="text-xs text-[#8A7D71] mt-1 italic font-medium">
                  {currentMilestone.subtitle}
                </p>

                {/* Poetic Parchment Quote Box */}
                <div className="my-5 p-4 rounded-2xl bg-[#FAF0DC]/50 border-l-3 border-[#D4AF37] text-xs sm:text-sm text-[#4E443B] italic leading-relaxed">
                  "{currentMilestone.quote}"
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#544A42] leading-relaxed">
                  {currentMilestone.description}
                </p>

                {/* Highlights Checklist */}
                <div className="mt-5 space-y-2">
                  <h4 className="text-[11px] uppercase tracking-wider font-bold text-[#A06B28] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                    <span>Khoảnh khắc vàng son:</span>
                  </h4>
                  {currentMilestone.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#3E3630]">
                      <Heart className="w-3 h-3 text-[#8C1D2F] shrink-0 fill-[#8C1D2F]/20" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Romantic footer note with gold dots */}
              <div className="mt-6 pt-4 border-t border-[#E8DFD3] flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs text-[#8A7D71] font-medium italic whitespace-nowrap">
                  Trần Đan Thanh (1992) &amp; Đồng Thị Ngọc Yến (1995)
                </span>
                <div className="flex items-center gap-1 flex-wrap justify-end max-w-[200px]">
                  {milestones.map((_, dotIdx) => (
                    <span
                      key={dotIdx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        dotIdx === currentIndex
                          ? 'w-5 bg-[#8C1D2F]'
                          : 'w-1.5 bg-[#DED3C5]'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
