import { HttpError } from "../../utility/http-error";
import { LoginDto } from "./dto/login.dto";
import { UserRepository } from "./user.repository";

export class UserService {
    constructor(private userRepo: UserRepository) {}

    async login({ username, password} : LoginDto) {
        const user = await this.userRepo.findByUsername(username)
        if( user === null ) {
            throw new HttpError(401, "Invalid username or password")
        }

        if ( user.password !== password ) {
            throw new HttpError(401, "Invalid username or password")
        }

        return user
    }

    findById(userId: string) {
        return this.userRepo.findById(userId)
    }
}