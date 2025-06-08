import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StoreService } from "./store.service";
import httpStatus from "http-status";

const createStoreIntoDb = catchAsync(async (req, res) => {
  const result = await StoreService.createStore(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Store created successfully",
    data: result,
  });
});

const getStore = catchAsync(async (req, res) => {
  const result = await StoreService.getStore();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Store fetched successfully",
    data: result,
  });
});

const updateStore = catchAsync(async (req, res) => {
  const result = await StoreService.updateStore(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Store updated successfully",
    data: result,
  });
});

export const StoreController = {
  createStoreIntoDb,
  getStore,
  updateStore,
};
