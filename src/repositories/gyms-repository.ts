import { Gym, Prisma } from '@prisma/client'

export interface FindManyNearBy {
  lat: number
  lng: number
}

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  findManyNearBy(params: FindManyNearBy): Promise<Gym[]>
  searchMany(query: string, page: number): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
