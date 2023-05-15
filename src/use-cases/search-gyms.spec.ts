import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let searchGymsUseCase: SearchGymsUseCase

describe('Search user Use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    searchGymsUseCase = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search a gym by title', async () => {
    await gymsRepository.create({
      id: 'gym-01',
      title: 'Smartfit Vila Formosa',
      description: '',
      phone: '',
      lat: -23.5715569,
      lng: -46.5644216
    })

    await gymsRepository.create({
      id: 'gym-02',
      title: 'Smartfit Analia Franco',
      description: '',
      phone: '',
      lat: -23.559554,
      lng: -46.5613124
    })

    const { gyms } = await searchGymsUseCase.execute({
      query: 'Smartfit',
      page: 1
    })

    expect(gyms).toHaveLength(2)
  })

  it('should be able to search a gym paginated', async () => {
    const promises = []

    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= 22; i++) {
      promises.push(
        gymsRepository.create({
          id: `gym-${i}`,
          title: `Smartfit ${i}`,
          description: '',
          phone: '',
          lat: -23.5715569,
          lng: -46.5644216
        })
      )
    }

    await Promise.all(promises)

    const { gyms } = await searchGymsUseCase.execute({
      query: 'Smartfit',
      page: 2
    })

    expect(gyms).toEqual([
      expect.objectContaining({ id: 'gym-21' }),
      expect.objectContaining({ id: 'gym-22' })
    ])
  })
})
