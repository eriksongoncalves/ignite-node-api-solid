import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let fetchNearbyGymsUseCase: FetchNearbyGymsUseCase

describe('Fetch nearby gyms Use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    fetchNearbyGymsUseCase = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      id: 'gym-01',
      title: 'Near Gym',
      description: '',
      phone: '',
      lat: -23.5715569,
      lng: -46.5644216
    })

    await gymsRepository.create({
      id: 'gym-02',
      title: 'Far Gym',
      description: '',
      phone: '',
      lat: -23.585953,
      lng: -46.6788873
    })

    const { gyms } = await fetchNearbyGymsUseCase.execute({
      userLat: -23.5715569,
      userLng: -46.5644216
    })

    expect(gyms).toHaveLength(1)
  })
})
