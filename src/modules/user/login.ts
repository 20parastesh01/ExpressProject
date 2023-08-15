import { userRepoitory } from "../../dependency"
import { HttpError } from "../../utility/http-error"
import { LoginDto } from "./dto/login.dto"

export const login = async ({ username, password }: LoginDto) => {
    const user = await userRepoitory.findByUsername(username)

    if(!user) {
        throw new HttpError(401, "Invalid username or password")
    }

    return user
}
