import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { CheckIn } from '@prisma/client'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  userLat: number
  userLng: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository
  ) {}

  async execute({
    userId,
    gymId,
    userLat,
    userLng
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const MAX_DISTANCE_IN_KILOMETERS = 0.1 // 100m

    const distance = getDistanceBetweenCoordinates(
      { lat: userLat, lng: userLng },
      { lat: gym.lat.toNumber(), lng: gym.lng.toNumber() }
    )

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new Error()
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date()
    )

    if (checkInOnSameDay) {
      throw new Error()
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId
    })

    return {
      checkIn
    }
  }
}
