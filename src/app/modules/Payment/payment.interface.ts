export interface InitiatePayment {
  transactionId: string;
  storeId: string;
  margeAllName: string;
  findOrder: FindOrder;
}

export interface FindOrder {
  _id: string;
  customerId: string;
  customerName: string;
  contactNumber: string;
  orderNumber: string;
  email: string;
  city: string;
  address: string;
  orderItems: OrderItem[];
  transactionId: string;
  paymentMethod: string;
  shippingPrice: number;
  totalPrice: number;
  paymentStatus: string;
  isPaid: boolean;
  orderStatus: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface OrderItem {
  productId: string;
  productNumber: string;
  vendor: string;
  productName: string;
  category: string;
  payablePrice: number;
  originalPrice: number;
  savedPrice: number;
  variantDiscount: number;
  variant: string;
  size: string;
  color: string;
  productImage: string;
  quantity: number;
  _id: string;
}
