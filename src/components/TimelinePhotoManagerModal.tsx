import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  RotateCcw, 
  Check, 
  ArrowLeftRight, 
  Search, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Camera, 
  Link as LinkIcon,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Github
} from 'lucide-react';
import { TimelineMilestone } from '../types';
import { builtInGalleryAssets, GalleryAsset } from '../data/galleryAssets';

interface TimelinePhotoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  milestones: TimelineMilestone[];
  customImages: Record<string, string>;
  onUpdateCustomImage: (milestoneId: string, dataUrl: string) => void;
  onResetImage: (milestoneId: string) => void;
  onResetAllImages: () => void;
  initialSelectedMilestoneId?: string | null;
  onOpenGitHubModal?: () => void;
}

export const TimelinePhotoManagerModal: React.FC<TimelinePhotoManagerModalProps> = ({
  isOpen,
  onClose,
  milestones,
  customImages,
  onUpdateCustomImage,
  onResetImage,
  onResetAllImages,
  initialSelectedMilestoneId,
  onOpenGitHubModal,
}) => {
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>(
    initialSelectedMilestoneId || milestones[0]?.id || 'meet'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [showAssetPicker, setShowAssetPicker] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'info' } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync selected milestone if prop changes
  React.useEffect(() => {
    if (initialSelectedMilestoneId) {
      setSelectedMilestoneId(initialSelectedMilestoneId);
    }
  }, [initialSelectedMilestoneId]);

  if (!isOpen) return null;

  const currentMilestone = milestones.find((m) => m.id === selectedMilestoneId) || milestones[0];
  const activeImage = customImages[currentMilestone.id] || currentMilestone.defaultImage;
  const isCustomized = Boolean(customImages[currentMilestone.id]);

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          onUpdateCustomImage(currentMilestone.id, result);
          showToast(`Đã cập nhật ảnh riêng cho mốc: ${currentMilestone.title}`);
        }
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSelectAsset = (asset: GalleryAsset) => {
    onUpdateCustomImage(currentMilestone.id, asset.src);
    setShowAssetPicker(false);
    showToast(`Đã áp dụng ảnh "${asset.name}" cho mốc "${currentMilestone.title}"`);
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onUpdateCustomImage(currentMilestone.id, urlInput.trim());
      setUrlInput('');
      showToast(`Đã cập nhật liên kết ảnh mới thành công!`);
    }
  };

  const handleSwapWith = (targetId: string) => {
    if (targetId === currentMilestone.id) return;
    const targetMilestone = milestones.find((m) => m.id === targetId);
    if (!targetMilestone) return;

    const currentImg = customImages[currentMilestone.id] || currentMilestone.defaultImage;
    const targetImg = customImages[targetId] || targetMilestone.defaultImage;

    onUpdateCustomImage(currentMilestone.id, targetImg);
    onUpdateCustomImage(targetId, currentImg);
    showToast(`Đã hoán đổi ảnh giữa "${currentMilestone.title}" và "${targetMilestone.title}"`);
  };

  const filteredMilestones = milestones.filter((m) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      m.title.toLowerCase().includes(q) ||
      m.tag.toLowerCase().includes(q) ||
      m.date.toLowerCase().includes(q) ||
      String(m.order).includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#E8DFD5] flex flex-col overflow-hidden">
        {/* Modal Top Header */}
        <div className="px-5 sm:px-8 py-4 sm:py-5 border-b border-[#ECE3D8] bg-white/70 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#852233] text-[#FFD700] flex items-center justify-center shadow-xs">
              <Camera className="w-5 h-5 text-[#FAF4EA]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-serif-cormorant font-bold text-[#2A2321]">
                  Công Cụ Chỉnh Sửa &amp; Đổi Ảnh Dòng Thời Gian
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#852233]/10 text-[#852233]">
                  14 Mốc Kỷ Niệm
                </span>
              </div>
              <p className="text-xs text-[#7A7067]">
                Tự do thay thế, sửa ảnh nhầm lẫn, chọn ảnh đúng từ thư viện hoặc tải ảnh thật của hai vợ chồng
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenGitHubModal && (
              <button
                onClick={onOpenGitHubModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#241E1C] hover:bg-[#382E2B] text-[#FAF4EA] transition-all shadow-2xs border border-[#D4AF37]/50"
                title="Xuất dự án và chạy trên GitHub Pages"
              >
                <Github className="w-3.5 h-3.5 text-[#FFD700]" />
                <span>Xuất GitHub</span>
              </button>
            )}
            <button
              onClick={onResetAllImages}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-[#7A7067] hover:text-[#852233] hover:bg-black/5 transition-colors border border-[#E0D5C7]"
              title="Khôi phục toàn bộ 14 mốc về ảnh mẫu ban đầu"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Khôi phục tất cả</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/5 text-[#7A7067] hover:text-[#2A2321] transition-colors"
              aria-label="Đóng cửa sổ"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status Toast Notification */}
        {statusMessage && (
          <div className="bg-[#852233] text-white px-6 py-2 text-xs flex items-center justify-between gap-2 shadow-xs transition-all">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#FFD700]" />
              <span>{statusMessage.text}</span>
            </div>
            <button onClick={() => setStatusMessage(null)} className="text-white/80 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Main Body: Two Columns */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Milestone List (5 cols) */}
          <div className="lg:col-span-5 border-r border-[#ECE3D8] flex flex-col h-full bg-[#F5EFE6]/30 overflow-hidden">
            {/* Search filter */}
            <div className="p-3 sm:p-4 border-b border-[#ECE3D8] bg-white/40">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9E9388]" />
                <input
                  type="text"
                  placeholder="Tìm kiếm mốc kỷ niệm (số thứ tự, tên, ngày)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-[#E0D5C7] focus:outline-none focus:ring-2 focus:ring-[#852233]/20 focus:border-[#852233]"
                />
              </div>
            </div>

            {/* Scrollable Milestone List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {filteredMilestones.map((m) => {
                const isSelected = m.id === selectedMilestoneId;
                const img = customImages[m.id] || m.defaultImage;
                const isCustom = Boolean(customImages[m.id]);

                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      setSelectedMilestoneId(m.id);
                      setShowAssetPicker(false);
                    }}
                    className={`w-full p-2.5 rounded-2xl text-left flex items-center gap-3 transition-all border ${
                      isSelected
                        ? 'bg-white border-[#852233] shadow-md ring-1 ring-[#852233]/20'
                        : 'bg-white/70 hover:bg-white border-[#EBE3D7] hover:border-[#D8CCC0]'
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#E2D8CC] flex-shrink-0 relative">
                      <img
                        src={img}
                        alt={m.title}
                        className="w-full h-full object-cover"
                      />
                      {isCustom && (
                        <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-[#852233] ring-1 ring-white" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-[#852233]/10 text-[#852233]">
                          #{String(m.order).padStart(2, '0')}
                        </span>
                        <span className="text-[11px] text-[#7A7067] truncate">{m.date}</span>
                      </div>
                      <h4 className="text-xs font-semibold text-[#2A2321] truncate font-serif-cormorant sm:text-sm">
                        {m.title}
                      </h4>
                      <p className="text-[11px] text-[#8C8075] truncate mt-0.5">{m.location}</p>
                    </div>

                    {isCustom && (
                      <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-[#FAF0F2] text-[#852233] border border-[#E8C2CA] flex-shrink-0">
                        Đã chỉnh
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Editor Workspace for Selected Milestone (7 cols) */}
          <div className="lg:col-span-7 flex flex-col h-full overflow-y-auto p-4 sm:p-6 bg-white">
            {/* Selected Milestone Header */}
            <div className="flex items-start justify-between gap-3 pb-4 border-b border-[#ECE3D8]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#852233] text-[#FAF4EA]">
                    Cột Mốc #{String(currentMilestone.order).padStart(2, '0')}
                  </span>
                  <span className="text-xs font-medium text-[#7A7067] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#B35467]" />
                    {currentMilestone.date}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-serif-cormorant text-[#2A2321]">
                  {currentMilestone.title}
                </h3>
                <p className="text-xs text-[#7A7067] italic mt-0.5">{currentMilestone.subtitle}</p>
                <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#852233] font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-[#B35467]" />
                  <span>{currentMilestone.location}</span>
                </div>
              </div>

              {isCustomized ? (
                <button
                  onClick={() => {
                    onResetImage(currentMilestone.id);
                    showToast(`Đã khôi phục ảnh mặc định cho mốc này`);
                  }}
                  className="px-3 py-1.5 rounded-full text-xs text-[#852233] bg-[#FAF0F2] hover:bg-[#F8E2E6] transition-colors flex items-center gap-1 border border-[#E8C2CA]"
                  title="Khôi phục ảnh mẫu gốc"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ảnh mặc định</span>
                </button>
              ) : (
                <span className="text-xs text-[#8C8075] px-2.5 py-1 rounded-full bg-[#F4EFEA]">
                  Ảnh mặc định
                </span>
              )}
            </div>

            {/* Current Active Photo Display with Actions */}
            <div className="mt-4">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-[#E8E1D7] border border-[#DFD5C7] shadow-inner group">
                <img
                  src={activeImage}
                  alt={currentMilestone.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-white bg-black/50 backdrop-blur-md">
                  <MapPin className="w-3.5 h-3.5 text-[#FFD700]" />
                  <span>{currentMilestone.location}</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="font-serif-cormorant italic text-sm text-white/90 truncate max-w-[70%]">
                    "{currentMilestone.quote}"
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-[10px]">
                    {isCustomized ? 'Ảnh người dùng' : 'Ảnh mẫu hệ thống'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Tools Bar */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Button: Upload From Device */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-3 rounded-2xl bg-[#852233] hover:bg-[#701A29] text-white flex items-center justify-center gap-2 font-medium text-xs shadow-sm transition-all"
              >
                <Upload className="w-4 h-4" />
                <span>Tải ảnh từ máy tính/điện thoại</span>
              </button>

              {/* Button: Choose from Library Asset */}
              <button
                onClick={() => setShowAssetPicker(!showAssetPicker)}
                className="p-3 rounded-2xl bg-[#FAF2E6] hover:bg-[#F5E8D4] text-[#852233] border border-[#E6D4BE] flex items-center justify-center gap-2 font-medium text-xs transition-all"
              >
                <ImageIcon className="w-4 h-4 text-[#C5A869]" />
                <span>{showAssetPicker ? 'Đóng kho ảnh mẫu' : 'Chọn ảnh đúng từ thư viện'}</span>
              </button>
            </div>

            {/* Swap With Another Milestone Feature */}
            <div className="mt-4 p-3 rounded-2xl bg-[#FAF8F5] border border-[#EAE2D7]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs text-[#524B43]">
                  <ArrowLeftRight className="w-3.5 h-3.5 text-[#852233]" />
                  <span className="font-semibold">Hoán đổi ảnh với mốc khác:</span>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        handleSwapWith(e.target.value);
                        e.target.value = '';
                      }
                    }}
                    defaultValue=""
                    className="text-xs bg-white border border-[#DCD1C4] rounded-xl px-3 py-1.5 text-[#2A2321] focus:outline-none focus:ring-1 focus:ring-[#852233]"
                  >
                    <option value="" disabled>
                      -- Chọn mốc để đổi ảnh chéo --
                    </option>
                    {milestones
                      .filter((m) => m.id !== currentMilestone.id)
                      .map((m) => (
                        <option key={m.id} value={m.id}>
                          #{String(m.order).padStart(2, '0')}: {m.title.substring(0, 35)}...
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Paste Image URL Accordion */}
            <form onSubmit={handleApplyUrl} className="mt-3 flex gap-2">
              <div className="relative flex-1">
                <LinkIcon className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#9E9388]" />
                <input
                  type="url"
                  placeholder="Hoặc dán liên kết ảnh trực tiếp (https://...)"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-white border border-[#DCD1C4] focus:outline-none focus:ring-1 focus:ring-[#852233]"
                />
              </div>
              <button
                type="submit"
                disabled={!urlInput.trim()}
                className="px-4 py-2 rounded-xl bg-[#2A2321] text-white text-xs font-medium hover:bg-black disabled:opacity-40 transition-colors"
              >
                Lưu URL
              </button>
            </form>

            {/* Built-in Asset Picker Gallery (Expanded) */}
            {showAssetPicker && (
              <div className="mt-5 p-4 rounded-2xl bg-[#FAF5EE] border border-[#E8DCB8] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#852233]" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#852233]">
                      Thư Viện Ảnh Chuẩn Theo Dòng Kỷ Niệm
                    </h4>
                  </div>
                  <span className="text-[11px] text-[#7A7067]">
                    Bấm vào ảnh bạn muốn gán cho mốc này
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-64 overflow-y-auto p-1">
                  {builtInGalleryAssets.map((asset) => {
                    const isRecommended = asset.recommendedForMilestoneId === currentMilestone.id;

                    return (
                      <div
                        key={asset.id}
                        onClick={() => handleSelectAsset(asset)}
                        className={`relative rounded-xl overflow-hidden aspect-[4/3] bg-white border cursor-pointer group/card transition-all hover:scale-[1.02] ${
                          isRecommended
                            ? 'border-[#852233] ring-2 ring-[#852233]/30 shadow-sm'
                            : 'border-[#E0D5C7] hover:border-[#852233]'
                        }`}
                      >
                        <img
                          src={asset.src}
                          alt={asset.name}
                          className="w-full h-full object-cover group-hover/card:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {isRecommended && (
                          <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-[#852233] text-[#FFD700] text-[9px] font-bold shadow-xs">
                            Khuyên dùng cho mốc này
                          </div>
                        )}

                        <div className="absolute bottom-1.5 left-1.5 right-1.5 text-white">
                          <p className="text-[11px] font-semibold leading-tight line-clamp-2">
                            {asset.name}
                          </p>
                          <span className="text-[9px] text-[#FAF0DC] block mt-0.5 truncate">
                            {asset.tag}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Instruction Tip */}
            <div className="mt-auto pt-4 text-[11px] text-[#8C8075] flex items-center gap-2 border-t border-[#F2ECE4]">
              <HelpCircle className="w-3.5 h-3.5 text-[#B35467] flex-shrink-0" />
              <span>
                Ảnh tùy chỉnh sẽ được lưu an toàn trên trình duyệt của bạn (LocalStorage) và tự động đồng bộ trên toàn bộ website (Slide, Dòng thời gian, Cung bậc cảm xúc).
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
