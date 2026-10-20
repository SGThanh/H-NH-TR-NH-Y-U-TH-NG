import React, { useEffect } from 'react';
import { X, Calendar, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PhotoLightboxProps {
  isOpen: boolean;
  imageUrl: string | null;
  title: string;
  subtitle: string;
  onClose: () => void;
  onOpenPhotoManager?: () => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  isOpen,
  imageUrl,
  title,
  subtitle,
  onClose,
  onOpenPhotoManager,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !imageUrl) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          title="Đóng (Esc)"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content Box */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="max-w-5xl max-h-[90vh] flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-black border-2 border-[#D4AF37]/50">
            <img
              src={imageUrl}
              alt={title}
              referrerPolicy="no-referrer"
              className="max-h-[75vh] w-auto object-contain mx-auto"
            />
          </div>

          <div className="mt-4 text-center text-white">
            <h4 className="text-xl sm:text-2xl font-serif-cormorant font-bold text-[#FAF2DC] tracking-wide">{title}</h4>
            <div className="flex items-center justify-center gap-1.5 text-xs text-[#D4AF37] mt-1 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              <span>{subtitle}</span>
            </div>

            {onOpenPhotoManager && (
              <div className="mt-3 flex justify-center">
                <button
                  onClick={() => {
                    onClose();
                    onOpenPhotoManager();
                  }}
                  className="px-4 py-1.5 rounded-full bg-[#852233] hover:bg-[#A32D42] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md border border-[#D4AF37]/50"
                >
                  <Camera className="w-3.5 h-3.5 text-[#FFD700]" />
                  <span>Chỉnh sửa / Đổi ảnh này</span>
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
