import { AppDataSource } from "../db/database";
import { Category } from "../entities/Category";

export const getAllCategories = async () => {
  try {
    const categoryRepository = AppDataSource.getRepository(Category);
    const categories = await categoryRepository.find({
      relations: ["movies"],
      order: { created_at: "DESC" },
    });

    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description,
      movieCount: category.movies?.length || 0,
      created_at: category.created_at,
    }));
  } catch (error) {
    throw new Error("Failed to fetch categories");
  }
};

export const getCategoryById = async (id: string) => {
  try {
    const categoryRepository = AppDataSource.getRepository(Category);
    const category = await categoryRepository.findOne({
      where: { id },
      relations: ["movies"],
    });

    if (!category) {
      const error = new Error("Category not found");
      (error as any).statusCode = 404;
      throw error;
    }

    return {
      id: category.id,
      name: category.name,
      description: category.description,
      movieCount: category.movies?.length || 0,
      created_at: category.created_at,
    };
  } catch (error) {
    throw error;
  }
};
