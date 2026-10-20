import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Calendar, 
  Heart, 
  MapPin, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Gift,
  ArrowRight,
  Camera,
  Filter,
  Crown
} from 'lucide-react';
import { TimelineMilestone } from '../types';

interface TimelineRoadmapProps {
  milestones: TimelineMilestone[];
  customImages: Record<string, string>;
  onSelectMilestone: (index: number) => void;
  onOpenSurprise: () => void;
  onOpenLightbox: (imageUrl: string, title: string, subtitle: string) => void;
  onUpdateCustomImage?: (milestoneId: string, dataUrl: string) => void;
  onOpenPhotoManager?: (milestoneId?: string) => void;
}

type CategoryFilter = 'all' | 'wedding' | 'business' | 'travel' | 'family' | 'education';

export const TimelineRoadmap: React.FC<TimelineRoadmapProps> = ({
  milestones,
  customImages,
  onSelectMilestone,
  onOpenSurprise,
  onOpenLightbox,
  onUpdateCustomImage,
  onOpenPhotoManager,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [likes, setLikes] = useState<Record<string, number>>({});
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const [activeUploadId, setActiveUploadId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));

    // Soft heart confetti
    confetti({
      particleCount: 20,
      spread: 40,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      },
      colors: ['#FCE7EB', '#8C3A4D', '#F4D2D7'],
    });
  };

  const triggerUpload = (milestoneId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveUploadId(milestoneId);
    if (uploadInputRef.current) {
      uploadInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeUploadId && onUpdateCustomImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          onUpdateCustomImage(activeUploadId, result);
        }
      };
      reader.readAsDataURL(file);
    }
    // reset input
    if (uploadInputRef.current) uploadInputRef.current.value = '';
  };

  // Filtered milestones
  const filteredMilestones = milestones.filter((m) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'wedding') return m.category === 'wedding' || m.category === 'engagement';
    if (selectedCategory === 'business') return m.category === 'business';
    if (selectedCategory === 'travel') return m.category === 'travel';
    if (selectedCategory === 'family') return m.category === 'family' || m.category === 'lifestyle' || m.category === 'meet' || m.category === 'anniversary';
    if (selectedCategory === 'education') return m.category === 'education';
    return true;
  });

  const categories: { key: CategoryFilter; label: string; count: number }[] = [
    { key: 'all', label: 'Tất Cả', count: milestones.length },
    { 
      key: 'wedding', 
      label: 'Đám Cưới & Đám Hỏi', 
      count: milestones.filter((m) => m.category === 'wedding' || m.category === 'engagement').length 
    },
    { 
      key: 'business', 
      label: 'Shop SOUL STYLE', 
      count: milestones.filter((m) => m.category === 'business').length 
    },
    { 
      key: 'travel', 
      label: 'Du Lịch & Khám Phá', 
      count: milestones.filter((m) => m.category === 'travel').length 
    },
    { 
      key: 'education', 
      label: 'Học Vấn & Tốt Nghiệp', 
      count: milestones.filter((m) => m.category === 'education').length 
    },
    { 
      key: 'family', 
      label: 'Kỷ Niệm Đời Thường', 
      count: milestones.filter((m) => m.category === 'family' || m.category === 'lifestyle' || m.category === 'meet' || m.category === 'anniversary').length 
    },
  ];

  return (
    <section id="timeline-roadmap-section" className="relative py-16 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Hidden file input for direct timeline upload */}
      <input
        type="file"
        ref={uploadInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Title & Introduction */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs uppercase tracking-wider font-semibold bg-[#EAF0EC] text-[#4E775B] border border-[#D2E2D6]">
          <Sparkles className="w-3.5 h-3.5" />
          Lộ Trình Tình Yêu Trực Quan
        </span>
        <h2 className="mt-3 text-2xl sm:text-3xl font-serif-cormorant font-semibold text-[#2E2A27]">
          Từng Bước Đi Đến Ngày Chung Đôi
        </h2>
        <p className="mt-2 text-sm text-[#736A61] leading-relaxed">
          Mỗi cột mốc là một dấu son rực rỡ, đưa hai con người từ xa lạ trở thành một phần không thể thiếu trong cuộc đời nhau.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 border ${
              selectedCategory === cat.key
                ? 'bg-[#8C3A4D] text-white border-[#8C3A4D] shadow-sm'
                : 'bg-white/80 text-[#6B6158] border-[#E8DFD5] hover:bg-white hover:text-[#2E2A27]'
            }`}
          >
            <span>{cat.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                selectedCategory === cat.key ? 'bg-white/20 text-white' : 'bg-[#EFE8DF] text-[#7A7168]'
              }`}
            >
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Photo Studio / Adjustment Banner */}
      {onOpenPhotoManager && (
        <div className="mb-12 max-w-3xl mx-auto p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#FAF2E6] via-white to-[#FDF0F3] border border-[#E8DACB] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#852233] text-white flex items-center justify-center flex-shrink-0 shadow-xs border border-[#C5A869]/30">
              <Camera className="w-5 h-5 text-[#FAF4EA]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm sm:text-base font-bold text-[#2A2321] font-serif-cormorant">
                  Công Cụ Đổi &amp; Sửa Ảnh Dòng Thời Gian
                </h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#852233] text-[#FAF4EA]">
                  Đã cập nhật
                </span>
              </div>
              <p className="text-xs text-[#7A7067] mt-0.5 leading-relaxed">
                Tự tay hoán đổi ảnh nhầm lẫn, chọn lại ảnh chuẩn từ thư viện 16 bức ảnh mẫu hoặc tải ảnh thực tế của hai vợ chồng.
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenPhotoManager()}
            className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-[#852233] hover:bg-[#701A29] text-white text-xs font-semibold flex items-center justify-center gap-2 flex-shrink-0 shadow-xs transition-all hover:scale-105"
          >
            <Camera className="w-4 h-4 text-[#FFD700]" />
            <span>Mở Trình Chỉnh Ảnh</span>
          </button>
        </div>
      )}

      {/* Visual Roadmap Path */}
      <div className="relative">
        {/* Central Connecting Thread Line (Vertical on desktop) */}
        <div 
          className="absolute left-4 sm:left-1/2 top-4 bottom-12 w-[2px] bg-gradient-to-b from-[#E8C2CA] via-[#D5E3D8] to-[#E8C2CA] -translate-x-1/2 hidden sm:block" 
          aria-hidden="true"
        />
        <div 
          className="absolute left-6 top-4 bottom-12 w-[2px] bg-gradient-to-b from-[#E8C2CA] via-[#D5E3D8] to-[#E8C2CA] sm:hidden" 
          aria-hidden="true"
        />

        {/* Milestone Steps */}
        <div className="space-y-10 sm:space-y-14 relative z-10">
          {filteredMilestones.map((milestone) => {
            const originalIndex = milestones.findIndex((m) => m.id === milestone.id);
            const isEven = originalIndex % 2 === 0;
            const isExpanded = expandedId === milestone.id;
            const photoUrl = customImages[milestone.id] || milestone.defaultImage;
            const likeCount = likes[milestone.id] || 0;

            return (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5 }}
                className={`flex flex-col sm:flex-row items-start ${
                  isEven ? 'sm:flex-row-reverse' : ''
                } gap-6 sm:gap-10`}
              >
                {/* Milestone Node on Central Line */}
                <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-2 border-[#8C3A4D] items-center justify-center shadow-md shadow-[#8C3A4D]/15 text-xs font-bold text-[#8C3A4D] z-20">
                  {String(originalIndex + 1).padStart(2, '0')}
                </div>

                {/* Mobile milestone node */}
                <div className="sm:hidden flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-[#8C3A4D] flex items-center justify-center text-xs font-bold text-[#8C3A4D] shadow-sm">
                    {String(originalIndex + 1).padStart(2, '0')}
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4D]">
                    {milestone.tag}
                  </span>
                </div>

                {/* Content Card (Takes half the space on desktop) */}
                <div className="w-full sm:w-[calc(50%-2.5rem)] ml-10 sm:ml-0">
                  <div className={`rounded-3xl p-5 sm:p-6 transition-all duration-300 group ${
                    milestone.id === 'wedding_nhatbinh'
                      ? 'bg-gradient-to-b from-[#FFFDF9] via-white to-[#FDF8F3] border-2 border-[#D4AF37] shadow-xl shadow-[#8C1D2F]/10 ring-2 ring-[#8C1D2F]/10'
                      : 'bg-white/85 backdrop-blur-sm border border-[#EFE8DF] shadow-sm hover:shadow-md hover:border-[#E8C2CA]'
                  }`}>
                    {/* Top Tag & Date */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      {milestone.id === 'wedding_nhatbinh' ? (
                        <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#8C1D2F] text-[#FFD700] flex items-center gap-1.5 shadow-xs border border-[#D4AF37]">
                          <Crown className="w-3.5 h-3.5 text-[#FFD700]" />
                          Cổ Phục Hoàng Triều
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF0F2] text-[#8C3A4D]">
                          {milestone.tag}
                        </span>
                      )}
                      <div className="flex items-center gap-1 text-xs text-[#7D736A]">
                        <Calendar className="w-3.5 h-3.5 text-[#B35467]" />
                        <span>{milestone.date}</span>
                      </div>
                    </div>

                    {/* Milestone Title */}
                    <h3 className="text-xl font-serif-cormorant font-semibold text-[#2E2A27] group-hover:text-[#8C3A4D] transition-colors">
                      {milestone.title}
                    </h3>
                    <p className="text-xs text-[#8C7F73] mt-0.5 italic">
                      {milestone.subtitle}
                    </p>

                    {/* Thumbnail Photo Preview */}
                    <div 
                      onClick={() => onOpenLightbox(photoUrl, milestone.title, milestone.date)}
                      className="mt-4 relative rounded-2xl overflow-hidden aspect-[16/9] bg-[#EBE5DC] cursor-pointer group/img"
                    >
                      <img
                        src={photoUrl}
                        alt={milestone.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover/img:bg-black/25 transition-colors" />
                      
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[11px] text-white bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
                        <MapPin className="w-3 h-3 text-[#FCE7EB]" />
                        <span>{milestone.location}</span>
                      </div>

                      {/* Photo custom uploaded badge or action */}
                      <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-90 group-hover/img:opacity-100 transition-opacity">
                        {onOpenPhotoManager ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenPhotoManager(milestone.id);
                            }}
                            className="p-1.5 rounded-full bg-black/50 hover:bg-[#852233] text-white backdrop-blur-md transition-all shadow-xs flex items-center gap-1 px-2.5 text-[10px] font-semibold"
                            title="Chỉnh sửa hoặc đổi ảnh cho mốc này"
                          >
                            <Camera className="w-3.5 h-3.5" />
                            <span>Đổi ảnh</span>
                          </button>
                        ) : onUpdateCustomImage ? (
                          <button
                            onClick={(e) => triggerUpload(milestone.id, e)}
                            className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors"
                            title="Thay ảnh cho cột mốc này"
                          >
                            <Camera className="w-3.5 h-3.5" />
                          </button>
                        ) : null}
                      </div>
                    </div>

                    {/* Short quote */}
                    <p className="mt-3 text-xs text-[#524B43] leading-relaxed italic border-l-2 border-[#E8C2CA] pl-3 py-0.5">
                      "{milestone.quote}"
                    </p>

                    {/* Expandable detailed story */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 pt-3 border-t border-[#F2EDE6] text-xs text-[#524B43] leading-relaxed space-y-2"
                      >
                        <p>{milestone.description}</p>
                        <p className="text-[#8C3A4D] font-medium">{milestone.romanticDetails}</p>
                      </motion.div>
                    )}

                    {/* Card Actions */}
                    <div className="mt-4 pt-3 border-t border-[#F4EFE8] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <button
                          onClick={() => toggleExpand(milestone.id)}
                          className="text-[#7A7168] hover:text-[#2E2A27] flex items-center gap-1 font-medium transition-colors"
                        >
                          {isExpanded ? (
                            <>
                              Thu gọn <ChevronUp className="w-3.5 h-3.5" />
                            </>
                          ) : (
                            <>
                              Chi tiết <ChevronDown className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>

                        <button
                          onClick={(e) => handleLike(milestone.id, e)}
                          className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FAF0F2] text-[#8C3A4D] hover:bg-[#F8E2E6] transition-colors"
                          title="Thả tim kỷ niệm"
                        >
                          <Heart className={`w-3.5 h-3.5 ${likeCount > 0 ? 'fill-[#8C3A4D]' : ''}`} />
                          <span className="text-[11px] font-semibold">{likeCount > 0 ? likeCount : 'Yêu thích'}</span>
                        </button>

                        {onOpenPhotoManager && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenPhotoManager(milestone.id);
                            }}
                            className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FAF5EE] text-[#852233] hover:bg-[#F5EAD4] transition-colors border border-[#E6D4BE]"
                            title="Chỉnh sửa/đổi ảnh mốc này"
                          >
                            <Camera className="w-3 h-3 text-[#C5A869]" />
                            <span className="text-[11px] font-semibold">Đổi ảnh</span>
                          </button>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          onSelectMilestone(originalIndex);
                          const el = document.getElementById('interactive-slideshow');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-[#8C3A4D] hover:text-[#5E2432] font-semibold flex items-center gap-1 transition-colors"
                      >
                        Xem Slide <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Empty opposite spacer for balance on desktop */}
                <div className="hidden sm:block w-[calc(50%-2.5rem)]" />
              </motion.div>
            );
          })}
        </div>

        {/* Surprise Grand Finale Card at Bottom of Roadmap */}
        <div className="mt-16 text-center max-w-lg mx-auto bg-gradient-to-r from-[#FDEEF1] via-[#FAF3EB] to-[#F1F7F3] rounded-3xl p-8 border border-[#EACCCE] shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-full bg-white shadow-md text-[#8C3A4D] flex items-center justify-center mx-auto mb-3">
              <Gift className="w-7 h-7" />
            </div>
            <span className="text-xs uppercase tracking-wider font-semibold text-[#8C3A4D]">
              Điều Bất Ngờ Dành Riêng Cho Em
            </span>
            <h3 className="text-2xl font-serif-cormorant font-bold text-[#2E2A27] mt-1">
              Bức Thư Tình Gửi Vợ Ngọc Yến
            </h3>
            <p className="text-xs text-[#736A61] mt-2 leading-relaxed">
              Từ lúc bắt đầu yêu 30/09/2022 đến ngày về chung một nhà 18/05/2024, một bức thư chứa chan những tâm tư chân thành nhất đang chờ em mở ra.
            </p>
            <button
              id="open-surprise-btn"
              onClick={onOpenSurprise}
              className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#8C3A4D] hover:bg-[#722A3A] text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md shadow-[#8C3A4D]/25 transition-all hover:scale-105"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Mở Hộp Quà &amp; Đọc Bức Thư Bí Mật</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
