/* eslint-disable import/no-cycle */
import {
	ManyToOne, Entity, PrimaryGeneratedColumn, Column,
} from 'typeorm';
import Course from './Course';
import Instructor from './Instructor';
import Category from './Category';

@Entity('exams')
export default class Exam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  fileLink: string;

  @ManyToOne(() => Instructor, (instructor) => instructor.exams)
  instructor: Instructor;

  @ManyToOne(() => Course, (course) => course.exams)
  course: Course;

  @ManyToOne(() => Category, (category) => category.exams)
  category: Category;
}
