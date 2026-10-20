import React, { useState } from 'react';
import { Heart, Sparkles, Flower2, Crown, Menu, X, ScrollText, Calendar, Camera, Github } from 'lucide-react';

interface HeaderNavProps {
  petalsEnabled: boolean;
  onTogglePetals: () => void;
  onScrollTo: (id: string) => void;
  onOpenPhotoManager: () => void;
  onOpenGitHubModal: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  petalsEnabled,
  onTogglePetals,
  onScrollTo,
  onOpenPhotoManager,
  onOpenGitHubModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onScrollTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EAE2D7] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Monogram Brand */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#852233] text-[#FAF4EA] flex items-center justify-center font-serif-cormorant font-bold text-sm tracking-widest shadow-xs transition-transform group-hover:scale-105 border border-[#C5A869]/40">
            T&Y
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif-cormorant font-bold text-base sm:text-lg text-[#241E1C] tracking-tight group-hover:text-[#852233] transition-colors whitespace-nowrap">
                <span className="whitespace-nowrap">Trần Đan Thanh</span> &amp; <span className="whitespace-nowrap">Đồng Thị Ngọc Yến</span>
              </span>
              <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#852233]/10 text-[#852233]">
                Song Hỷ
              </span>
            </div>
            <span className="block text-[11px] text-[#786E65] font-normal tracking-wide">
              Hành Trình Yêu Thương • Tri Kỷ Đồng Hành
            </span>
          </div>
        </div>

        {/* Navigation links & controls */}
        <div className="flex items-center gap-2 sm:gap-4 text-xs font-medium text-[#5E544C]">
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            <button
              onClick={() => handleNavClick('emotional-journey-section')}
              className="px-3.5 py-1.5 rounded-full text-[#852233] hover:bg-[#852233]/10 transition-all font-semibold flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A869]" />
              <span>Cung Bậc Cảm Xúc</span>
            </button>

            <button
              onClick={() => handleNavClick('royal-nhat-binh-section')}
              className="px-3.5 py-1.5 rounded-full hover:bg-black/5 hover:text-[#852233] transition-all flex items-center gap-1.5"
            >
              <Crown className="w-3.5 h-3.5 text-[#C5A869]" />
              <span>Cổ Phục Nhật Bình</span>
            </button>

            <button
              onClick={() => handleNavClick('timeline-roadmap-section')}
              className="px-3.5 py-1.5 rounded-full hover:bg-black/5 hover:text-[#852233] transition-all flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-[#786E65]" />
              <span>Dòng Kỷ Niệm</span>
            </button>

            <button
              onClick={() => handleNavClick('love-counter-section')}
              className="px-3.5 py-1.5 rounded-full hover:bg-black/5 hover:text-[#852233] transition-all"
            >
              Thời Khắc
            </button>

            <button
              onClick={onOpenPhotoManager}
              className="px-3 py-1.5 rounded-full bg-[#FAF0F2] hover:bg-[#F8E2E6] text-[#852233] font-semibold transition-all flex items-center gap-1.5 border border-[#E8C2CA] shadow-2xs"
              title="Mở công cụ chỉnh sửa và hoán đổi ảnh 14 mốc kỷ niệm"
            >
              <Camera className="w-3.5 h-3.5 text-[#852233]" />
              <span>Chỉnh/Đổi Ảnh</span>
            </button>

            <button
              onClick={onOpenGitHubModal}
              className="px-3 py-1.5 rounded-full bg-[#241E1C] hover:bg-[#382E2B] text-[#FAF4EA] font-semibold transition-all flex items-center gap-1.5 shadow-2xs border border-[#D4AF37]/40"
              title="Xuất dự án và hướng dẫn đưa lên GitHub Pages"
            >
              <Github className="w-3.5 h-3.5 text-[#FFD700]" />
              <span>Xuất GitHub</span>
            </button>

            <button
              onClick={() => handleNavClick('surprise-letter-section')}
              className="px-4 py-1.5 rounded-full bg-[#852233] hover:bg-[#701A29] text-[#FAF4EA] font-semibold transition-all flex items-center gap-1.5 shadow-xs"
            >
              <ScrollText className="w-3.5 h-3.5 text-[#FAF4EA]" />
              <span>Thư Tình Cho Yến</span>
            </button>
          </nav>

          {/* Falling Petals Toggle */}
          <button
            onClick={onTogglePetals}
            className={`p-2 rounded-full border transition-all ${
              petalsEnabled
                ? 'bg-[#852233]/10 text-[#852233] border-[#852233]/20 shadow-2xs'
                : 'bg-white text-[#786E65] border-[#E8DFD3] hover:text-[#241E1C]'
            }`}
            title={petalsEnabled ? 'Tắt cánh hoa rơi' : 'Bật cánh hoa rơi'}
          >
            <Flower2 className="w-4 h-4" />
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full bg-white border border-[#E5DAD0] text-[#5E544C] hover:text-[#852233]"
            aria-label="Mở menu điều hướng"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#EAE2D7] px-6 py-5 space-y-3 shadow-lg">
          <div className="flex flex-col gap-2 text-sm font-medium">
            <button
              onClick={() => {
                onOpenPhotoManager();
                setMobileMenuOpen(false);
              }}
              className="p-3 rounded-xl bg-[#FAF0F2] text-[#852233] font-bold text-left flex items-center gap-2.5 border border-[#E8C2CA] shadow-2xs"
            >
              <Camera className="w-4 h-4 text-[#852233]" />
              <span>📸 Công Cụ Chỉnh Sửa &amp; Đổi Ảnh Kỷ Niệm</span>
            </button>
            <button
              onClick={() => {
                onOpenGitHubModal();
                setMobileMenuOpen(false);
              }}
              className="p-3 rounded-xl bg-[#241E1C] text-[#FAF4EA] font-bold text-left flex items-center gap-2.5 border border-[#D4AF37]/50 shadow-2xs"
            >
              <Github className="w-4 h-4 text-[#FFD700]" />
              <span>🚀 Xuất Dự Án Lên GitHub &amp; Sao Lưu Ảnh</span>
            </button>
            <button
              onClick={() => handleNavClick('emotional-journey-section')}
              className="p-3 rounded-xl bg-[#FAF2E6] text-[#852233] font-semibold text-left flex items-center gap-2.5 border border-[#E6D4BE]"
            >
              <Sparkles className="w-4 h-4 text-[#C5A869]" />
              <span>Hành Trình Qua Từng Cung Bậc Cảm Xúc</span>
            </button>
            <button
              onClick={() => handleNavClick('royal-nhat-binh-section')}
              className="p-3 rounded-xl bg-white border border-[#EAE2D7] text-[#241E1C] text-left flex items-center gap-2.5 hover:border-[#852233]"
            >
              <Crown className="w-4 h-4 text-[#C5A869]" />
              <span>Cổ Phục Nhật Bình Hoàng Triều (18/05/2024)</span>
            </button>
            <button
              onClick={() => handleNavClick('timeline-roadmap-section')}
              className="p-3 rounded-xl bg-white border border-[#EAE2D7] text-[#241E1C] text-left flex items-center gap-2.5 hover:border-[#852233]"
            >
              <Calendar className="w-4 h-4 text-[#786E65]" />
              <span>14 Mốc Son Kỷ Niệm Đời Thực</span>
            </button>
            <button
              onClick={() => handleNavClick('love-counter-section')}
              className="p-3 rounded-xl bg-white border border-[#EAE2D7] text-[#241E1C] text-left hover:border-[#852233]"
            >
              Đồng Hồ Tình Yêu (Thời Khắc Vàng Son)
            </button>
            <button
              onClick={() => handleNavClick('surprise-letter-section')}
              className="p-3 rounded-xl bg-[#852233] text-white font-semibold text-left flex items-center gap-2 shadow-xs"
            >
              <ScrollText className="w-4 h-4 text-white" />
              <span>Bức Thư Tình Cho Ngọc Yến</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

