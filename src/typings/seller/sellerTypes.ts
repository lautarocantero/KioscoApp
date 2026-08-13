import type { SellerRol, SellerStatus } from './sellerEnums';

export interface Seller {
  _id: string;
  name: string;
  email: string;
  password: string;
  rol: SellerRol;
  created_at: string;
  user_status: SellerStatus;
  __v?: number;
}

export interface SellerSliceState {
  sellers: Seller[];
  isLoading: boolean;
  errorMessage: string | null;
}

export type CreateSellerPayload = Omit<Seller, '_id' | '__v'>;
export type EditSellerPayload = Omit<Seller, '__v'>;

export interface DeleteSellerPayload {
  _id: string;
}
