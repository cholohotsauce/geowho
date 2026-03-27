export interface AttributeConfig {
  key: string;
  label: string;
  icon: any;
  color: string;
  type: 'string' | 'boolean';
  questionFormat: (value: any) => string;
  valueFormat?: (value: any) => string;
}

export interface GameCard {
  id: string;
  name: string;
  subtitle: string;
  attributes: Record<string, string | boolean>;
}

export interface Deck {
  id: string;
  name: string;
  description: string;
  icon: any;
  attributeConfigs: AttributeConfig[];
  cards: GameCard[];
}

export interface Question {
  id: string;
  text: string;
  attribute: string;
  value: any;
}

export interface AskedQuestion {
  question: Question;
  answer: boolean;
}

export interface GameStats {
  gamesPlayed: number;
  wins: number;
  losses: number;
}
