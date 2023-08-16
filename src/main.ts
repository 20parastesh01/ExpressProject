import { makeApp } from "./api";
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

AppDataSource.initialize().then((dataSource) => {
    const app = makeApp(dataSource)
    app.listen(PORT, () => {
        console.log("listening on port" + PORT)
    })
})
// .then(() => seedUser())