import config from "../../config";
import axios from "axios";
import { AppError } from "../../Error/AppError";
import httpStatus from "http-status";
import { InitiatePayment } from "../Payment/payment.interface";

const initiatePayment = async (findStore: any, payload: InitiatePayment) => {
  try {
    const data = {
      store_id: config.ssl.store_id,
      store_passwd: config.ssl.store_pass,
      total_amount: payload?.findOrder?.totalPrice,
      currency: "BDT",
      tran_id: payload?.transactionId, // use unique tran_id for each api call
      success_url: `${config.ssl.success_url}/comfirmation/success?transactionId=${payload?.transactionId}&amount=${payload?.findOrder?.totalPrice}`,
      fail_url: `${config.ssl.fail_url}/comfirmation/fail?transactionId=${payload?.transactionId}&amount=${payload?.findOrder?.totalPrice}`,
      cancel_url: `${findStore?.storeFrontendUrl}`,
      ipn_url: "https://centralize-paymentgetway.vercel.app/payment/ipn",
      shipping_method: "Courier",
      product_name: payload?.margeAllName,
      product_category: payload?.findOrder?.orderItems[0]?.category,
      product_profile: "general",
      cus_name: payload?.findOrder?.customerName,
      cus_email: payload?.findOrder?.email,
      cus_add1: payload?.findOrder?.address,
      cus_add2: payload?.findOrder?.address,
      cus_city: payload?.findOrder?.city,
      cus_state: payload?.findOrder?.city,
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: payload?.findOrder?.contactNumber,
      cus_fax: "01711111111",
      ship_name: payload?.findOrder?.customerName,
      ship_add1: payload?.findOrder?.address,
      ship_add2: payload?.findOrder?.address,
      ship_city: payload?.findOrder?.city,
      ship_state: payload?.findOrder?.city,
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };

    const response = await axios({
      method: "post",
      url: config.ssl.ssl_payment_api,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data;
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, "Payment initiate failed");
  }
};

const validatedPayment = async (payload: any) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${config.ssl.ssl_validation_api}?val_id=${payload.val_id}&store_id=${config.ssl.store_id}&store_passwd=${config.ssl.store_pass}&format=json`,
    });

    console.log(res.data, "payment data 3");

    return res.data;
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, "Payment validation failed");
  }
};

export const SSLService = {
  initiatePayment,
  validatedPayment,
};
