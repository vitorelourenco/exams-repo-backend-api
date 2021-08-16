/* eslint-disable import/no-cycle */
import {
	OneToMany, Entity, PrimaryGeneratedColumn, Column,
} from 'typeorm';
import Exam from './Exam';

@Entity('categories')
export default class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Exam, (exam) => exam.category)
  exams: Exam[];
}
