import { makeAnswer } from 'test/factory/make-answer'
import { InMemoryAnwserAttachmentsRepository } from 'test/repository/in-memory-answer-attachments-repository'
import { InMemoryAnswerCommentsRepository } from 'test/repository/in-memory-answer-comments-repository'
import { InMemoryAnswersRepository } from 'test/repository/in-memory-answers-repository'
import { CommentOnAnswerUseCase } from './comment-on-answer'

let inMemoryAnswerAttachmentRepository: InMemoryAnwserAttachmentsRepository
let inMemoryAnswerRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: CommentOnAnswerUseCase

describe('Comment on Answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentRepository =
      new InMemoryAnwserAttachmentsRepository()
    inMemoryAnswerRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentRepository,
    )
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()

    sut = new CommentOnAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswerCommentsRepository,
    )
  })

  it('should be able to comment on answer', async () => {
    const answer = makeAnswer()

    await inMemoryAnswerRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'test',
    })

    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual('test')
  })
})
