import { makeQuestion } from 'test/factory/make-question'
import { InMemoryQuestionAttachmentsRepository } from 'test/repository/in-memory-question-attachments-repository'
import { InMemoryQuestionsRepository } from 'test/repository/in-memory-questions-repository'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionRepository)
  })

  it('should be able to fetch recent questions ', async () => {
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2023, 0, 20) }),
    )
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2023, 0, 25) }),
    )
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2023, 0, 6) }),
    )
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2023, 0, 12) }),
    )

    const result = await sut.execute({
      page: 1,
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((result.value as unknown as { questions: any[] }).questions).toEqual(
      [
        expect.objectContaining({ createdAt: new Date(2023, 0, 25) }),
        expect.objectContaining({ createdAt: new Date(2023, 0, 20) }),
        expect.objectContaining({ createdAt: new Date(2023, 0, 12) }),
        expect.objectContaining({ createdAt: new Date(2023, 0, 6) }),
      ],
    )
  })

  it('should be able to fetch paginated recent questions ', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionRepository.create(makeQuestion())
    }

    const result = await sut.execute({
      page: 2,
    })
    expect(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (result.value as unknown as { questions: any[] }).questions,
    ).toHaveLength(2)
  })
})
