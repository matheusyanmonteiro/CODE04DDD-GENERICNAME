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
})
