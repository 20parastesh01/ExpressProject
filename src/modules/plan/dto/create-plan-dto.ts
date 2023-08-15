import { z } from "zod"

export const createPlanDto = z.object({
    title: z.string().nonempty(),
    description: z.string().optional(),
    deadLine: z.coerce.date(),
})

export type CreatePlanDto = z.infer<typeof createPlanDto>



// console.log(
//     createPlanDto.parse({
//     title: "Tehran shomal",
//     deadLine: new Date().toISOString(),
//     })
// )