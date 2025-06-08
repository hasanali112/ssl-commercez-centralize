import { startSession } from "mongoose";
import { PaymentHistory } from "../PaymentHistory/paymentHistory.model";
import { SSLService } from "../SSL/paymentInitiate";
import { Store } from "../Store/store.model";
import { InitiatePayment } from "./payment.interface";

const initPayment = async (payload: InitiatePayment) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const findStore = await Store.findOne({ storeId: payload.storeId });

    if (!findStore) {
      throw new Error("Store not found");
    }

    const paymentData = {
      transactionId: payload.transactionId,
      storeId: findStore.storeId,
      margeAllName: payload.margeAllName,
      customerId: payload.findOrder.customerId,
      customerName: payload.findOrder.customerName,
      contactNumber: payload.findOrder.contactNumber,
      orderNumber: payload.findOrder.orderNumber,
      email: payload.findOrder.email,
      city: payload.findOrder.city,
      address: payload.findOrder.address,
      orderItems: payload.findOrder.orderItems,
      paymentMethod: payload.findOrder.paymentMethod,
      shippingPrice: payload.findOrder.shippingPrice,
      totalPrice: payload.findOrder.totalPrice,
      paymentStatus: payload.findOrder.paymentStatus,
      isPaid: payload.findOrder.isPaid,
      orderStatus: payload.findOrder.orderStatus,
    };

    await PaymentHistory.create([paymentData], { session });

    const paymentInt = await SSLService.initiatePayment(findStore, payload);

    await session.commitTransaction();
    session.endSession();

    return paymentInt.GatewayPageURL;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const validatePayment = async (payload: any) => {
  if (!payload || !payload.status || !(payload.status === "VALID")) {
    return {
      message: "Invalid Payment",
    };
  }

  const res = await SSLService.validatedPayment(payload);

  console.log(res);
  if (res?.status !== "VALID") {
    return {
      message: "Payment failed",
    };
  }

  //update status
  // await Order.findOneAndUpdate(
  //   { transactionId: res?.tran_id },
  //   {
  //     paymentStatus: 'PAID',
  //     paymentTransactionId: res?.bank_tran_id,
  //     paymentInfo: res,
  //   },
  //   { new: true }
  // )

  return {
    message: "Payment success",
  };
};

export const PaymentService = {
  initPayment,
  validatePayment,
};
