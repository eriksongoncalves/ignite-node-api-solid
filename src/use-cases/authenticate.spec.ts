import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let authenticateUseCase: AuthenticateUseCase

describe('Authenticate Use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    authenticateUseCase = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    const password = '123456'
    const passwordHash = await hash(password, 6)

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: passwordHash
    })

    const { user } = await authenticateUseCase.execute({
      email: 'johndoe@example.com',
      password
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    expect(async () => {
      await authenticateUseCase.execute({
        email: 'johndoe@example.com',
        password: '123456'
      })
    }).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  it('should be able to authenticate', async () => {
    const password = '123456'
    const passwordHash = await hash(password, 6)

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: passwordHash
    })

    expect(async () => {
      await authenticateUseCase.execute({
        email: 'johndoe@example.com',
        password: '1234567'
      })
    }).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
