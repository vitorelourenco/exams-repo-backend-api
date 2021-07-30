import { OneToMany, Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import Exam from "./Exam";

@Entity("instructors")
export default class Instructor{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Exam, exam => exam.instructor)
  exams: Exam[];
}
