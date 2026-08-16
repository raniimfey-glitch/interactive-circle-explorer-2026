export type ExplorerMode = 'explore' | 'compass' | 'cards' | 'realworld' | 'quiz';

export type QuizLevelMode = 'standard' | 'challenge';

export interface CircleElementState {
  showCenter: boolean;
  showRadius: boolean;
  showDiameter: boolean;
  showChord: boolean;
  showDisc: boolean;
  showRuler: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  imageType: 'center' | 'radius' | 'diameter' | 'chord' | 'disc_vs_circle' | 'radius_calc' | 'diameter_calc' | 'wheel';
  radiusVal?: number; // e.g. 3 cm
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
}

export interface ChallengePuzzle {
  id: number;
  title: string;
  category: string;
  story: string;
  question: string;
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
  correctIndex: number;
  explanation: string;
  hint: string;
}

export interface EverydayItem {
  id: string;
  title: string;
  category: string;
  description: string;
  circleRole: string;
  centerRole: string;
  radiusRole: string;
  iconName: string;
  color: string;
}

