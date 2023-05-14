import { randomUUID } from 'crypto'
import dayjs from 'dayjs'
import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  items: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date()
    }

    this.items.push(checkIn)

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkOnSameDate = this.items.find(checkin => {
      const checkinDate = dayjs(checkin.created_at)
      const isOnSameDate =
        checkinDate.isAfter(startOfTheDay) && checkinDate.isBefore(endOfTheDay)

      return checkin.user_id === userId && isOnSameDate
    })

    if (!checkOnSameDate) {
      return null
    }

    return checkOnSameDate
  }
}
