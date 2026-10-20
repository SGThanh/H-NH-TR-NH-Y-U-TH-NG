export interface TimelineMilestone {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  date: string;
  rawDate: string;
  category: 'meet' | 'travel' | 'family' | 'engagement' | 'business' | 'wedding' | 'anniversary' | 'education' | 'lifestyle';
  tag: string;
  description: string;
  quote: string;
  defaultImage: string;
  customImage?: string;
  location: string;
  highlights: string[];
  romanticDetails: string;
  emotionId?: 'spark' | 'passion' | 'warmth' | 'perseverance' | 'simplicity' | 'sacred' | 'pride' | 'eternity';
}

export type EmotionId = 
  | 'spark'
  | 'passion'
  | 'warmth'
  | 'perseverance'
  | 'simplicity'
  | 'sacred'
  | 'pride'
  | 'eternity';

export interface EmotionStage {
  id: EmotionId;
  order: number;
  name: string;
  subtitle: string;
  themeColor: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  tagline: string;
  emotionalTone: string;
  narrative: string;
  companionLesson: string;
  husbandReflection: string;
  wifeReflection: string;
  associatedMilestoneIds: string[];
  intimacyScore: number;
  keepsake: {
    title: string;
    description: string;
    symbol: string;
  };
}

export interface CoupleProfile {
  husband: {
    fullName: string;
    shortName: string;
    birthDate: string;
    rawBirth: string;
    zodiac: string;
    description: string;
  };
  wife: {
    fullName: string;
    shortName: string;
    birthDate: string;
    rawBirth: string;
    zodiac: string;
    description: string;
  };
}

export interface LoveLetterData {
  title: string;
  sender: string;
  receiver: string;
  paragraphs: string[];
  signature: string;
  postscript?: string;
  dateStr: string;
}
