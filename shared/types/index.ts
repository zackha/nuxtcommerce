export type Money = string | number;

export interface VariationNode {
  databaseId: number;
  salePrice: Money;
  regularPrice: Money;
  stockQuantity?: number;
  image?: { sourceUrl: string };
}

export interface Variation {
  node: VariationNode;
  attributes: Array<{ value: string }>;
}

export interface ProductNode {
  sku: string;
  slug: string;
  name: string;
}

export interface CartItem {
  key: string;
  quantity: number;
  product: { node: ProductNode };
  variation: Variation;
}

export interface AddToCartResponse {
  addToCart: { cartItem: CartItem };
}

export type AddBtnStatus = 'add' | 'loading' | 'added';

export type RemoveBtnStatus = 'remove' | 'loading';

export interface WishlistItem {
  databaseId: number;
  name?: string;
  slug?: string;
  sku?: string;
  salePrice?: Money;
  regularPrice?: Money;
  image?: { sourceUrl: string };
  allPaStyle?: { nodes: Array<{ name: string }> };
  [key: string]: unknown;
}

export interface CheckoutUserDetails {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  address1: string;
}

export interface CheckoutOrder {
  total: string;
  orderNumber: string;
  date: string;
  paymentMethodTitle: string;
}

export interface CheckoutResponse {
  checkout?: {
    order?: CheckoutOrder;
  };
}

export type CheckoutStatus = 'order' | 'processing';
