import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("degrees")
export default class Degree{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
