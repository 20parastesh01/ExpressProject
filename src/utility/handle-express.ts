import { Response } from "express"
import { HttpError } from "./http-error"
// import { ZodError, ZodTypeAny } from "zod"

// export const parseExpress = (res: Response, zod: ZodTypeAny, rawData: any) => {
//     try {
//         const dto = zod.parse(rawData)
//         return dto
//     } catch(e) {
//         if(e instanceof ZodError) {
//             res.status(400).send({ message: e.errors})
//             return
//         }
//         res.status(500).send()
//     }
// }

export const handleExpress = async <A>(res: Response, fn: () => Promise<A>) => {
    try {
        const data = await fn()
        res.status(200).send(data)
    }catch(e) {
        if(e instanceof HttpError) {
            res.status(e.status).send({message: e.message})
            return;
        }

        res.status(500).send()
        
    }
}