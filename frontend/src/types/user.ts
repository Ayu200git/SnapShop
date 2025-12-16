export interface User {
  id?: number;
  username: string;
  email: string;
  password?: string;
  photo?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

