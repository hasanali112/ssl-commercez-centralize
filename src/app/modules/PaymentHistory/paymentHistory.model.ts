import { model, Schema } from "mongoose";
import { IOrderItem, IPaymentHistory } from "./paymentHistory.interface";

const OrderItemSchema = new Schema<IOrderItem>({
  productId: { type: String, required: true },
  productNumber: { type: String, required: true },
  vendor: { type: String, required: true },
  productName: { type: String, required: true },
  category: { type: String, required: true },
  payablePrice: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  savedPrice: { type: Number, required: true },
  variantDiscount: { type: Number, required: true },
  variant: { type: String, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
  productImage: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const PaymentHistorySchema = new Schema<IPaymentHistory>(
  {
    transactionId: { type: String, required: true },
    storeId: { type: String, required: true },
    margeAllName: { type: String, required: true },
    customerId: { type: String, required: true },
    customerName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    orderNumber: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    orderItems: [{ type: OrderItemSchema, required: true }], // Embedded schema
    paymentMethod: { type: String, required: true },
    shippingPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    paymentStatus: { type: String, required: true },
    isPaid: { type: Boolean, required: true },
    orderStatus: { type: String, required: true },
    paymentTransactionId: { type: String, required: false },
    paymentInfo: { type: Object, required: false },
  },
  { timestamps: true }
);

export const PaymentHistory = model<IPaymentHistory>(
  "PaymentHistory",
  PaymentHistorySchema
);
