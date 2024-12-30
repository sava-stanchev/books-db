export interface User {
  id: number;
  username: string;
  is_admin: number;
  iat: number; // Issued at time
  exp: number; // Expiration time
}
