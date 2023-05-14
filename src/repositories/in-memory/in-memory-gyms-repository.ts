import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  gyms: Gym[] = []

  async findById(id: string) {
    const user = this.gyms.find(data => data.id === id)

    return user || null
  }
}
