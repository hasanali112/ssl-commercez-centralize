import { Router } from "express";
import { MessageController } from "./success";

const router = Router();

router.post("/success", MessageController.successMessage);

router.post("/fail", MessageController.failureMessage);

export const MessageRoutes = router;
