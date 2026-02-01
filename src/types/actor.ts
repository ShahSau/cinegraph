export interface Actor {
  id: string;
  name: string;
  profileImage: string;
  tagline: string;
  birthDate: string;
  birthPlace: string;
  biography: string[];
  knownFor: ActorCredit[];
  filmography: ActorCredit[];
  awards: Award[];
  trivia: string[];
  didYouKnow: DidYouKnowFact[];
  relationships: Relationship[];
}

export interface ActorCredit {
  id: string;
  title: string;
  poster: string;
  year: number;
  role: string;
  type: 'movie' | 'tv';
  rating?: number;
}

export interface Award {
  id: string;
  name: string;
  category: string;
  year: number;
  project: string;
  won: boolean;
}

export interface DidYouKnowFact {
  id: string;
  fact: string;
  icon: 'star' | 'film' | 'heart' | 'trophy' | 'sparkles';
}

export interface Relationship {
  id: string;
  name: string;
  type: 'spouse' | 'partner' | 'ex-spouse' | 'ex-partner';
  startYear: number;
  endYear?: number;
  description?: string;
}