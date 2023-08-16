import { User } from "./models/user";
import { DataSource, Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { seedUser } from "../../seed";

export class UserRepository {
    private userRepo: Repository<UserEntity>
    constructor(appDataSource: DataSource) {
        this.userRepo = appDataSource.getRepository(UserEntity)

        seedUser()
    }
    findByUsername(username: string): Promise<User | null> {
        return this.userRepo.findOneBy({username})
    }

    findById(id: string) {
        return this.userRepo.findOneBy({id})
    }
}