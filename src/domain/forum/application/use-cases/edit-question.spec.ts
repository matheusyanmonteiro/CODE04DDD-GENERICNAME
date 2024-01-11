import { InMemoryQuestionsRepository } from 'test/repository/in-memory-questions-repository'
import { makeQuestion } from 'test/factory/make-question'
import { EditQuestionUseCase } from './edit-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryQuestionRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionRepository)
  })

  it('should be able to edit a question by id ', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author1'),
      },
      new UniqueEntityID('question1'),
    )

    await inMemoryQuestionRepository.create(newQuestion)

    await sut.execute({
      questionId: newQuestion.id.toValue(),
      authorId: 'author1',
      title: 'maia pergunta',
      content: 'conteudo maia',
    })

    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
      title: 'maia pergunta',
      content: 'conteudo maia',
    })
  })

  it('should not be able to edit a question from another author ', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author1'),
      },
      new UniqueEntityID('question1'),
    )

    await inMemoryQuestionRepository.create(newQuestion)

    const result = await sut.execute({
      questionId: newQuestion.id.toValue(),
      authorId: 'maia',
      title: 'maia pergunta',
      content: 'conteudo maia',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
