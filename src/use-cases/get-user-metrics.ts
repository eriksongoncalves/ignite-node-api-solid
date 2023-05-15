import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface GetUserMetricsUseUseCaseResponse {
  checkinsCount: number
}

export class GetUserMetricsUseUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseUseCaseResponse> {
    const checkinsCount = await this.checkInsRepository.countByUserId(userId)

    return { checkinsCount }
  }
}
