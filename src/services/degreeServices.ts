import { getRepository } from "typeorm";
import Degree from '../entities/Degree';

export async function getAll(){
  const degrees = await getRepository(Degree).find();
  return degrees;
}
