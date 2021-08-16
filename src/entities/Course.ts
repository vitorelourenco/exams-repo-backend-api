/* eslint-disable import/no-cycle */
import {
	OneToMany, ManyToOne, Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable,
} from 'typeorm';
import Degree from './Degree';
import Exam from './Exam';
import Instructor from './Instructor';
import Period from './Period';

@Entity('courses')
export default class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // one2many
  @OneToMany(() => Exam, (exam) => exam.course)
  exams: Exam[];

  //
  // many2one
  @ManyToOne(() => Degree, (degree) => degree.courses)
  degree: Degree;

  @ManyToOne(() => Period, (period) => period.courses)
  period: Period;

  //
  // many2many
  @ManyToMany(() => Instructor, { onDelete: 'CASCADE' })
  @JoinTable()
  instructors: Instructor[]
  //
}
