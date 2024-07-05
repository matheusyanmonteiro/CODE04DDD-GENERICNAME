import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { makeNotification } from 'test/factory/make-notification'
import { InMemoryNotificationsRepository } from 'test/repository/in-memory-notifications-repository'
import { ReadNotificationUseCase } from './read-notification'

let inMemoryNotificationRepository: InMemoryNotificationsRepository
let sut: ReadNotificationUseCase

describe('Read Notification', () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationsRepository()

    sut = new ReadNotificationUseCase(inMemoryNotificationRepository)
  })

  it('should be able to read a notification ', async () => {
    const notification = makeNotification()

    await inMemoryNotificationRepository.create(notification)

    const result = await sut.execute({
      recipentId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    })

    expect(result.isRight())
    expect(inMemoryNotificationRepository.items[0].readAt).toEqual(
      expect.any(Date),
    )
  })

  it('should not be able to read a notification from another user', async () => {
    const notification = makeNotification({
      recipientId: new UniqueEntityID('recipent-1'),
    })

    await inMemoryNotificationRepository.create(notification)

    const result = await sut.execute({
      notificationId: notification.id.toString(),
      recipentId: 'recipent-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
