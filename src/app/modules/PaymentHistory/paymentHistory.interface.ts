export interface IOrderItem {
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

export interface IPaymentHistory {
  transactionId: string;
  storeId: string;
  margeAllName: string;
  customerId: string;
  customerName: string;
  contactNumber: string;
  orderNumber: string;
  email: string;
  city: string;
  address: string;
  orderItems: IOrderItem[];
  paymentMethod: string;
  shippingPrice: number;
  totalPrice: number;
  paymentStatus: string;
  isPaid: boolean;
  orderStatus: string;
  paymentTransactionId?: string;
  paymentInfo?: any;
}
