import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { CheckInUseCase } from './check-in'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let checkInUseCase: CheckInUseCase

describe('check in Use case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    checkInUseCase = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.gyms.push({
      id: 'gym-01',
      title: 'Smatfit Vila Formosa',
      description: '',
      phone: '',
      lat: new Decimal(-23.5715569),
      lng: new Decimal(-46.5644216)
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    const { checkIn } = await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLat: -23.5715569,
      userLng: -46.5644216
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLat: -23.5715569,
      userLng: -46.5644216
    })

    expect(async () => {
      await checkInUseCase.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLat: -23.5715569,
        userLng: -46.5644216
      })
    }).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLat: -23.5715569,
      userLng: -46.5644216
    })

    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0))

    const { checkIn } = await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLat: -23.5715569,
      userLng: -46.5644216
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distance gym', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    expect(async () => {
      await checkInUseCase.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLat: -23.5708475,
        userLng: -46.5503987
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
