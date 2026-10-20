import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  Calendar, 
  Heart, 
  Crown, 
  GraduationCap, 
  ShoppingBag, 
  Compass, 
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Maximize2,
  Camera
} from 'lucide-react';
import { TimelineMilestone } from '../types';

interface JourneyTimelineChartProps {
  milestones: TimelineMilestone[];
  onSelectMilestone: (index: number) => void;
  onOpenLightbox: (imageUrl: string, title: string, subtitle: string) => void;
  customImages?: Record<string, string>;
  onOpenPhotoManager?: (milestoneId?: string) => void;
}

type ViewMode = 'curve' | 'years' | 'pillars';

export const JourneyTimelineChart: React.FC<JourneyTimelineChartProps> = ({
  milestones,
  onSelectMilestone,
  onOpenLightbox,
  customImages = {},
  onOpenPhotoManager,
}) => {
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>('wedding_nhatbinh');
  const [selectedYearFilter, setSelectedYearFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('curve');

  // Parse years and group milestones
  const milestoneData = useMemo(() => {
    return milestones.map((m, idx) => {
      const year = m.rawDate.split('-')[0];
      const month = m.rawDate.split('-')[1];
      return {
        ...m,
        year,
        month,
        index: idx,
      };
    });
  }, [milestones]);

  const activeMilestone = useMemo(() => {
    return milestoneData.find((m) => m.id === selectedMilestoneId) || milestoneData[8]; // default to wedding
  }, [milestoneData, selectedMilestoneId]);

  // Grouped by years
  const yearlyGroups = useMemo(() => {
    const groups: Record<string, typeof milestoneData> = {};
    milestoneData.forEach((m) => {
      if (!groups[m.year]) groups[m.year] = [];
      groups[m.year].push(m);
    });
    return groups;
  }, [milestoneData]);

  // Filtered by year
  const filteredMilestones = useMemo(() => {
    if (selectedYearFilter === 'all') return milestoneData;
    return milestoneData.filter((m) => m.year === selectedYearFilter);
  }, [milestoneData, selectedYearFilter]);

  // Pillar Stats
  const pillars = [
    {
      title: 'Hôn Nhân & Tình Yêu',
      count: 4,
      desc: 'Từ ngày đầu gặp gỡ, đính hôn đến Đám cưới Cổ phục Nhật Bình & du thuyền kỷ niệm',
      icon: Crown,
      color: '#8C1D2F',
      bg: '#FDF0F3',
    },
    {
      title: 'Khám Phá & Du Lịch',
      count: 5,
      desc: 'Hà Giang, Vũng Tàu (2 lần), Nam Du, Đà Lạt & trải nghiệm Metro Sài Gòn',
      icon: Compass,
      color: '#3B6E8C',
      bg: '#EEF6FA',
    },
    {
      title: 'Sự Nghiệp SOUL STYLE',
      count: 1,
      desc: 'Tự tay lên ý tưởng, chuẩn bị 100% và khai trương cửa hàng thời trang chung',
      icon: ShoppingBag,
      color: '#A06B28',
      bg: '#FAF4EB',
    },
    {
      title: 'Tri Thức & Học Vấn',
      count: 2,
      desc: 'Cùng tốt nghiệp VB2 Ngôn ngữ Anh ĐH Cần Thơ & Ngọc Yến vinh quy Thạc sĩ MBA',
      icon: GraduationCap,
      color: '#4E775B',
      bg: '#F0F6F2',
    },
  ];

  return (
    <section id="journey-timeline-chart-section" className="relative py-16 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Title & Introduction */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs uppercase tracking-wider font-semibold bg-[#F7EFE4] text-[#8C3A4D] border border-[#EADBCC] mb-3">
          <TrendingUp className="w-3.5 h-3.5 text-[#8C3A4D]" />
          <span>Biểu Đồ Hành Trình Đồng Hành</span>
        </div>
        <h2 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#2E2A27] tracking-tight">
          Hơn 1.260 Ngày Kề Vai Sát Cánh
        </h2>
        <p className="mt-2.5 text-xs sm:text-sm text-[#73685E] leading-relaxed">
          Biểu đồ ghi dấu chặng đường phát triển tình yêu, hôn nhân hoàng triều, sự nghiệp SOUL STYLE và những dấu ấn tri thức rực rỡ mà <span className="whitespace-nowrap font-medium text-[#2E2A27]">Đan Thanh &amp; Ngọc Yến</span> đã cùng nhau kiến tạo.
        </p>
      </div>

      {/* Summary Stat Badges Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
        <div className="p-3.5 rounded-2xl bg-white/90 border border-[#E8DFD5] text-center shadow-xs">
          <span className="block text-2xl sm:text-3xl font-serif-cormorant font-bold text-[#8C1D2F]">
            1.260+
          </span>
          <span className="block text-[11px] text-[#7A7168] mt-0.5">Ngày Đồng Hành</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-white/90 border border-[#E8DFD5] text-center shadow-xs">
          <span className="block text-2xl sm:text-3xl font-serif-cormorant font-bold text-[#2E2A27]">
            14
          </span>
          <span className="block text-[11px] text-[#7A7168] mt-0.5">Cột Mốc Tự Tay 100%</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-white/90 border border-[#E8DFD5] text-center shadow-xs">
          <span className="block text-2xl sm:text-3xl font-serif-cormorant font-bold text-[#A06B28]">
            05
          </span>
          <span className="block text-[11px] text-[#7A7168] mt-0.5">Chuyến Đi Đáng Nhớ</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-white/90 border border-[#E8DFD5] text-center shadow-xs">
          <span className="block text-2xl sm:text-3xl font-serif-cormorant font-bold text-[#4E775B]">
            03
          </span>
          <span className="block text-[11px] text-[#7A7168] mt-0.5">Học Vị Vinh Quy</span>
        </div>
      </div>

      {/* View Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white/70 backdrop-blur-sm p-2 rounded-2xl border border-[#E8DFD5]">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setViewMode('curve')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              viewMode === 'curve'
                ? 'bg-[#8C3A4D] text-white shadow-xs'
                : 'text-[#73685E] hover:text-[#2E2A27]'
            }`}
          >
            Tuyến Trình Đồ Thị (2022 - 2026)
          </button>
          <button
            onClick={() => setViewMode('years')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              viewMode === 'years'
                ? 'bg-[#8C3A4D] text-white shadow-xs'
                : 'text-[#73685E] hover:text-[#2E2A27]'
            }`}
          >
            Theo Từng Năm
          </button>
          <button
            onClick={() => setViewMode('pillars')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              viewMode === 'pillars'
                ? 'bg-[#8C3A4D] text-white shadow-xs'
                : 'text-[#73685E] hover:text-[#2E2A27]'
            }`}
          >
            Trụ Cột Đồng Hành
          </button>
        </div>

        {/* Year Filter when in curve / years */}
        {viewMode !== 'pillars' && (
          <div className="flex items-center gap-1 text-xs">
            {['all', '2022', '2023', '2024', '2025', '2026'].map((yr) => (
              <button
                key={yr}
                onClick={() => setSelectedYearFilter(yr)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  selectedYearFilter === yr
                    ? 'bg-[#2E2A27] text-white font-bold'
                    : 'text-[#73685E] hover:bg-[#EFE7DE]'
                }`}
              >
                {yr === 'all' ? 'Tất cả' : yr}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* VIEW MODE 1: Interactive Curve / Ribbon Chart */}
      {viewMode === 'curve' && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#EADBCC] shadow-md space-y-6">
          {/* Header of Chart */}
          <div className="flex items-center justify-between border-b border-[#F4EFEA] pb-4">
            <div>
              <span className="text-xs font-bold text-[#8C3A4D] uppercase tracking-wider">
                Đồ Thị Tiến Trình Cột Mốc Đồng Hành
              </span>
              <p className="text-xs text-[#7A7168] mt-0.5">
                Nhấp vào từng điểm mốc trên đồ thị để xem chi tiết ảnh và ý nghĩa
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#FAF2EB] text-[#8C3A4D] font-medium border border-[#E8DFD5]">
              {filteredMilestones.length} Cột mốc hiển thị
            </span>
          </div>

          {/* Interactive Visual Graph Ribbon */}
          <div className="relative pt-6 pb-4 overflow-x-auto">
            <div className="min-w-[700px] px-4">
              {/* Timeline Axis Line */}
              <div className="relative h-24 flex items-center justify-between">
                {/* SVG Curve Line */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4E775B" />
                      <stop offset="25%" stopColor="#A06B28" />
                      <stop offset="55%" stopColor="#8C1D2F" />
                      <stop offset="80%" stopColor="#3B6E8C" />
                      <stop offset="100%" stopColor="#8C3A4D" />
                    </linearGradient>
                  </defs>
                  {/* Subtle decorative wave */}
                  <path
                    d="M 20 60 Q 180 20, 350 50 T 680 40"
                    fill="none"
                    stroke="url(#curveGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="opacity-70"
                  />
                </svg>

                {/* Nodes on the Timeline Graph */}
                {filteredMilestones.map((m, idx) => {
                  const isSelected = selectedMilestoneId === m.id;
                  const isWedding = m.id === 'wedding_nhatbinh';
                  const isSoulStyle = m.id === 'soul_style';
                  const isMba = m.id === 'mba_grad';

                  return (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMilestoneId(m.id)}
                      className="group relative z-10 flex flex-col items-center focus:outline-none transition-transform"
                    >
                      {/* Node Icon / Marker */}
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                          isSelected
                            ? 'scale-125 ring-4 ring-[#8C1D2F]/20 shadow-lg ' +
                              (isWedding
                                ? 'bg-[#8C1D2F] text-[#FFD700] border-[#FFD700]'
                                : 'bg-[#8C3A4D] text-white border-[#8C3A4D]')
                            : isWedding
                            ? 'bg-[#FFF2F4] text-[#8C1D2F] border-[#8C1D2F] hover:scale-110'
                            : isSoulStyle
                            ? 'bg-[#FAF4EB] text-[#A06B28] border-[#A06B28] hover:scale-110'
                            : isMba
                            ? 'bg-[#F0F6F2] text-[#4E775B] border-[#4E775B] hover:scale-110'
                            : 'bg-white text-[#6B6158] border-[#D6CBC1] hover:border-[#8C3A4D] hover:scale-110'
                        }`}
                        title={m.title}
                      >
                        {isWedding ? (
                          <Crown className="w-4 h-4 text-[#D4AF37]" />
                        ) : isSoulStyle ? (
                          <ShoppingBag className="w-4 h-4" />
                        ) : isMba ? (
                          <GraduationCap className="w-4 h-4" />
                        ) : (
                          <span className="text-[11px] font-bold">{idx + 1}</span>
                        )}
                      </div>

                      {/* Date label underneath */}
                      <div className="mt-2 text-center">
                        <span
                          className={`block text-[10px] font-bold ${
                            isSelected ? 'text-[#8C1D2F]' : 'text-[#7A7168]'
                          }`}
                        >
                          {m.date.split(',')[0]}
                        </span>
                        <span className="block text-[9px] text-[#A3998F]">{m.year}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Milestone Card Focus Preview */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMilestone.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#EADBCC] flex flex-col md:flex-row items-center gap-5"
            >
              {/* Thumbnail with Lightbox trigger */}
              <div className="relative w-full md:w-56 aspect-[4/3] rounded-xl overflow-hidden shadow-sm shrink-0 group bg-[#EADFCF]">
                {(() => {
                  const activeImg =
                    customImages[activeMilestone.id] ||
                    activeMilestone.customImage ||
                    activeMilestone.defaultImage;
                  return (
                    <>
                      <img
                        src={activeImg}
                        alt={activeMilestone.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 right-2 flex items-center gap-1.5">
                        {onOpenPhotoManager && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenPhotoManager(activeMilestone.id);
                            }}
                            className="px-2 py-1 rounded-full bg-black/60 hover:bg-[#8C1D2F] text-white text-[10px] font-semibold flex items-center gap-1 backdrop-blur-md transition-colors shadow-xs"
                            title="Cập nhật ảnh mốc này từ Dòng Thời Gian Tình Yêu"
                          >
                            <Camera className="w-3 h-3 text-[#FFD700]" />
                            <span>Đổi ảnh</span>
                          </button>
                        )}
                        <button
                          onClick={() =>
                            onOpenLightbox(
                              activeImg,
                              activeMilestone.title,
                              `${activeMilestone.date} — ${activeMilestone.location}`
                            )
                          }
                          className="p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                          title="Phóng to ảnh"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </>
                  );
                })()}
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium">
                  {activeMilestone.tag}
                </div>
              </div>

              {/* Information Column */}
              <div className="flex-1 text-left space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#8C1D2F]/10 text-[#8C1D2F] font-bold text-xs border border-[#8C1D2F]/20">
                    Cột mốc #{activeMilestone.order} • Năm {activeMilestone.year}
                  </span>
                  <span className="text-xs text-[#7A7168] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#8C1D2F]" />
                    {activeMilestone.date}
                  </span>
                </div>

                <h3 className="font-serif-cormorant text-xl sm:text-2xl font-bold text-[#2E2A27]">
                  {activeMilestone.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#63574D] line-clamp-2">
                  {activeMilestone.description}
                </p>

                <p className="text-xs italic text-[#8C3A4D] font-serif-playfair">
                  "{activeMilestone.quote}"
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => {
                      onSelectMilestone(activeMilestone.index);
                      const el = document.getElementById('interactive-slideshow');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-4 py-1.5 rounded-xl bg-[#8C3A4D] text-white text-xs font-semibold hover:bg-[#732F3F] transition-all flex items-center gap-1 shadow-xs"
                  >
                    <span>Xem Trong Trình Chiếu</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      onSelectMilestone(activeMilestone.index);
                      const el = document.getElementById('timeline-roadmap-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-white border border-[#D6CBC1] text-[#544B42] text-xs font-medium hover:bg-[#F2ECE4] transition-all"
                  >
                    Xem Trong Lộ Trình
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* VIEW MODE 2: Breakdown by Years */}
      {viewMode === 'years' && (
        <div className="space-y-6">
          {Object.entries(yearlyGroups)
            .filter(([yr]) => selectedYearFilter === 'all' || selectedYearFilter === yr)
            .map(([yr, items]) => (
              <div key={yr} className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EADBCC] shadow-xs">
                {/* Year Header */}
                <div className="flex items-center justify-between border-b border-[#F4EFEA] pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-serif-cormorant text-2xl font-bold text-[#8C1D2F]">
                      Năm {yr}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FCE8ED] text-[#8C3A4D] font-semibold">
                      {items.length} Cột mốc
                    </span>
                  </div>
                  <span className="text-xs text-[#7A7168]">
                    {yr === '2022'
                      ? 'Nơi tình yêu bắt đầu & chuyến đi Hà Giang'
                      : yr === '2023'
                      ? 'Lễ Đính Hôn & Khai trương SOUL STYLE'
                      : yr === '2024'
                      ? 'Hôn lễ Cổ phục Nhật Bình hoàng triều'
                      : yr === '2025'
                      ? 'Tốt nghiệp Ngôn ngữ Anh & Thạc sĩ MBA'
                      : 'Trải nghiệm Metro Sài Gòn & Tương lai'}
                  </span>
                </div>

                {/* Milestone Grid for Year */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {items.map((item) => {
                    const itemImg =
                      customImages[item.id] || item.customImage || item.defaultImage;
                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          onSelectMilestone(item.index);
                          const el = document.getElementById('interactive-slideshow');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="group p-3 rounded-2xl bg-[#FAF6F0] hover:bg-[#F6EEE4] border border-[#EADFCF] transition-all cursor-pointer flex flex-col"
                      >
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-2.5 bg-[#EAE2D7]">
                          <img
                            src={itemImg}
                            alt={item.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold">
                            {item.date.split(',')[0]}
                          </div>
                        </div>
                        <span className="text-xs font-bold text-[#2E2A27] line-clamp-1 group-hover:text-[#8C1D2F] transition-colors">
                          {item.title}
                        </span>
                        <span className="text-[11px] text-[#7A7168] mt-1 line-clamp-2">
                          {item.subtitle}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
        </div>
      )}

      {/* VIEW MODE 3: Pillars of Companionship */}
      {viewMode === 'pillars' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-white rounded-3xl p-6 border border-[#EADBCC] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: pillar.bg, color: pillar.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className="text-2xl font-serif-cormorant font-bold"
                      style={{ color: pillar.color }}
                    >
                      {pillar.count} Cột mốc
                    </span>
                  </div>

                  <h3 className="font-serif-cormorant text-xl font-bold text-[#2E2A27] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#63574D] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#F2ECE4] flex items-center justify-between text-xs font-semibold text-[#8C3A4D]">
                  <span>100% Hai đứa tự tay đồng hành</span>
                  <CheckCircle2 className="w-4 h-4 text-[#4E775B]" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
