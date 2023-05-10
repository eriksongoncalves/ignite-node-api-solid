import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '@/repositories/users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  users: User[] = []

  async findByEmail(email: string) {
    const user = this.users.find(data => data.email === email)

    return user || null
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      password_hash: data.password_hash!,
      created_at: new Date()
    }

    this.users.push(user)

    return user
  }
}
