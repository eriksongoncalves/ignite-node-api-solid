import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface FetchNearbyGymsUseCaseRequest {
  userLat: number
  userLng: number
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLat,
    userLng
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearBy({
      lat: userLat,
      lng: userLng
    })

    return {
      gyms
    }
  }
}
