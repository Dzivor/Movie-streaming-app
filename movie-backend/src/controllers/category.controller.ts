import { Request, Response } from "express";
import {
  getAllCategories,
  getCategoryById,
} from "../services/category.service";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await getAllCategories();

    return res.status(200).json({
      status: "success",
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to fetch categories",
    });
  }
};

export const getCategory = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    
    const category = await getCategoryById(id);

    return res.status(200).json({
      status: "success",
      data: category,
    });
  } catch (error) {
    const statusCode = (error as any).statusCode || 500;
    return res.status(statusCode).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to fetch category",
    });
  }
};
