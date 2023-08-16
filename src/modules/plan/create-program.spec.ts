import { ForbiddenError } from "../../utility/http-error"
import { IPlanRepository, CreatePlan, CreateProgram } from "./plan.repository"
import { PlanService } from "./plan.service"
import { Plan } from "./models/plan"


class MockPlanRepo implements IPlanRepository {
    plans: Plan[] = []
    async create(plan: CreatePlan): Promise<Plan> {
        this.plans.push({
            id:1,
            ...plan,
        })
        return {
            id:1,
            ...plan,
        }
        // throw new Error("Method not implemented.")
    }
    findById(id: number): Promise<Plan | null> {
        throw new Error("Method not implemented.")
    }
    addProgram(plan: Plan, program: CreateProgram): Promise<Plan> {
        throw new Error("Method not implemented.")
    }
}

describe("Create Program", () => {
    
    let planService: PlanService
    beforeEach(() => {
        planService = new PlanService(new MockPlanRepo)
    })
    it("should not create program if user is not representative", () => {
        expect(() => 
        planService.canCreateProgram(
            {username: "foo", password: "bar", id: 'ksdjjk', role: "Normal"},
            {id: 1, title: "Tehran", programs: [], description: "", deadLine: new Date}
        )
        ).toThrowError(ForbiddenError)
    })

    it("should not create a program if user already have a program", () => {

        expect(
            planService.canCreateProgram(
                {
                    username: "foo",
                    password: "bar",
                    id: "1",
                    role: "Representative"
                },
                {
                    id: 1,
                    title: "Urumia",
                    programs: [
                        { id: 1, title: "foo", description:"", userId: "1", planId:1 },
                    ],
                    description: "",
                    deadLine: new Date(),
                }
            )
        ).toBe(false)
    })

    it("should not create a program if plan deadline exeed from today", () => {
        const today = new Date()
        const yesterday = new Date(today.setDate(today.getDate() - 1))
       
        expect(
            planService.canCreateProgram(
                {
                    username: "foo",
                    password: "bar",
                    id: "1",
                    role: "Representative"
                },
                {
                    id: 1,
                    title: "Urumia",
                    programs: [
                        { id: 1, title: "foo", description:"", userId: "1", planId:1 },
                    ],
                    description: "",
                    deadLine: yesterday,
                }
            )
        ).toBe(false)
    })

    it("should return true", () => {
        const today = new Date()
        const tomorrow = new Date(today.setDate(today.getDate() + 1))
       
        expect(
            planService.canCreateProgram(
                {
                    username: "foo",
                    password: "bar",
                    id: "1",
                    role: "Representative"
                },
                {
                    id: 1,
                    title: "Urumia",
                    programs: [],
                    description: "",
                    deadLine: tomorrow,
                }
            )
        ).toBe(true)
    })
})