export interface User {
  id: number;
  username: string;
  is_admin: number;
  iat: number; // Issued at time
  exp: number; // Expiration time
}

export interface Book {
  id: number;
  title: string;
  cover: string;
  author: string;
  avg_rating: number;
  description: string;
  genre: number;
  is_deleted: number;
  language: number;
  num_ratings: number;
  year: number;
}
