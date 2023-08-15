import { ForbiddenError } from "../../utility/http-error"
import { PlanService } from "./plan.service"

describe("Create Program", () => {
    
    let planService: PlanService
    beforeEach(() => {
        planService = new PlanService()
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