import { TypeOfExpression } from "typescript"
import { z } from "zod"

export const createProgramDto = z.object( {
    title: z.string().nonempty(),
    planId: z.coerce.number(),
    description: z.string().optional(),
})

export type CreateProgramDto = z.infer<typeof createProgramDto>