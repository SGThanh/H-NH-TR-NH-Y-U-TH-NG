import React, { useState, useEffect } from 'react';
import { initialMilestones, initialLoveLetter } from './data/timelineData';
import { LoveLetterData } from './types';
import { PetalBackground } from './components/PetalBackground';
import { HeaderNav } from './components/HeaderNav';
import { HeroSection } from './components/HeroSection';
import { LoveCounter } from './components/LoveCounter';
import { InteractiveSlideShow } from './components/InteractiveSlideShow';
import { TimelineRoadmap } from './components/TimelineRoadmap';
import { SurpriseLoveLetter } from './components/SurpriseLoveLetter';
import { PhotoLightbox } from './components/PhotoLightbox';
import { AudioPlayer } from './components/AudioPlayer';
import { Footer } from './components/Footer';
import { RoyalNhatBinhShowcase } from './components/RoyalNhatBinhShowcase';
import { JourneyTimelineChart } from './components/JourneyTimelineChart';
import { EmotionalJourney } from './components/EmotionalJourney';
import { TimelinePhotoManagerModal } from './components/TimelinePhotoManagerModal';
import { GitHubDeployModal } from './components/GitHubDeployModal';
import { Github } from 'lucide-react';

const STORAGE_KEY_IMAGES = 'danthanh_ngocyen_custom_images_v3';
const STORAGE_KEY_LETTER = 'danthanh_ngocyen_love_letter_v2';

