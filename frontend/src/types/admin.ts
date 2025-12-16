export interface AdminState {
  usersCount: number;
  productsCount: number;
  cartCount: number;
  revenue: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
}
