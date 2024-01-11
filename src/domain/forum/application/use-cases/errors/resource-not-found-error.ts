import { UseCaseError } from '@/core/errors/use-case-error'

export class ResourceNotFoundError extends Error implements UseCaseError {
  question: any
  constructor() {
    super('Resource not found')
  }
}
