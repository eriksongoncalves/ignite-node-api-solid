import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let getUserProfileUseCase: GetUserProfileUseCase

describe('Ger user profile Use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const password = '123456'
    const passwordHash = await hash(password, 6)

    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: passwordHash
    })

    const { user } = await getUserProfileUseCase.execute({
      userId: createdUser.id
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to get user profile', async () => {
    expect(async () => {
      await getUserProfileUseCase.execute({
        userId: '123456'
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
