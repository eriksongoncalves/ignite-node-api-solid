import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseUseCase } from './get-user-metrics'

let checkInsRepository: InMemoryCheckInsRepository
let getUserMetricsUseUseCase: GetUserMetricsUseUseCase

describe('Get user metric Use case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    getUserMetricsUseUseCase = new GetUserMetricsUseUseCase(checkInsRepository)
  })

  it('should be able to get cehck-ins count fromt metrics', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    })

    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01'
    })

    const { checkinsCount } = await getUserMetricsUseUseCase.execute({
      userId: 'user-01'
    })

    expect(checkinsCount).toBe(2)
  })
})
