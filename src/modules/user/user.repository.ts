import { User } from "./models/user";
import { Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { AppDataSource } from "../../data-source";

export class UserRepository {
    private userRepo: Repository<UserEntity>
    constructor() {
        this.userRepo = AppDataSource.getRepository(UserEntity)
    }
    findByUsername(username: string): Promise<User | null> {
        return this.userRepo.findOneBy({username})
    }

    findById(id: string) {
        return this.userRepo.findOneBy({id})
    }
}