export type ScreenType =
  | 'screen_1'
  | 'screen_2'
  | 'screen_3'
  | 'screen_4'
  | 'screen_5'
  | 'screen_6'
  | 'screen_7'
  | 'screen_8'
  | 'screen_9_cards'
  | 'screen_10_playful'
  | 'screen_11'
  | 'screen_12_final_answer'
  | 'screen_exact_moment'
  | 'screen_final';

export interface NarrativeScreen {
  id: number;
  badge: string;
  category?: string;
  heading: string;
  text: string;
  highlightText?: string;
  subtext?: string;
  buttonText: string;
  hasPauseAnimation?: boolean;
  signature?: string;
  illustrationUrl?: string;
  illustrationCaption?: string;
}

export interface MatterCard {
  id: number;
  question: string;
  supporting: string;
  options: [string, string];
  hasButterfly?: boolean;
  doodleType?: 'chat' | 'memory' | 'heart' | 'star' | 'butterfly';
  illustrationUrl?: string;
  illustrationCaption?: string;
}

export type AnswersMap = Record<number, string>;

