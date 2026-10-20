import React from 'react';
import { Heart, Sparkles, RefreshCw, Crown, Github, Rocket } from 'lucide-react';

interface FooterProps {
  onResetAllCustomData: () => void;
  hasCustomData: boolean;
  onOpenGitHubModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onResetAllCustomData,
  hasCustomData,
  onOpenGitHubModal,
}) => {
  return (
    <footer className="mt-20 border-t-2 border-[#D4AF37]/40 bg-gradient-to-b from-[#FAF6F0] to-[#F3ECE1] py-14 px-4 sm:px-6 text-center text-xs text-[#7A6E65]">
      <div className="max-w-4xl mx-auto space-y-5">
        {/* Imperial Seal & Monogram */}
        <div className="flex items-center justify-center gap-3 text-[#8C1D2F]">
          <span className="h-[1px] w-14 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <div className="w-8 h-8 rounded-full bg-[#8C1D2F] flex items-center justify-center text-[#FFD700] shadow-sm border border-[#D4AF37]">
            <Crown className="w-4 h-4 text-[#FFD700]" />
          </div>
          <span className="font-serif-cormorant font-bold text-xl sm:text-2xl text-[#231D1B] tracking-tight">
            Trần Đan Thanh &amp; Đồng Thị Ngọc Yến
          </span>
          <span className="h-[1px] w-14 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>

        {/* Poetic verse */}
        <p className="font-serif-cormorant text-base sm:text-lg italic text-[#4E443B] max-w-xl mx-auto leading-relaxed">
          "Trăm năm tơ duyên bền chặt như gấm hoa cung đình, vạn dặm sơn hà cùng nàng tay nắm tay đến bạc đầu."
        </p>

        {/* Traditional Dates summary */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 text-[11px] text-[#8A7D71] font-medium bg-white/70 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 shadow-2xs">
          <span>Quý Dậu 1992 &amp; Ất Hợi 1995</span>
          <span>•</span>
          <span>Gặp gỡ: 30/09/2022</span>
          <span>•</span>
          <span>Đính hôn: 30/05/2023</span>
          <span>•</span>
          <span className="text-[#8C1D2F] font-bold">Thành hôn Cổ Phục Nhật Bình: 18/05/2024</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {onOpenGitHubModal && (
            <button
              onClick={onOpenGitHubModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#241E1C] hover:bg-[#382E2B] text-[#FAF4EA] text-xs font-semibold transition-all shadow-xs border border-[#D4AF37]/50"
            >
              <Github className="w-3.5 h-3.5 text-[#FFD700]" />
              <span>Xuất lên GitHub &amp; Sao lưu ảnh</span>
            </button>
          )}

          {hasCustomData && (
            <button
              onClick={onResetAllCustomData}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#D4AF37]/50 text-xs font-semibold text-[#8C1D2F] hover:bg-[#FAF4EC] transition-colors shadow-2xs"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Khôi phục toàn bộ ảnh mẫu ban đầu</span>
            </button>
          )}
        </div>

        <div className="pt-4 border-t border-[#E5DAD0] text-[11px] text-[#968A7E]">
          Kỷ Niệm Tình Duyên • <span className="whitespace-nowrap">Trần Đan Thanh</span> &amp; <span className="whitespace-nowrap">Đồng Thị Ngọc Yến</span> • Bản quyền tình yêu vĩnh cửu
        </div>
      </div>
    </footer>
  );
};
