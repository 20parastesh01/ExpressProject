import express, { ErrorRequestHandler} from "express";
import { makePlanRouter } from "./modules/routes/plan.route";
import { makeUserRouter } from "./modules/routes/user.route"
import { ZodError } from "zod";
import { PlanService } from "./modules/plan/plan.service";
import { PlanRepository } from "./modules/plan/plan.repository";
import { DataSource } from "typeorm";
import { UserRepository } from "./modules/user/user.repository";
import { UserService } from "./modules/user/user.service";


export const makeApp = (dataSource: DataSource) => {

    const app = express()

    app.use(express.json()) //translates body. if you don't define it error for app.post will happen

    // will remove additional console.log s
    if(process.env.NODE_ENV !== "Test"){
        app.use((req, res, next) => {
        console.log(req.method, req.url);
        next();
        })
    }

    const planRepo = new PlanRepository(dataSource)
    const planService = new PlanService(planRepo)

    const userRepo = new UserRepository(dataSource)
    const userService = new UserService(userRepo)

    app.use("/plan", makePlanRouter(planService, userService))
    app.use(makeUserRouter(userService))

    app.use((req, res) => {
        //res.send({message: "Not Found"})
        //or
        res.status(404).send({message: "Not Found"});
    })

    const errorHandling: ErrorRequestHandler = (error, req, res, next) => {
        if(error instanceof ZodError) {
            res.status(400).send({message: error.message})
        }
        res.status(500).send()
    }
    app.use(errorHandling)
    return app;

}