import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Mail, 
  Sparkles, 
  Edit3, 
  Check, 
  RotateCcw,
  Crown,
  ScrollText
} from 'lucide-react';
import { LoveLetterData } from '../types';

interface SurpriseLoveLetterProps {
  isOpen: boolean;
  onToggle: () => void;
  letterData: LoveLetterData;
  onSaveLetter: (data: LoveLetterData) => void;
  onResetLetter: () => void;
}

export const SurpriseLoveLetter: React.FC<SurpriseLoveLetterProps> = ({
  isOpen,
  onToggle,
  letterData,
  onSaveLetter,
  onResetLetter,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(letterData.title);
  const [editedBody, setEditedBody] = useState(letterData.paragraphs.join('\n\n'));
  const [editedSignature, setEditedSignature] = useState(letterData.signature);

  const fireRomanticConfetti = () => {
    // Royal gold & crimson petal confetti
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#FFD700', '#8C1D2F', '#FCECEE', '#FAF2DC'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 35,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: ['#D4AF37', '#8C1D2F', '#FFD700'],
      });
      confetti({
        particleCount: 35,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: ['#D4AF37', '#8C1D2F', '#FFD700'],
      });
    }, 200);
  };

  const handleOpenEnvelope = () => {
    if (!isOpen) {
      fireRomanticConfetti();
    }
    onToggle();
  };

  const handleSave = () => {
    const paragraphs = editedBody.split('\n\n').filter((p) => p.trim().length > 0);
    onSaveLetter({
      ...letterData,
      title: editedTitle,
      paragraphs,
      signature: editedSignature,
    });
    setIsEditing(false);
    fireRomanticConfetti();
  };

  return (
    <section id="surprise-letter-section" className="relative py-16 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Decorative intro */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-bold bg-[#FAF0DC] text-[#8C1D2F] border border-[#D4AF37]/50 shadow-2xs">
          <ScrollText className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Hoàng Thư Tình Duyên • Lời Hứa Trăm Năm</span>
        </span>
        <h2 className="mt-3 text-2xl sm:text-4xl font-serif-cormorant font-bold text-[#231D1B]">
          Bức Hoàng Thư Gửi Vợ Yêu <span className="whitespace-nowrap">Ngọc Yến</span>
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#7A6E65] leading-relaxed">
          Chạm vào phong ấn hoàng gia viền kim để mở ra những tâm tình mộc mạc và chân thành nhất từ tận đáy lòng phu quân.
        </p>
      </div>

      {/* Envelope / Letter Container */}
      <div className="relative flex flex-col items-center">
        {/* Closed Envelope view when not opened yet */}
        {!isOpen && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="cursor-pointer group relative w-full max-w-md bg-gradient-to-b from-[#FFFDF9] to-[#FAF3E8] rounded-3xl p-8 border-2 border-[#D4AF37] shadow-xl shadow-[#8C1D2F]/10 text-center hover:scale-[1.02] transition-transform duration-300"
            onClick={handleOpenEnvelope}
          >
            {/* Corner Decorative Filigree */}
            <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#D4AF37]" />
            <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#D4AF37]" />
            <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#D4AF37]" />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#D4AF37]" />

            {/* Imperial Wax Seal Circle */}
            <div className="w-22 h-22 mx-auto rounded-full bg-gradient-to-br from-[#8C1D2F] to-[#5C101D] flex flex-col items-center justify-center text-[#FFD700] shadow-xl shadow-[#8C1D2F]/30 border-2 border-[#D4AF37] relative">
              <Crown className="w-5 h-5 text-[#FFD700] mb-0.5" />
              <span className="font-serif-cormorant font-bold text-[11px] uppercase tracking-widest text-[#FAF2DC]">
                Song Hỷ
              </span>
              <div className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-[#231D1B] text-[9px] font-bold tracking-widest uppercase shadow">
                18.05.2024
              </div>
            </div>

            <div className="mt-6">
              <span className="font-script text-3xl sm:text-5xl text-[#8C1D2F] block">
                Ngọc Yến
              </span>
              <p className="text-xs text-[#7A6E65] mt-1 font-semibold">
                Hiền Thê: Đồng Thị Ngọc Yến (1995)
              </p>
              <p className="text-xs text-[#8A7D71]">
                Phu Quân: Trần Đan Thanh (1992)
              </p>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#8C1D2F] text-white text-xs font-semibold shadow-md border border-[#D4AF37]/50 group-hover:bg-[#721625] transition-colors">
              <ScrollText className="w-4 h-4 text-[#FFD700]" />
              <span>Khai Mở Hoàng Thư</span>
            </div>
          </motion.div>
        )}

        {/* Opened Letter Paper (Imperial Decree Style) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full royal-silk-card rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37] shadow-2xl shadow-[#8C1D2F]/15 relative overflow-hidden"
            >
              {/* Corner Filigree */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37] pointer-events-none" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37] pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37] pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37] pointer-events-none" />

              {/* Action Toolbar */}
              <div className="flex items-center justify-between border-b border-[#E8DFD3] pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#8C1D2F]" />
                  <span className="text-xs text-[#8A7D71] font-semibold tracking-wider uppercase">
                    {letterData.dateStr}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={fireRomanticConfetti}
                    className="p-2 rounded-xl text-[#8C1D2F] bg-white border border-[#E5DAD0] hover:bg-[#FAF4EC] transition-colors"
                    title="Bắn hoa đăng chúc phúc"
                  >
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  </button>

                  <button
                    onClick={() => {
                      if (!isEditing) {
                        setEditedTitle(letterData.title);
                        setEditedBody(letterData.paragraphs.join('\n\n'));
                        setEditedSignature(letterData.signature);
                      }
                      setIsEditing(!isEditing);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#544A42] bg-white hover:bg-[#FAF4EC] border border-[#E5DAD0] transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#8C1D2F]" />
                    <span>{isEditing ? 'Hủy sửa' : 'Tùy chỉnh thư'}</span>
                  </button>
                </div>
              </div>

              {/* Editable or Display View */}
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#544A42] mb-1">
                      Tiêu đề bức thư:
                    </label>
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4AF37]/50 bg-white text-sm text-[#231D1B] focus:outline-none focus:border-[#8C1D2F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#544A42] mb-1">
                      Nội dung tâm thư (mỗi đoạn cách nhau 1 dòng trống):
                    </label>
                    <textarea
                      rows={8}
                      value={editedBody}
                      onChange={(e) => setEditedBody(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4AF37]/50 bg-white text-sm text-[#231D1B] focus:outline-none focus:border-[#8C1D2F] leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#544A42] mb-1">
                      Chữ ký:
                    </label>
                    <input
                      type="text"
                      value={editedSignature}
                      onChange={(e) => setEditedSignature(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4AF37]/50 bg-white text-sm text-[#231D1B] focus:outline-none focus:border-[#8C1D2F]"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3">
                    <button
                      onClick={onResetLetter}
                      className="px-4 py-2 rounded-full text-xs text-[#8A7D71] hover:text-[#231D1B] flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Khôi phục ban đầu
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-5 py-2.5 rounded-full bg-[#8C1D2F] hover:bg-[#721625] text-white text-xs font-bold flex items-center gap-1.5 shadow border border-[#D4AF37]/40"
                    >
                      <Check className="w-4 h-4" /> Lưu lời nhắn
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Title */}
                  <h3 className="text-2xl sm:text-4xl font-serif-cormorant font-bold text-[#231D1B] text-center leading-snug">
                    {letterData.title}
                  </h3>

                  {/* Letter Body Paragraphs */}
                  <div className="space-y-4 text-sm sm:text-base text-[#453C35] leading-relaxed font-normal">
                    {letterData.paragraphs.map((p, idx) => (
                      <p key={idx} className="indent-4 sm:indent-8">
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* Signature Section & Vermilion Imperial Seal */}
                  <div className="pt-6 border-t border-[#E8DFD3] flex items-end justify-between">
                    {/* Cinnabar Imperial Stamp */}
                    <div className="royal-seal w-14 h-14 rounded-lg flex flex-col items-center justify-center text-[#FAF2DC] text-[10px] font-serif-cormorant font-bold shadow-md shadow-[#8C1D2F]/20">
                      <span>Đan Thanh</span>
                      <span>Ngọc Yến</span>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="font-script text-3xl sm:text-5xl text-[#8C1D2F]">
                        {letterData.signature}
                      </span>
                      {letterData.postscript && (
                        <p className="mt-2 text-xs text-[#8A7D71] italic">
                          {letterData.postscript}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Close Button */}
              <div className="mt-8 text-center pt-4 border-t border-[#E8DFD3]">
                <button
                  onClick={onToggle}
                  className="text-xs text-[#8A7D71] hover:text-[#8C1D2F] font-semibold underline"
                >
                  Cuộn bức hoàng thư lại
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
