import request from "supertest"
import { app } from "../src/api"
import { loginAdminTest, loginRepTest } from "./utility"
import { AppDataSource } from "../src/data-source"
import { seedUser } from "../src/seed"

describe("Plan", () => {

    beforeAll(async () =>  {
        await AppDataSource.initialize()
        await seedUser()
    })

    afterAll(async () => {
        await AppDataSource.destroy()
    })

    describe("Create", () => {

        it("should fail if we did not login", async () => {
            await request(app)
                .post("/plan")
                .expect(401)
        })

        it.skip("should fail if user is not admin", async () => {
            const user = await loginRepTest()
            const today = new Date()
            const tomorrow = new Date(today.setDate(today.getDate() + 1))
            const { body: plan } = await request(app)
                .post("/plan")
                .set("Authorization", user.id)
                .send({
                    title: "Tehran shomal highway",
                    deadLine: tomorrow
                }).expect(403)
            expect(plan.title).toBe("Tehran shomal highway")
        })

        it("should create a plan if we are logged in", async () => {
            const user = await loginAdminTest()
            const today = new Date()
            const tomorrow = new Date(today.setDate(today.getDate() + 1))
            const { body: plan } = await request(app)
                .post("/plan")
                .set("Authorization", user.id)
                .send({
                    title: "Tehran shomal highway",
                    deadLine: tomorrow
                }).expect(200)
            expect(plan.title).toBe("Tehran shomal highway")
            })
        it("should send bad request if title is not provided", async() => {
            const user = await loginAdminTest()
            
            const { body: plan } = await request(app)
                .post("/plan")
                .set("Authorization", user.id)
                .send({
                    description: ""
                }).expect(400)
            })

    describe("Read", () => {
        it.skip("should read the plan", async () => {
            const user = await loginAdminTest()
            const title = "Tehran shomal highway"
            const today = new Date()
            const tomorrow = new Date(today.setDate(today.getDate() + 1))
            const {body:plan} = await request(app)
                .post("/plan")
                .set("Authorization", user.id)
                .send({
                    title: title,
                    deadLine: tomorrow
                })
                .expect(200)
            const {body: resultPlan} = await request(app)
                .get("/plan/" + plan.id)
                .expect(403)
            expect(plan.title).toBe(title)
        })
    })
    })
})