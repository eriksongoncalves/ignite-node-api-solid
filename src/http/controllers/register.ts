import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { RegisterUseCase } from '@/use-cases/register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const registerBodyData = registerBodySchema.parse(req.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    await registerUseCase.execute(registerBodyData)
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    return reply.status(400).send()
  }

  return reply.status(201).send()
}
