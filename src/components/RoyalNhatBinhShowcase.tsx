import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Crown, 
  Heart, 
  ZoomIn, 
  CheckCircle2, 
  Feather,
  Info,
  Calendar,
  Layers,
  Camera
} from 'lucide-react';
import royalNhatBinhImg from '@/src/assets/images/nhat_binh_royal_ceremony_1789747892237.jpg';
import weddingNhatBinhImg from '@/src/assets/images/nhat_binh_wedding_1789746628199.jpg';

interface RoyalNhatBinhShowcaseProps {
  onOpenLightbox: (imageUrl: string, title: string, subtitle: string) => void;
  onScrollToTimeline?: () => void;
  customImages?: Record<string, string>;
  onOpenPhotoManager?: (milestoneId?: string) => void;
}

export const RoyalNhatBinhShowcase: React.FC<RoyalNhatBinhShowcaseProps> = ({
  onOpenLightbox,
  onScrollToTimeline,
  customImages = {},
  onOpenPhotoManager,
}) => {
  const [activeTab, setActiveTab] = useState<'meaning' | 'details' | 'story'>('meaning');
  const [selectedPhoto, setSelectedPhoto] = useState<'ceremony' | 'portrait'>('ceremony');

  const ceremonyImg = customImages['wedding_nhatbinh'] || royalNhatBinhImg;
  const portraitImg =
    customImages['wedding_nhatbinh_portrait'] ||
    customImages['wedding_pastel'] ||
    customImages['engagement'] ||
    weddingNhatBinhImg;

  const currentDisplayImg = selectedPhoto === 'ceremony' ? ceremonyImg : portraitImg;

  return (
    <section id="royal-nhat-binh-section" className="relative py-16 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Traditional Court-inspired Framing */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#FFFBF7] via-[#FCF6F0] to-[#FAF2E9] border-2 border-[#EAD3BD] p-6 sm:p-10 shadow-xl shadow-[#8C1D2F]/5 overflow-hidden">
        {/* Decorative corner motifs */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#8C1D2F]/5 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-[#D4AF37]/10 blur-2xl pointer-events-none" />

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-[#8C1D2F]/10 text-[#8C1D2F] border border-[#8C1D2F]/20 mb-4"
          >
            <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Tinh Hoa Cổ Phục Hoàng Triều Việt Nam</span>
          </motion.div>

          <h2 className="font-serif-cormorant text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2E2A27] tracking-tight leading-tight">
            Lễ Thành Hôn Áo Nhật Bình
            <span className="block text-xl sm:text-2xl text-[#8C1D2F] font-serif-playfair italic mt-1">
              Khí Chất Quý Tộc &amp; Nét Đẹp Vương Giả
            </span>
          </h2>

          <p className="mt-4 text-[#63574D] text-xs sm:text-sm leading-relaxed font-sans">
            Ngày 18/05/2024, <span className="whitespace-nowrap font-medium text-[#2E2A27]">Đan Thanh</span> &amp; <span className="whitespace-nowrap font-medium text-[#2E2A27]">Ngọc Yến</span> quyết định chọn lễ phục cổ truyền triều Nguyễn: 
            <strong className="text-[#8C1D2F] font-semibold"> Áo Nhật Bình</strong> son thêu phượng hoàng quý phái cùng 
            <strong className="text-[#2E2A27] font-semibold"> Áo Tấc</strong> tôn nghiêm đĩnh đạc. Toàn bộ nghi lễ và trang phục do hai vợ chồng tự tay chuẩn bị 100%.
          </p>
        </div>

        {/* Dual Visual Showcase + Interactive Exploration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Visual Display (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#F5E6D8] bg-[#2E2A27] group aspect-[4/3]">
              <img
                src={currentDisplayImg}
                alt="Cổ Phục Áo Nhật Bình Hôn Lễ"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Top royal stamp badge */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#8C1D2F]/90 backdrop-blur-md text-[#FFF3E0] text-xs font-semibold tracking-wider flex items-center gap-1.5 border border-[#D4AF37]/50 shadow-md">
                  <Crown className="w-3.5 h-3.5 text-[#FFD700]" />
                  Cổ Phục Triều Nguyễn
                </span>
                <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white/90 text-xs font-medium">
                  18.05.2024
                </span>
              </div>

              {/* Zoom & Photo Manager Triggers */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5">
                {onOpenPhotoManager && (
                  <button
                    onClick={() => onOpenPhotoManager('wedding_nhatbinh')}
                    className="px-2.5 py-1 rounded-full bg-black/60 hover:bg-[#8C1D2F] text-[#FFF3E0] text-[10px] font-semibold flex items-center gap-1 backdrop-blur-md transition-all shadow-md"
                    title="Cập nhật ảnh này từ Dòng Thời Gian Tình Yêu"
                  >
                    <Camera className="w-3 h-3 text-[#FFD700]" />
                    <span className="hidden sm:inline">Đổi ảnh Dòng Thời Gian</span>
                  </button>
                )}
                <button
                  onClick={() =>
                    onOpenLightbox(
                      currentDisplayImg,
                      'Hôn Lễ Cổ Phục Hoàng Triều Áo Nhật Bình',
                      'Đan Thanh & Ngọc Yến — 18/05/2024 — Tự tay chuẩn bị 100%'
                    )
                  }
                  className="p-1.5 sm:p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-all shadow-md"
                  title="Phóng to ảnh chất lượng cao"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              {/* Caption at bottom */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="font-serif-cormorant text-base sm:text-lg md:text-xl font-bold text-[#FFF3E0] drop-shadow-md">
                  "Khoác lên tà áo Nhật Bình cung đình, hôm nay anh cưới người con gái anh yêu nhất làm vợ."
                </p>
                <p className="text-[11px] sm:text-xs text-white/90 mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 font-sans">
                  <span className="whitespace-nowrap">Trần Đan Thanh (Áo Tấc)</span>
                  <span>•</span>
                  <span className="whitespace-nowrap">Đồng Thị Ngọc Yến (Áo Nhật Bình)</span>
                </p>
              </div>
            </div>

            {/* Thumbnail switcher */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedPhoto('ceremony')}
                className={`flex-1 flex items-center gap-2 p-2 sm:p-2.5 rounded-xl border text-left transition-all ${
                  selectedPhoto === 'ceremony'
                    ? 'bg-[#8C1D2F]/10 border-[#8C1D2F] text-[#8C1D2F]'
                    : 'bg-white border-[#E8DFD5] text-[#6B6158] hover:bg-[#F9F5EF]'
                }`}
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-[#E0D4C5]">
                  <img src={ceremonyImg} alt="Nghi thức" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="block text-xs font-bold leading-tight">Nghi Lễ Cung Đình</span>
                  <span className="block text-[10px] sm:text-[11px] text-[#8C7F73]">Cổ phục &amp; Mấn vàng quý tộc</span>
                </div>
              </button>

              <button
                onClick={() => setSelectedPhoto('portrait')}
                className={`flex-1 flex items-center gap-2 p-2 sm:p-2.5 rounded-xl border text-left transition-all ${
                  selectedPhoto === 'portrait'
                    ? 'bg-[#8C1D2F]/10 border-[#8C1D2F] text-[#8C1D2F]'
                    : 'bg-white border-[#E8DFD5] text-[#6B6158] hover:bg-[#F9F5EF]'
                }`}
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-[#E0D4C5]">
                  <img src={portraitImg} alt="Ảnh chân dung" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="block text-xs font-bold leading-tight">Khoảnh Khắc Hạnh Phúc</span>
                  <span className="block text-[10px] sm:text-[11px] text-[#8C7F73]">Rạng ngời ngày chung đôi</span>
                </div>
              </button>
            </div>
          </div>

          {/* Interactive Information & Cultural Significance (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-[#EFE7DE] rounded-xl border border-[#E5DACD]">
              <button
                onClick={() => setActiveTab('meaning')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'meaning'
                    ? 'bg-white text-[#8C1D2F] shadow-xs'
                    : 'text-[#73685E] hover:text-[#2E2A27]'
                }`}
              >
                Ý Nghĩa Quý Tộc
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'details'
                    ? 'bg-white text-[#8C1D2F] shadow-xs'
                    : 'text-[#73685E] hover:text-[#2E2A27]'
                }`}
              >
                Cổ Phục Chi Tiết
              </button>
              <button
                onClick={() => setActiveTab('story')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'story'
                    ? 'bg-white text-[#8C1D2F] shadow-xs'
                    : 'text-[#73685E] hover:text-[#2E2A27]'
                }`}
              >
                Tự Tay Chuẩn Bị
              </button>
            </div>

            {/* Tab Content 1: Meaning */}
            {activeTab === 'meaning' && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/90 rounded-2xl p-5 border border-[#EADBCC] space-y-3.5 shadow-sm text-xs sm:text-sm text-[#4A4035]"
              >
                <div className="flex items-center gap-2 text-[#8C1D2F] font-bold">
                  <Crown className="w-4 h-4 text-[#D4AF37]" />
                  <span>Biểu Tượng Vương Giả Cung Đình Huế</span>
                </div>
                <p className="leading-relaxed">
                  Áo Nhật Bình là thường phục cao quý của bậc Hoàng Thái Hậu, Hoàng Hậu, Công Chúa và Mệnh phụ triều Nguyễn.
                  Cổ áo khoét hình chữ nhật đặc trưng, dệt viền chỉ kim tuyến cùng dải ngũ hành năm sắc màu biểu trưng cho ngũ phúc lâm môn và ngũ đức: 
                  <strong className="text-[#8C1D2F]"> Nhân - Lễ - Nghĩa - Trí - Tín</strong>.
                </p>
                <div className="pt-2 border-t border-[#F2ECE4] space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#8C1D2F] shrink-0 mt-0.5" />
                    <span><strong>Sắc son chu sa:</strong> Tượng trưng cho hỷ sự viên mãn, tình yêu nồng thắm son sắt trọn đời.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#8C1D2F] shrink-0 mt-0.5" />
                    <span><strong>Mấn hoàng gia &amp; Kim chỉ thêu:</strong> Tôn vinh nét đoan trang, kiêu sa và thanh lịch của người phụ nữ Việt.</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab Content 2: Details */}
            {activeTab === 'details' && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/90 rounded-2xl p-5 border border-[#EADBCC] space-y-3.5 shadow-sm text-xs sm:text-sm text-[#4A4035]"
              >
                <div className="flex items-center gap-2 text-[#8C1D2F] font-bold">
                  <Layers className="w-4 h-4 text-[#D4AF37]" />
                  <span>Sự Kết Hợp Hoàn Hảo Của Đôi Uyên Ương</span>
                </div>
                <div className="space-y-3">
                  <div className="p-2.5 rounded-xl bg-[#FAF5EE] border border-[#EADFCF]">
                    <span className="block text-xs font-bold text-[#8C1D2F]">Cô dâu Ngọc Yến — Áo Nhật Bình</span>
                    <p className="text-xs text-[#63574D] mt-0.5">
                      Gấm lụa cao cấp thêu họa tiết chim phượng hoàng vỗ cánh, hoa sen và hoa văn vân mây. Đầu đội mấn truyền thống đính vàng kim, toát lên khí chất quý phái của bậc tiểu thư danh giá.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FAF5EE] border border-[#EADFCF]">
                    <span className="block text-xs font-bold text-[#2E4A62]">Chú rể Đan Thanh — Áo Tấc Thượng Hạng</span>
                    <p className="text-xs text-[#63574D] mt-0.5">
                      Áo Tấc ngũ thân tay thụng trang nhã, đội khăn đóng nghiêm chỉnh, biểu tượng cho phong thái điềm đạm, vững chãi của người chồng trụ cột gia đình.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab Content 3: Story */}
            {activeTab === 'story' && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/90 rounded-2xl p-5 border border-[#EADBCC] space-y-3.5 shadow-sm text-xs sm:text-sm text-[#4A4035]"
              >
                <div className="flex items-center gap-2 text-[#8C1D2F] font-bold">
                  <Feather className="w-4 h-4 text-[#D4AF37]" />
                  <span>Tự Tay Chuẩn Bị 100% — Tình Yêu Vô Giá</span>
                </div>
                <p className="leading-relaxed">
                  Đám cưới không chỉ là một buổi lễ, mà là kết tinh của một năm dài hai đứa cùng nhau mơ ước, tìm tòi và tự tay thực hiện.
                </p>
                <ul className="space-y-1.5 text-xs text-[#63574D]">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8C1D2F]" />
                    Tự lựa chọn chất liệu gấm và hoa văn Cổ phục truyền thống
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8C1D2F]" />
                    Tự tay thiết kế thiệp cưới, kịch bản chương trình và âm nhạc
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8C1D2F]" />
                    Chăm chút từng đóa hoa cưới và lễ vật bái tạ tổ tiên
                  </li>
                </ul>
              </motion.div>
            )}

            {/* Quote Pill */}
            <div className="p-3.5 rounded-2xl bg-[#8C1D2F]/5 border border-[#8C1D2F]/20 flex items-center gap-3">
              <Heart className="w-5 h-5 text-[#8C1D2F] fill-[#8C1D2F]/20 shrink-0" />
              <p className="text-xs text-[#54433A] italic">
                "Một đám cưới thuần Việt, tôn vinh cội nguồn và minh chứng cho tình yêu son sắt của <span className="whitespace-nowrap font-medium text-[#2E2A27]">Đan Thanh &amp; Ngọc Yến</span>."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
