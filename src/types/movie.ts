export interface Movie {
  id: number;
  title: string;
  year: number;
  overview: string;
  poster: string;
  backdrop: string;
  genres: string[];
  rating: {
    imdb: number;
    tmdb: number;
  };
  runtime: number;
  popularity: number;
  releaseDate: string;
  tagline?: string;
  director?: string;
  budget?: number;
  revenue?: number;
  language: string;
  status: 'Released' | 'Upcoming' | 'In Production';
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  photo: string;
}

export interface CrewMember {
  id: number;
  name: string;
  role: string;
  photo: string;
}

export interface MovieCredits {
  cast: CastMember[];
  crew: CrewMember[];
}

export type MovieCategory = 'trending' | 'popular' | 'topRated' | 'upcoming';