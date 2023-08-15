import request from "supertest"
import { app } from "../src/api"
import { loginAdminTest, loginRepTest } from "./utility"
import { AppDataSource } from "../src/data-source"


describe("Program", () => {

    beforeAll(async() =>  {
        await AppDataSource.initialize()
    })

    afterAll(async() => {
        await AppDataSource.destroy()
    })
    
    describe("Create", () => {

        it("should fail if we did not login", async () => {

            const adminUser = await loginAdminTest();

            const today = new Date()
            const tomorrow = new Date(today.setDate(today.getDate() + 1))

            const { body: plan } = await request(app)
                .post("/plan")
                .set("Authorization", adminUser.id)
                .send({
                    title: "Tehran shomal highway",
                    deadLine: tomorrow
                })
                .expect(200)
            await request(app).post(`/plan/${plan.id}/program`).expect(401)
        })

        it("should create a program", async () => {
            const adminUser = await loginAdminTest();
            const repUser = await loginRepTest();
            
            const today = new Date()
            const tomorrow = new Date(today.setDate(today.getDate() + 1))
            const { body: plan } = await request(app)
                .post("/plan")
                .set("Authorization", adminUser.id)
                .send({
                    title: "Tehran shomal highway",
                    deadLine: tomorrow
                }).expect(200)

            const {body: planWithProgram} = await request(app)
                .post(`/plan/${plan.id}/program`)
                .set("Authorization", repUser.id)
                .send({
                    title: "Tehransss"
                }).expect(200)

            expect(planWithProgram.programs).toHaveLength(1)
        })

        it.skip("should fail if the deadline is exceeded", async () => {
            const user = await loginAdminTest();

            const today = new Date()
            const yesterday = new Date(today.setDate(today.getDate() - 1))
            const { body: plan } = await request(app)
                .post("/plan")
                .set("Authorization", user.id)
                .send({
                    title: "Tehran shomal highway",
                    deadLine: yesterday
                }).expect(200)

            const {body: program} = await request(app)
                .post("/program")
                .set("Authorization", user.id)
                .send({
                    title: "Tehran shomal",
                    deadLine: yesterday,
                    planId: plan.id
                }).expect(400)
        })
    })
})