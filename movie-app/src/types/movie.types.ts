export interface Movie {
  id: number;
  title: string;
  description: string;
  releaseYear: number;
  durationMinutes: number;
  thumbnail: string;
  views: number;
  categories: string[];
}
