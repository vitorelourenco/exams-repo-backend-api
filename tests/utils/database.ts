import { getConnection ,getRepository } from "typeorm"

import Degree from "../../src/entities/Degree";
import CreateDegree from "../../src/protocols/CreateDegree";
import Category from "../../src/entities/Category";
import CreateCategory from "../../src/protocols/CreateCategory";
import Course from "../../src/entities/Course";
import CreateCourse from "../../src/protocols/CreateCourse";
import Exam from "../../src/entities/Exam";
import CreateExam from "../../src/protocols/CreateExam";
import Instructor from "../../src/entities/Instructor";
import CreateInstructor from "../../src/protocols/CreateInstructor";
import Period from "../../src/entities/Period";
import CreatePeriod from "../../src/protocols/CreatePeriod";

export async function clearDatabase(){
  const connection = getConnection();
  await connection.query(`DELETE FROM exams`);
  await connection.query(`DELETE FROM categories`);
  await connection.query(`DELETE FROM courses_instructors_instructors`);
  await connection.query(`DELETE FROM courses`);
  await connection.query(`DELETE FROM instructors`);
  await connection.query(`DELETE FROM periods`);
  await connection.query(`DELETE FROM degrees`);

  await connection.query(`ALTER SEQUENCE exams_id_seq RESTART WITH 1`);
  await connection.query(`ALTER SEQUENCE categories_id_seq RESTART WITH 1`);
  await connection.query(`ALTER SEQUENCE courses_instructors_instructors_id_seq RESTART WITH 1`);
  await connection.query(`ALTER SEQUENCE courses_id_seq RESTART WITH 1`);
  await connection.query(`ALTER SEQUENCE instructors_id_seq RESTART WITH 1`);
  await connection.query(`ALTER SEQUENCE periods_id_seq RESTART WITH 1`);
  await connection.query(`ALTER SEQUENCE degrees_id_seq RESTART WITH 1`);
}

export async function fillDatabase(){
  const newDegree = getRepository(Degree).create({name:"Engenharia Naval",courses:[]} as CreateDegree);
  await getRepository(Degree).save(newDegree);

  const newCategory = getRepository(Category).create({name:"P1",exams:[]} as CreateCategory);
  await getRepository(Category).save(newCategory);

  const newInstructor = getRepository(Instructor).create({name:"Protasio",exams:[]} as CreateInstructor);
  await getRepository(Instructor).save(newInstructor);

  const newPeriod = getRepository(Period).create({name:"1o",courses:[]} as CreatePeriod);
  await getRepository(Period).save(newPeriod);

  const newCourse = getRepository(Course).create({name:"Computacao 1",period:newPeriod, degree:newDegree, instructors:[newInstructor], exams:[]} as CreateCourse);
  await getRepository(Course).save(newCourse);

  const newExam = getRepository(Exam).create({name:"2015.1",fileLink:"https://www.youtube.com/watch?v=P8Rw77yX4GA", category:newCategory, instructor:newInstructor, course:newCourse} as CreateExam);
  await getRepository(Exam).save(newExam);
}

export async function getSalt(entitiy:any){
  const response:any[] = await getRepository(entitiy).find({select:["id"], order:{id:"DESC"}, take:1});
  const salt:{pid:number} = {pid:1};
  const id = response[0]?.id;
  if(id) {
    salt.pid = id;
  }
  return JSON.stringify(salt)
}
