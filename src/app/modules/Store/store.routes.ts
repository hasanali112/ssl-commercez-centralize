import { Router } from "express";
import { StoreController } from "./store.controller";
import validateData from "../../middleware/validateRequest";
import { StoreValidation } from "./store.validation";

const router = Router();

router.post(
  "/create-store",
  validateData(StoreValidation.storeSchemaValidation),
  StoreController.createStoreIntoDb
);

router.get("/get-store", StoreController.getStore);

router.patch("/update-store/:id", StoreController.updateStore);

export const StoreRoutes = router;
