import { app } from "./api";
import { User } from "./modules/user/models/user";
import { AppDataSource } from "./data-source";
import { seedUser } from "./seed";


declare global {
    namespace Express {
        interface Request {
            user: User
        }
    }
}

const PORT = 3000

AppDataSource.initialize()
    .then(() => seedUser)
    .then(() => {
        app.listen(PORT, () => {
            console.log("listening on port" + PORT)
    })
})
