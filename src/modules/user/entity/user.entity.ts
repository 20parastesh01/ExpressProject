import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "../models/user";


@Entity("users")
export class UserEntity {
    @PrimaryColumn()
    id!: string;

    @Column()
    username!: string;

    @Column()
    password!: string;

    @Column()
    role!: UserRole

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}