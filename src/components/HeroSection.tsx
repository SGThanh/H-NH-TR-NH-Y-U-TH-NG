import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  Sparkles, 
  ArrowDown, 
  Calendar, 
  ZoomIn, 
  Crown, 
  ScrollText,
  Camera
} from 'lucide-react';
import royalNhatBinhImg from '@/src/assets/images/nhat_binh_royal_ceremony_1789747892237.jpg';
import soulStyleImg from '@/src/assets/images/soul_style_shop_1789746645444.jpg';
import firstMeetImg from '@/src/assets/images/first_meet_pastel_1789745228911.jpg';
import { TimelineMilestone } from '../types';

interface HeroSectionProps {
  onStartJourney: () => void;
  onOpenSurprise: () => void;
  onOpenLightbox?: (imageUrl: string, title: string, subtitle: string) => void;
  onSelectMilestone?: (index: number) => void;
  onScrollToRoyal?: () => void;
  onScrollToChart?: () => void;
  onScrollToEmotion?: () => void;
  milestones?: TimelineMilestone[];
  customImages?: Record<string, string>;
  onOpenPhotoManager?: (milestoneId?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartJourney,
  onOpenSurprise,
  onOpenLightbox,
  onSelectMilestone,
  milestones,
  customImages = {},
  onOpenPhotoManager,
}) => {
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);

  // Sync previews dynamically with milestones from "Dòng Thời Gian Tình Yêu"
  const weddingMilestone = milestones?.find((m) => m.id === 'wedding_nhatbinh') || milestones?.[8];
  const soulStyleMilestone = milestones?.find((m) => m.id === 'soul_style') || milestones?.[5];
  const meetMilestone = milestones?.find((m) => m.id === 'meet') || milestones?.[0];

  const dynamicShowcases = [
    {
      id: 'nhatbinh',
      title: weddingMilestone?.title || 'Lễ Thành Hôn Cổ Phục Hoàng Triều Áo Nhật Bình',
      shortTitle: 'Hôn Lễ Áo Nhật Bình',
      subtitle: weddingMilestone
        ? `${weddingMilestone.date} • Tự tay chuẩn bị 100% nghi thức trang trọng triều Nguyễn`
        : '18/05/2024 • Tự tay chuẩn bị 100% nghi thức trang trọng triều Nguyễn',
      image:
        (weddingMilestone && customImages[weddingMilestone.id]) ||
        weddingMilestone?.defaultImage ||
        royalNhatBinhImg,
      badge: 'Đám Cưới Hoàng Kim',
      milestoneId: weddingMilestone?.id || 'wedding_nhatbinh',
      milestoneIndex: 8,
    },
    {
      id: 'soulstyle',
      title: soulStyleMilestone?.title || 'Khai Trương SOUL STYLE',
      shortTitle: 'Khai Trương SOUL STYLE',
      subtitle: soulStyleMilestone
        ? `${soulStyleMilestone.date} • Cùng nhau thức trắng dựng xây thương hiệu đầu tiên`
        : '24/11/2023 • Cùng nhau thức trắng dựng xây thương hiệu đầu tiên',
      image:
        (soulStyleMilestone && customImages[soulStyleMilestone.id]) ||
        soulStyleMilestone?.defaultImage ||
        soulStyleImg,
      badge: 'Đồng Cam Cộng Khổ',
      milestoneId: soulStyleMilestone?.id || 'soul_style',
      milestoneIndex: 5,
    },
    {
      id: 'firstmeet',
      title: meetMilestone?.title || 'Khoảnh Khắc Duyên Khởi Tương Phùng',
      shortTitle: 'Cà Phê Gặp Gỡ Củ Chi',
      subtitle: meetMilestone
        ? `${meetMilestone.date} • Ly cà phê gặp gỡ tại E-coffee Trung Nguyên Củ Chi bắt đầu hành trình yêu`
        : '30/09/2022 • Ly cà phê gặp gỡ tại E-coffee Trung Nguyên Củ Chi bắt đầu hành trình yêu',
      image:
        (meetMilestone && customImages[meetMilestone.id]) ||
        meetMilestone?.defaultImage ||
        firstMeetImg,
      badge: 'Cà Phê Gặp Gỡ',
      milestoneId: meetMilestone?.id || 'meet',
      milestoneIndex: 0,
    },
  ];

  const currentPreview = dynamicShowcases[activePreviewIndex] || dynamicShowcases[0];

  return (
    <section className="relative pt-8 pb-14 sm:pt-14 sm:pb-20 px-4 sm:px-6 max-w-5xl mx-auto text-center">
      {/* Subtle ambient silk glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-[#FAF0E1]/50 via-transparent to-transparent pointer-events-none -z-10 blur-2xl" />

      {/* Elegant Header Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-[#852233] bg-[#852233]/8 border border-[#852233]/15 mb-5 shadow-2xs"
      >
        <Crown className="w-3.5 h-3.5 text-[#C5A869]" />
        <span>Song Hỷ Lâm Môn • Kỷ Niệm Tình Duyên</span>
      </motion.div>

      {/* Majestic Couple Title - Sized 1 step smaller and whitespace-nowrap to prevent 'Yến' wrapping */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif-cormorant font-bold text-[#241E1C] tracking-tight leading-tight flex items-center justify-center gap-x-2 sm:gap-x-3 text-center">
          <span className="inline-block whitespace-nowrap">Trần Đan Thanh</span>
          <span className="text-[#852233] font-script text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal align-middle select-none mx-0.5">
            &amp;
          </span>
          <span className="inline-block whitespace-nowrap">Đồng Thị Ngọc Yến</span>
        </h1>

        <p className="mt-2.5 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#91672C] font-serif-cormorant font-medium">
          — Tương Kính Như Tân • Đồng Tâm Vĩnh Kết —
        </p>
      </motion.div>

      {/* Poetic story introduction */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-4 text-xs sm:text-sm text-[#5E5248] max-w-2xl mx-auto leading-relaxed font-normal"
      >
        Từ ngày đầu duyên ngộ <strong className="text-[#241E1C]">30/09/2022</strong>, những đêm thức muộn dựng xây shop thời trang <strong className="text-[#241E1C]">SOUL STYLE</strong>, lễ đính hôn trọn vẹn, cho đến ngày chung đôi kiêu hãnh trong tà áo <strong className="text-[#852233]">Cổ Phục Hoàng Triều Áo Nhật Bình</strong> — 100% tự tay hai vợ chồng vun đắp và chuẩn bị.
      </motion.p>

      {/* Featured Masterpiece Exhibition Showcase (Synced from Dòng Thời Gian Tình Yêu) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-8 mb-6 max-w-3xl mx-auto"
      >
        <div className="editorial-card-accent rounded-3xl p-3.5 sm:p-5 overflow-hidden">
          {/* Main Visual Frame with Smooth Click to Enlarge */}
          <div 
            onClick={() => {
              if (onOpenLightbox) {
                onOpenLightbox(currentPreview.image, currentPreview.title, currentPreview.subtitle);
              }
            }}
            className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-[#241E1C] cursor-pointer group shadow-md"
          >
            <img
              src={currentPreview.image}
              alt={currentPreview.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
            />
            
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent flex flex-col justify-between p-3.5 sm:p-5 text-left">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#852233] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-xs">
                  {currentPreview.badge}
                </span>

                <div className="flex items-center gap-1.5">
                  {onOpenPhotoManager && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenPhotoManager(currentPreview.milestoneId);
                      }}
                      className="px-2.5 py-1 rounded-full bg-black/60 hover:bg-[#852233] text-white text-[10px] font-semibold flex items-center gap-1 backdrop-blur-md transition-colors shadow-xs"
                      title="Cập nhật ảnh mốc này từ Dòng Thời Gian Tình Yêu"
                    >
                      <Camera className="w-3 h-3" />
                      <span className="hidden sm:inline">Đổi ảnh Dòng Thời Gian</span>
                    </button>
                  )}
                  <div className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              <div className="text-white space-y-0.5">
                <h3 className="font-serif-cormorant text-lg sm:text-xl md:text-2xl font-bold tracking-tight drop-shadow-sm">
                  {currentPreview.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-white/90 font-light drop-shadow-xs line-clamp-1">
                  {currentPreview.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive 3-Tab Selector Bar with refined font sizing */}
          <div className="grid grid-cols-3 gap-2 mt-3.5 pt-3 border-t border-[#ECE3D7]">
            {dynamicShowcases.map((item, idx) => {
              const isActive = idx === activePreviewIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePreviewIndex(idx);
                    if (onSelectMilestone) {
                      onSelectMilestone(item.milestoneIndex);
                    }
                  }}
                  className={`py-2 px-2 sm:px-3 rounded-xl text-left transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#852233] text-white shadow-xs'
                      : 'bg-[#FAF8F5] hover:bg-[#F2EAE0] text-[#554C46]'
                  }`}
                >
                  <span className={`block text-[8px] sm:text-[9.5px] uppercase font-bold tracking-wider truncate ${
                    isActive ? 'text-[#FAF4EA]/90' : 'text-[#8C6228]'
                  }`}>
                    0{idx + 1} • {item.badge}
                  </span>
                  <span className={`block text-[10px] sm:text-xs font-semibold leading-tight truncate mt-0.5 ${
                    isActive ? 'text-white' : 'text-[#241E1C]'
                  }`}>
                    {item.shortTitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Refined Dates Ribbon with compact font */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs text-[#6B5F54] font-medium py-1"
      >
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-[#852233]" />
          <span>Hẹn hò: <strong className="text-[#241E1C]">30/09/2022</strong></span>
        </div>
        <span className="text-[#D8C7B5] hidden sm:inline">•</span>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-[#91672C]" />
          <span>Đính hôn: <strong className="text-[#241E1C]">30/05/2023</strong></span>
        </div>
        <span className="text-[#D8C7B5] hidden sm:inline">•</span>
        <div className="flex items-center gap-1.5 text-[#852233]">
          <Crown className="w-3.5 h-3.5 text-[#C5A869]" />
          <span>Hôn lễ Áo Nhật Bình: <strong className="text-[#852233]">18/05/2024</strong></span>
        </div>
      </motion.div>

      {/* Two Decisive, Beautiful CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-6 flex flex-wrap items-center justify-center gap-3"
      >
        <button
          id="hero-start-journey-btn"
          onClick={onStartJourney}
          className="px-5 py-2.5 rounded-full bg-[#852233] hover:bg-[#701A29] text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md shadow-[#852233]/20 transition-all hover:scale-102 flex items-center gap-2 cursor-pointer"
        >
          <span>Khám Phá Hành Trình Tình Yêu</span>
          <ArrowDown className="w-4 h-4" />
        </button>

        <button
          id="hero-open-surprise-btn"
          onClick={onOpenSurprise}
          className="px-5 py-2.5 rounded-full bg-white hover:bg-[#FAF6F0] text-[#852233] border border-[#E2D2C2] text-xs sm:text-sm font-semibold tracking-wide shadow-xs transition-all hover:scale-102 flex items-center gap-2 cursor-pointer"
        >
          <ScrollText className="w-4 h-4 text-[#C5A869]" />
          <span>Bức Thư Tình Cho Yến</span>
        </button>
      </motion.div>
    </section>
  );
};
