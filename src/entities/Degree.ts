/* eslint-disable import/no-cycle */
import {
	Entity, PrimaryGeneratedColumn, Column, OneToMany,
} from 'typeorm';
import Course from './Course';

@Entity('degrees')
export default class Degree {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Course, (course) => course.degree)
  courses: Course[];
}
