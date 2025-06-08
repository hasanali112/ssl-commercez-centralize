import { model, Schema } from "mongoose";
import { IStore } from "./store.interface";

const StoreSchema = new Schema<IStore>({
  storeId: {
    type: String,
    required: true,
  },
  storeName: {
    type: String,
    required: true,
  },
  storeUrl: {
    type: String,
    required: true,
  },
  storeFrontendUrl: {
    type: String,
    required: true,
  },
});

export const Store = model<IStore>("Store", StoreSchema);
