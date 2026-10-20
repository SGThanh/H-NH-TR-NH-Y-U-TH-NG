import React, { useEffect, useState } from 'react';
import { Heart, Calendar, Sparkles, Clock, Crown, Hourglass } from 'lucide-react';
import { coupleData } from '../data/timelineData';

export const LoveCounter: React.FC = () => {
  // Meet anniversary: 30/09/2022 00:00:00
  const meetTimestamp = new Date('2022-09-30T00:00:00').getTime();
  // Wedding anniversary: 18/05/2024 00:00:00
  const weddingTimestamp = new Date('2024-05-18T00:00:00').getTime();

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const calculateTimeBreakdown = (fromTimestamp: number) => {
    const diff = Math.max(0, now - fromTimestamp);
    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { totalDays, hours, minutes, seconds };
  };

  const loveTime = calculateTimeBreakdown(meetTimestamp);
  const weddingTime = calculateTimeBreakdown(weddingTimestamp);

  return (
    <section id="love-counter-section" className="relative py-14 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Decorative top ribbon */}
      <div className="text-center mb-9">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-bold bg-[#FAF0DC] text-[#8C1D2F] border border-[#D4AF37]/50 shadow-2xs">
          <Hourglass className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Thời Khắc Hoàng Kim • Vĩnh Kết Đồng Tâm</span>
        </span>
        <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-serif-cormorant font-bold text-[#231D1B]">
          Đồng Hồ Tình Yêu Hoàng Triều
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#7A6E65] max-w-lg mx-auto leading-relaxed">
          Từng nhịp giây trôi qua từ ngày tao ngộ 30/09/2022 là một nét vàng son khắc sâu vào định mệnh lứa đôi.
        </p>
      </div>

      {/* Main Days Counter Board - Imperial Silk & Lacquer Styling */}
      <div className="royal-silk-card rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37]/70 shadow-lg shadow-[#8C1D2F]/10 text-center relative overflow-hidden">
        {/* Corner Royal Floral Filigree Accents */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37] pointer-events-none" />
        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37] pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37] pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37] pointer-events-none" />

        {/* Ambient Warm Golden Glow */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#FAF0DC]/70 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#FCECEE]/70 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-center gap-3 text-[#A06B28] mb-3">
            <span className="h-[1px] w-8 sm:w-16 bg-[#D4AF37]/60" />
            <span className="font-script text-xl sm:text-3xl text-[#8C1D2F] whitespace-nowrap">
              Đan Thanh &amp; Ngọc Yến
            </span>
            <span className="h-[1px] w-8 sm:w-16 bg-[#D4AF37]/60" />
          </div>

          {/* Large Days Metric */}
          <div className="flex flex-col items-center justify-center my-4 sm:my-6">
            <span className="text-6xl sm:text-8xl font-serif-cormorant font-bold text-[#8C1D2F] tracking-tight drop-shadow-xs">
              {loveTime.totalDays.toLocaleString()}
            </span>
            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#A06B28] mt-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Ngày Khắc Ghi Tình Nghĩa Phu Thê</span>
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            </span>
          </div>

          {/* Sub Units: Hours, Minutes, Seconds (Lacquered Imperial Tiles) */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-md mx-auto mt-6 pt-6 border-t border-[#E8DFD3]">
            <div className="bg-[#FFFDF9] rounded-2xl p-3 sm:p-4 border border-[#E5DAD0] shadow-xs">
              <span className="block text-2xl sm:text-3xl font-serif-cormorant font-bold text-[#231D1B]">
                {String(loveTime.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-[#8A7D71] font-semibold uppercase tracking-wider">Giờ</span>
            </div>
            <div className="bg-[#FFFDF9] rounded-2xl p-3 sm:p-4 border border-[#E5DAD0] shadow-xs">
              <span className="block text-2xl sm:text-3xl font-serif-cormorant font-bold text-[#231D1B]">
                {String(loveTime.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-[#8A7D71] font-semibold uppercase tracking-wider">Phút</span>
            </div>
            <div className="bg-gradient-to-b from-[#8C1D2F] to-[#721625] rounded-2xl p-3 sm:p-4 border border-[#D4AF37] shadow-sm text-white">
              <span className="block text-2xl sm:text-3xl font-serif-cormorant font-bold text-[#FAF2DC]">
                {String(loveTime.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-[#FAF2DC]/80 font-semibold uppercase tracking-wider">Giây</span>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Milestones Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6">
        {/* Wedding Counter Card (Áo Nhật Bình) */}
        <div className="bg-[#FFFDF9] rounded-2xl p-5 border-2 border-[#D4AF37]/50 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#8C1D2F] border border-[#D4AF37] flex items-center justify-center shrink-0 text-[#FFD700] shadow-xs">
            <Crown className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-bold text-[#8C1D2F]">
                Lễ Thành Hôn (Áo Nhật Bình)
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#FAF0DC] text-[#A06B28] font-semibold border border-[#D4AF37]/30">
                18/05/2024
              </span>
            </div>
            <p className="text-xl sm:text-2xl font-serif-cormorant font-bold text-[#231D1B] mt-1">
              {weddingTime.totalDays} ngày phu thê hòa hợp
            </p>
            <p className="text-xs text-[#7A6E65] mt-1 leading-relaxed">
              Khoác lên mình Cổ phục Nhật Bình quý phái, toàn bộ hôn lễ tự tay hai đứa chuẩn bị chu toàn 100%.
            </p>
          </div>
        </div>

        {/* Engagement Anniversary Card */}
        <div className="bg-[#FFFDF9] rounded-2xl p-5 border border-[#E8DFD3] shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#EAF2ED] border border-[#C5DED0] flex items-center justify-center shrink-0 text-[#3E6D59]">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-bold text-[#3E6D59]">
                Lễ Đính Hôn (Đám Hỏi)
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#EAF2ED] text-[#3E6D59] font-semibold">
                30/05/2023
              </span>
            </div>
            <p className="text-xl sm:text-2xl font-serif-cormorant font-bold text-[#231D1B] mt-1">
              Đính ước trăm năm kết tóc
            </p>
            <p className="text-xs text-[#7A6E65] mt-1 leading-relaxed">
              Mâm quả cau trầu truyền thống, ngày hai họ đón nhận dâu hiền rể thảo.
            </p>
          </div>
        </div>
      </div>

      {/* Couple Royal Biography Cards */}
      <div className="mt-6 bg-[#FAF6F0] rounded-2xl p-6 border border-[#E5DAD0] grid grid-cols-1 sm:grid-cols-2 gap-5 shadow-2xs">
        {/* Groom Profile */}
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#233D4D] text-[#FAF2DC] border border-[#D4AF37]/50 flex items-center justify-center font-serif-cormorant font-bold text-xl shrink-0 shadow-xs">
            ĐT
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-serif-cormorant font-bold text-base text-[#231D1B]">{coupleData.husband.fullName}</h4>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#E5ECF2] text-[#2C485E] font-medium">
                {coupleData.husband.birthDate}
              </span>
            </div>
            <p className="text-xs text-[#6E6359] mt-1 leading-relaxed">
              Cung mệnh: <strong>{coupleData.husband.zodiac}</strong> — {coupleData.husband.description}
            </p>
          </div>
        </div>

        {/* Bride Profile */}
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#8C1D2F] text-[#FAF2DC] border border-[#D4AF37]/50 flex items-center justify-center font-serif-cormorant font-bold text-xl shrink-0 shadow-xs">
            NY
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-serif-cormorant font-bold text-base text-[#231D1B]">{coupleData.wife.fullName}</h4>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#FCECEE] text-[#8C1D2F] font-medium">
                {coupleData.wife.birthDate}
              </span>
            </div>
            <p className="text-xs text-[#6E6359] mt-1 leading-relaxed">
              Cung mệnh: <strong>{coupleData.wife.zodiac}</strong> — {coupleData.wife.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
