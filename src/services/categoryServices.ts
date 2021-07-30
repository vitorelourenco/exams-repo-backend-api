import { getRepository } from "typeorm";
import Category from "../entities/Category";

export async function getAll() {
  const categories = await getRepository(Category).find();
  return categories;
}
