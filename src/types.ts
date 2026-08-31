export type ExplorerMode = 'explore' | 'compass' | 'cards' | 'realworld' | 'quiz';

export type QuizLevelMode = 'standard' | 'challenge';

export type AppLanguage = 'ar' | 'en' | 'bilingual';

export interface CircleElementState {
  showCenter: boolean;
  showRadius: boolean;
  showDiameter: boolean;
  showChord: boolean;
  showDisc: boolean;
  showRuler: boolean;
}

export interface ConceptData {
  id: string;
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  color: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
  badgeColor: string;
  definition: string;
  definitionEn: string;
  keyPoints: string[];
  keyPointsEn: string[];
  funFact: string;
  funFactEn: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  questionEn?: string;
  imageType: 'center' | 'radius' | 'diameter' | 'chord' | 'disc_vs_circle' | 'radius_calc' | 'diameter_calc' | 'wheel';
  radiusVal?: number; // e.g. 3 cm
  options: string[];
  optionsEn?: string[];
  correctIndex: number;
  explanation: string;
  explanationEn?: string;
  hint: string;
  hintEn?: string;
}

export interface ChallengePuzzle {
  id: number;
  title: string;
  titleEn?: string;
  category: string;
  categoryEn?: string;
  story: string;
  storyEn?: string;
  question: string;
  questionEn?: string;
  visualType:
    | 'touching_circles'
    | 'circle_in_square'
    | 'concentric_circles'
    | 'wheel_comparison'
    | 'chord_as_diameter'
    | 'clock_diameter'
    | 'compass_opening'
    | 'tree_cross_section'
    | 'two_circles_in_rectangle'
    | 'semi_circle_diameter'
    | 'fan_blades_circle'
    | 'pizza_slice_sector';
  interactiveLabel: string;
  interactiveLabelEn?: string;
  interactiveData: {
    radius1?: number;
    radius2?: number;
    diameter1?: number;
    diameter2?: number;
    squareSide?: number;
    chordLength?: number;
    compassGap?: number;
    rectLength?: number;
    rectWidth?: number;
    bladeLength?: number;
  };
  options: string[];
  optionsEn?: string[];
  correctIndex: number;
  explanation: string;
  explanationEn?: string;
  hint: string;
  hintEn?: string;
}

export interface EverydayItem {
  id: string;
  title: string;
  titleEn: string;
  category: string;
  categoryEn: string;
  description: string;
  descriptionEn: string;
  circleRole: string;
  circleRoleEn: string;
  centerRole: string;
  centerRoleEn: string;
  radiusRole: string;
  radiusRoleEn: string;
  iconName: string;
  color: string;
}


