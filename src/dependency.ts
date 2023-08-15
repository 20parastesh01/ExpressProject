import { PlanRepository } from "./modules/plan/plan.repository"
import { PlanService } from "./modules/plan/plan.service"
import { UserRepository } from "./modules/user/user.repository"
import { UserService } from "./modules/user/user.service"

export const planRepository = new PlanRepository

export const planService = new PlanService

export const userRepoitory = new UserRepository

export const userService = new UserService