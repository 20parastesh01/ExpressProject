import { Program } from "../program/models/program";

export interface Plan {
    id: number;
    title: string;
    description: string;
    deadLine: Date;
    programs: Program[];
}
