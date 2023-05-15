import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'

interface FetchUserCheckInsistoryUseCaseRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsistoryUseCaseResponse {
  checkins: CheckIn[]
}

export class FetchUserCheckInsistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page
  }: FetchUserCheckInsistoryUseCaseRequest): Promise<FetchUserCheckInsistoryUseCaseResponse> {
    const checkins = await this.checkInsRepository.findManyByUserId(
      userId,
      page
    )

    return { checkins }
  }
}
