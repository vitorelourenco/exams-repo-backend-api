/* eslint-disable import/no-cycle */
import {
	OneToMany,
	Entity,
	PrimaryGeneratedColumn,
	Column,
} from 'typeorm';
import Exam from './Exam';

@Entity('instructors')
export default class Instructor {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@OneToMany(() => Exam, (exam) => exam.instructor)
	exams: Exam[];
}
