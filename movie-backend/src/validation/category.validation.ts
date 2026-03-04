import * as yup from "yup";

export const createCategorySchema = yup.object({
  name: yup
    .string()
    .required("Category name is required")
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name must not exceed 50 characters")
    .trim(),
  description: yup
    .string()
    .max(500, "Description must not exceed 500 characters")
    .trim()
    .optional(),
});

export type CreateCategoryDTO = yup.InferType<typeof createCategorySchema>;
