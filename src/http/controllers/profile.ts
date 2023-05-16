import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile'

export async function profile(req: FastifyRequest, reply: FastifyReply) {
  const getUserProfileUseCase = makeGetUserProfileUseCase()

  const { user } = await getUserProfileUseCase.execute({
    userId: req.user.sub
  })

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined
    }
  })
}
