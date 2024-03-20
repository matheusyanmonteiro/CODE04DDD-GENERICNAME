import { AnwserAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

export class InMemoryAnwserAttachmentsRepository
  implements AnwserAttachmentsRepository
{
  public items: AnswerAttachment[] = []

  async findManyByAnswerId(answerId: string) {
    const anwserAttachment = this.items.filter(
      (item) => item.answerId.toString() === answerId,
    )

    return anwserAttachment
  }

  async deleteManyByAnswerId(answerId: string) {
    const anwserAttachment = this.items.filter(
      (item) => item.answerId.toString() !== answerId,
    )

    this.items = anwserAttachment
  }
}
