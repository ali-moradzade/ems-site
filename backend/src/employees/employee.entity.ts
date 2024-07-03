import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    phone: string;

    // TODO: Add foreign reference to job
    @Column()
    job: string;

    @Column()
    date: string;
}
