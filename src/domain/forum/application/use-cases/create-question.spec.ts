import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionsRepository } from 'test/repository/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'

let inMemoryQuestionRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository)
  })

  it('should be able to create a question ', async () => {
    const result = await sut.execute({
      authorId: '1',
      title: 'New Question',
      content: 'content question.',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight())
    expect(inMemoryQuestionRepository.items[0]).toEqual(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (result.value as unknown as { question: any })?.question,
    )
    expect(
      inMemoryQuestionRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(
      inMemoryQuestionRepository.items[0].attachments.currentItems,
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
    ])
  })
})
