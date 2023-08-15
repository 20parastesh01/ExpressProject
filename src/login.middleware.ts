import { NextFunction, Request, Response } from "express"
import { userService } from "./dependency"


export const loginMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.headers["authorization"]
    if (!userId) {
        res.status(401).send({message: "Unauthorized"})
        return
    }

    const loggedInUser = await userService.findById(userId)

    if(!loggedInUser) {
        res.status(401).send({ message: "Unauthorized" })
        return;
    }

    req.user = loggedInUser

    next()
}