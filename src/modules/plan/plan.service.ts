import { IPlanRepository } from "./plan.repository";
import { HttpError, ForbiddenError, NotFoundError } from "../../utility/http-error";
import { CreatePlanDto } from "./dto/create-plan-dto";
import { User } from "../user/models/user";
import { CreateProgramDto } from "./program/dto/create-program.dto";
import { Plan
 } from "./models/plan";


export class PlanService { 
    constructor(private planRepo: IPlanRepository) {}

    getPlanById(planId: number) {
        const plan = this.planRepo.findById(planId)
    
    if(plan === undefined) {
     throw new HttpError(404, "Plan not found")
    }

    return plan;
    }
    createPlan(dto: CreatePlanDto, loggedInUser: User) {
        const plan = {
            title: dto.title,
            description: dto.description || "",
            deadLine: dto.deadLine,
            programs: [],
        }
     
    
        if(dto.deadLine.getTime() < new Date().getTime()) {
            throw new HttpError(400, "you should not use deadline in the past")
        }
        if(loggedInUser.role !== "Admin") {
            throw new HttpError(403, "you are not authorized")
        }
        return this.planRepo.create(plan)
    }
    
    async createProgram(
        dto: CreateProgramDto,
        user: User
        ) : Promise<Plan> {
        
        const plan = await this.planRepo.findById(dto.planId)
        
        if (!plan) {
            throw new NotFoundError
        }
    
        if (this.canCreateProgram(user, plan)){
            return this.planRepo.addProgram(plan, {
                title: dto.title,
                description: dto.description || "",
                userId: user.id,
            })
        }
        throw new HttpError(400, "program is not valid")
    }
    
    public canCreateProgram = (user: User, plan: Plan) => {
        if(user.role !== "Representative") {
            throw new ForbiddenError()
        }
        const program = plan.programs.find((x) => x.userId === user.id)
    
        if(program) {
            return false
        }
    
        if(new Date().getTime() > plan.deadLine.getTime()) {
            return false;
        }
    
        return true;
    }
}