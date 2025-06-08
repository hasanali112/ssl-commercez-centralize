import { v4 as uuidv4 } from "uuid";
import { Store } from "./store.model";
import { IStore } from "./store.interface";
const generateStoreId = (storeName: string) => {
  //using uuid4
  const generateId = uuidv4().slice(0, 8);
  return `${storeName}-${generateId}`;
};

const createStore = async (payload: IStore) => {
  const storeId = generateStoreId(payload.storeName);
  payload.storeId = storeId;
  const isExist = await Store.findOne({ storeId: payload.storeId });
  if (isExist) throw new Error("Store already exist");
  const result = await Store.create(payload);
  return result;
};

const getStore = async () => {
  const result = await Store.find({});
  return result;
};

const updateStore = async (id: string, payload: Partial<IStore>) => {
  const result = await Store.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const StoreService = {
  createStore,
  getStore,
  updateStore,
};
