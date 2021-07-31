import { OneToMany, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import Course from "./Course";

@Entity("periods")
export default class Period{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Course, course => course.period)
  courses: Course[];
}
