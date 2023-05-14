import { randomUUID } from 'crypto'
import { Prisma, Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  gyms: Gym[] = []

  async findById(id: string) {
    const user = this.gyms.find(data => data.id === id)

    return user || null
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data?.id || randomUUID(),
      title: data.title,
      description: data.description || null,
      phone: data.phone || null,
      lat: new Prisma.Decimal(data.lat.toString()),
      lng: new Prisma.Decimal(data.lng.toString())
    }

    this.gyms.push(gym)

    return gym
  }
}
