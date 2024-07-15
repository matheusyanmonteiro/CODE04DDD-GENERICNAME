/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeAnswer } from 'test/factory/make-answer'
import { InMemoryAnwserAttachmentsRepository } from 'test/repository/in-memory-answer-attachments-repository'
import { InMemoryAnswersRepository } from 'test/repository/in-memory-answers-repository'
import { OnAnswerCreated } from './on-answer-created'

let inMemoryAnswerAttachmentsRepository: InMemoryAnwserAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository

describe('On Answer Created', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnwserAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
  })

  it('should send a notification when an answer is created', async () => {
    const _onAnswerCreated = new OnAnswerCreated()

    const answer = makeAnswer()

    inMemoryAnswersRepository.create(answer)
  })
})