export default function App() {
  const [petalsEnabled, setPetalsEnabled] = useState(true);
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);

  // Custom photos saved by the couple
  const [customImages, setCustomImages] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_IMAGES);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Love letter data
  const [letterData, setLetterData] = useState<LoveLetterData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LETTER);
      return saved ? JSON.parse(saved) : initialLoveLetter;
    } catch {
      return initialLoveLetter;
    }
  });

  // Lightbox modal state
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    imageUrl: string | null;
    title: string;
    subtitle: string;
  }>({
    isOpen: false,
    imageUrl: null,
    title: '',
    subtitle: '',
  });

  // Photo manager modal state
  const [photoManager, setPhotoManager] = useState<{
    isOpen: boolean;
    selectedMilestoneId?: string | null;
  }>({
    isOpen: false,
    selectedMilestoneId: null,
  });

  // Persist custom photos
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_IMAGES, JSON.stringify(customImages));
    } catch {
      // LocalStorage quota error guard
    }
  }, [customImages]);

  // Persist letter
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LETTER, JSON.stringify(letterData));
    } catch {
      // LocalStorage error guard
    }
  }, [letterData]);

  const handleUpdateCustomImage = (milestoneId: string, dataUrl: string) => {
    setCustomImages((prev) => ({
      ...prev,
      [milestoneId]: dataUrl,
    }));
  };

  const handleResetImage = (milestoneId: string) => {
    setCustomImages((prev) => {
      const next = { ...prev };
      delete next[milestoneId];
      return next;
    });
  };

  const handleResetAllCustomData = () => {
    if (window.confirm('Bạn có chắc muốn khôi phục lại toàn bộ ảnh mẫu ban đầu không?')) {
      setCustomImages({});
      localStorage.removeItem(STORAGE_KEY_IMAGES);
    }
  };

  const handleSaveLetter = (data: LoveLetterData) => {
    setLetterData(data);
  };

  const handleResetLetter = () => {
    if (window.confirm('Khôi phục lại nội dung thư tình ban đầu của Đan Thanh?')) {
      setLetterData(initialLoveLetter);
      localStorage.removeItem(STORAGE_KEY_LETTER);
    }
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenLightbox = (imageUrl: string, title: string, subtitle: string) => {
    setLightbox({
      isOpen: true,
      imageUrl,
      title,
      subtitle,
    });
  };

  const handleCloseLightbox = () => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
  };

  const handleOpenPhotoManager = (milestoneId?: string) => {
    setPhotoManager({
      isOpen: true,
      selectedMilestoneId: milestoneId || null,
    });
  };

  const handleClosePhotoManager = () => {
    setPhotoManager({
      isOpen: false,
      selectedMilestoneId: null,
    });
  };

  const handleOpenSurprise = () => {
    setIsSurpriseOpen(true);
    handleScrollTo('surprise-letter-section');
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#231D1B] relative selection:bg-[#FAF0DC] selection:text-[#8C1D2F] overflow-x-hidden">
      {/* Falling gentle pastel petals */}
      <PetalBackground enabled={petalsEnabled} />

      {/* Romantic Audio Player */}
      <AudioPlayer />

      {/* Top Navigation */}
      <HeaderNav
        petalsEnabled={petalsEnabled}
        onTogglePetals={() => setPetalsEnabled(!petalsEnabled)}
        onScrollTo={handleScrollTo}
        onOpenPhotoManager={() => handleOpenPhotoManager()}
        onOpenGitHubModal={() => setIsGitHubModalOpen(true)}
      />

      {/* Hero Header */}
      <HeroSection
        milestones={initialMilestones}
        customImages={customImages}
        onOpenPhotoManager={handleOpenPhotoManager}
        onStartJourney={() => handleScrollTo('interactive-slideshow')}
        onOpenSurprise={handleOpenSurprise}
        onOpenLightbox={handleOpenLightbox}
        onSelectMilestone={(index) => {
          setActiveSlideIndex(index);
          handleScrollTo('interactive-slideshow');
        }}
        onScrollToRoyal={() => handleScrollTo('royal-nhat-binh-section')}
        onScrollToEmotion={() => handleScrollTo('emotional-journey-section')}
        onScrollToChart={() => handleScrollTo('journey-timeline-chart-section')}
      />

      {/* Live Love & Wedding Counter */}
      <LoveCounter />

      {/* Royal Court Nhat Binh Wedding Showcase */}
      <RoyalNhatBinhShowcase
        customImages={customImages}
        onOpenPhotoManager={handleOpenPhotoManager}
        onOpenLightbox={handleOpenLightbox}
        onScrollToTimeline={() => handleScrollTo('timeline-roadmap-section')}
      />

      {/* Emotional Companion Journey Section */}
      <EmotionalJourney
        milestones={initialMilestones}
        customImages={customImages}
        onOpenPhotoManager={handleOpenPhotoManager}
        onSelectMilestone={(milestone) => {
          const index = initialMilestones.findIndex((m) => m.id === milestone.id);
          if (index !== -1) {
            setActiveSlideIndex(index);
            handleScrollTo('interactive-slideshow');
          }
        }}
        onOpenLightbox={handleOpenLightbox}
      />

      {/* Companion Journey Timeline Chart */}
      <JourneyTimelineChart
        milestones={initialMilestones}
        customImages={customImages}
        onOpenPhotoManager={handleOpenPhotoManager}
        onSelectMilestone={(index) => {
          setActiveSlideIndex(index);
          handleScrollTo('interactive-slideshow');
        }}
        onOpenLightbox={handleOpenLightbox}
      />

      {/* Interactive Milestone Slideshow */}
      <InteractiveSlideShow
        milestones={initialMilestones}
        customImages={customImages}
        currentIndex={activeSlideIndex}
        onIndexChange={setActiveSlideIndex}
        onUpdateCustomImage={handleUpdateCustomImage}
        onResetImage={handleResetImage}
        onOpenLightbox={handleOpenLightbox}
        onOpenPhotoManager={handleOpenPhotoManager}
      />

      {/* Visual Roadmap & Timeline Cards */}
      <TimelineRoadmap
        milestones={initialMilestones}
        customImages={customImages}
        onSelectMilestone={(index) => {
          setActiveSlideIndex(index);
        }}
        onOpenSurprise={handleOpenSurprise}
        onOpenLightbox={handleOpenLightbox}
        onUpdateCustomImage={handleUpdateCustomImage}
        onOpenPhotoManager={handleOpenPhotoManager}
      />

      {/* Surprise Love Letter */}
      <SurpriseLoveLetter
        isOpen={isSurpriseOpen}
        onToggle={() => setIsSurpriseOpen(!isSurpriseOpen)}
        letterData={letterData}
        onSaveLetter={handleSaveLetter}
        onResetLetter={handleResetLetter}
      />

      {/* Footer */}
      <Footer
        onResetAllCustomData={handleResetAllCustomData}
        hasCustomData={Object.keys(customImages).length > 0}
        onOpenGitHubModal={() => setIsGitHubModalOpen(true)}
      />

      {/* Photo Lightbox */}
      <PhotoLightbox
        isOpen={lightbox.isOpen}
        imageUrl={lightbox.imageUrl}
        title={lightbox.title}
        subtitle={lightbox.subtitle}
        onClose={handleCloseLightbox}
        onOpenPhotoManager={() => handleOpenPhotoManager()}
      />

      {/* Timeline Photo Manager & Swapping Tool */}
      <TimelinePhotoManagerModal
        isOpen={photoManager.isOpen}
        onClose={handleClosePhotoManager}
        milestones={initialMilestones}
        customImages={customImages}
        onUpdateCustomImage={handleUpdateCustomImage}
        onResetImage={handleResetImage}
        onResetAllImages={handleResetAllCustomData}
        initialSelectedMilestoneId={photoManager.selectedMilestoneId}
        onOpenGitHubModal={() => setIsGitHubModalOpen(true)}
      />

      {/* GitHub Export & Deployment Modal */}
      <GitHubDeployModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
        customImages={customImages}
        letterData={letterData}
        onImportBackup={(data) => {
          if (data.customImages) setCustomImages(data.customImages);
          if (data.letterData) setLetterData(data.letterData);
        }}
      />

      {/* Discreet floating shortcut for GitHub Export */}
      <button
        onClick={() => setIsGitHubModalOpen(true)}
        className="fixed bottom-5 left-5 z-40 bg-[#241E1C]/90 hover:bg-[#241E1C] text-[#FAF4EA] px-3.5 py-2 rounded-full shadow-lg border border-[#D4AF37]/50 backdrop-blur-sm text-xs font-semibold flex items-center gap-2 group transition-all hover:scale-105 active:scale-95"
        title="Xuất dự án và chạy trên GitHub Pages"
      >
        <Github className="w-4 h-4 text-[#FFD700] group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline">Xuất GitHub &amp; Sao lưu</span>
        <span className="sm:hidden">GitHub</span>
      </button>
    </div>
  );
}
