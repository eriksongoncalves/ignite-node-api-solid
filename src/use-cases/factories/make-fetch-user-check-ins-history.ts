import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { FetchUserCheckInsistoryUseCase } from '../fetch-user-check-ins-history'

export function makeFetchCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const fetchUserCheckInsistoryUseCase = new FetchUserCheckInsistoryUseCase(
    checkInsRepository
  )

  return fetchUserCheckInsistoryUseCase
}
