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
