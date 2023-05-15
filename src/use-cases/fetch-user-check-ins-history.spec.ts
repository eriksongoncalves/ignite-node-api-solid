import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsistoryUseCase } from './fetch-user-check-ins-history'

let checkInsRepository: InMemoryCheckInsRepository
let fetchUserCheckInsistoryUseCase: FetchUserCheckInsistoryUseCase

describe('Fetch user check ins history Use case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    fetchUserCheckInsistoryUseCase = new FetchUserCheckInsistoryUseCase(
      checkInsRepository
    )
  })

  it('should be able to fetch check ins history', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    })

    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01'
    })

    const { checkins } = await fetchUserCheckInsistoryUseCase.execute({
      userId: 'user-01',
      page: 1
    })

    expect(checkins).toHaveLength(2)
    expect(checkins).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' })
    ])
  })

  it('should be able to fetch paginated check-in history', async () => {
    const promises = []

    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= 22; i++) {
      promises.push(
        checkInsRepository.create({
          gym_id: `gym-${i}`,
          user_id: 'user-01'
        })
      )
    }

    await Promise.all(promises)

    const { checkins } = await fetchUserCheckInsistoryUseCase.execute({
      userId: 'user-01',
      page: 2
    })

    expect(checkins).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' })
    ])
  })
})
