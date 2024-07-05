import { UseCaseError } from '../use-case-error'

export class ResourceNotFoundError extends Error implements UseCaseError {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  question: any
  constructor() {
    super('Resource not found')
  }
}
