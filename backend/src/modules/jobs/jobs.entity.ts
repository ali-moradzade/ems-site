import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Job {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    date: Date;
}

