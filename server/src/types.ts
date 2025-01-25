export interface TokenPayload {
  id: number;
  username: string;
  is_admin: number;
}

export interface User {
  id?: number;
  username: string;
  password: string;
  email: string;
  is_admin?: number;
  is_deleted?: number;
}

export interface Book {
  id: number;
  cover: string;
  title: string;
  author: string;
  description: string | null;
  genre: number;
  year: number;
  language: number;
  avg_rating: number;
  num_ratings: number;
  is_deleted: number;
}
