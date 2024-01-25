import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsString, IsDate, IsInt, IsNumber } from 'class-validator';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsDate()
  date_of_birth: Date;

  @Column()
  @IsInt()
  age: number;

  @Column('float')
  @IsNumber({ allowInfinity: false, allowNaN: false })
  salary: number;
}
