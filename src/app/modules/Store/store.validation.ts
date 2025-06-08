import { z } from "zod";

const storeSchemaValidation = z.object({
  storeName: z.string().min(1, "Store name is required"), // Ensures the store name is not empty
  storeUrl: z
    .string()
    .url("Invalid URL format") // Ensures it's a valid URL
    .min(1, "Store URL is required"),
  storeFrontendUrl: z
    .string()
    .url("Invalid URL format") // Ensures it's a valid URL
    .min(1, "Store frontend URL is required"),
});

export const StoreValidation = {
  storeSchemaValidation,
};
