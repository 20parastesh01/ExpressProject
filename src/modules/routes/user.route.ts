import {Router} from "express"
import { loginDto } from "../user/dto/login.dto";
import { handleExpress } from "../../utility/handle-express";
import { userService } from "../../dependency";

export const app = Router()

app.post("/login", (req, res) => {

        const dto = loginDto.parse(req.body)

        handleExpress(res, () => userService.login(dto))
})

