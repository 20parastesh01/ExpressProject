import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, } from "typeorm";
import { ProgramEntity } from "../program/entity/program.entity";


@Entity("plans")
export class PlanEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    title!:string

    @Column()
    description!: string

    @Column()
    deadLine!: Date;

    @OneToMany(() => ProgramEntity, (program) => program.plan, {cascade: ["insert"]})
    programs!: ProgramEntity[];

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}
