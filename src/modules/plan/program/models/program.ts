import { Plan } from "../../models/plan";

export interface Program {
    id: number;
    planId: number;
    title: string;
    description: string;
    userId: string;
}

// export interface ProgramWithPlan extends Program {
//     plan: Plan
// }