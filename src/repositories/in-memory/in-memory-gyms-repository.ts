import { randomUUID } from 'crypto'
import { Prisma, Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  gyms: Gym[] = []

  async findById(id: string) {
    const gyms = this.gyms.find(data => data.id === id)

    return gyms || null
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

  async searchMany(query: string, page: number) {
    const gyms = this.gyms
      .filter(data => data.title.includes(query))
      .slice((page - 1) * 20, page * 20)

    return gyms
  }
}
