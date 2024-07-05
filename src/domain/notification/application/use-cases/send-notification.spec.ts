import { InMemoryNotificationsRepository } from 'test/repository/in-memory-notifications-repository'
import { SendNotificationUseCase } from './send-notification'

let inMemoryNotificationRepository: InMemoryNotificationsRepository
let sut: SendNotificationUseCase

describe('Send Notification', () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationsRepository()

    sut = new SendNotificationUseCase(inMemoryNotificationRepository)
  })

  it('should be able to send a notification ', async () => {
    const result = await sut.execute({
      recipentId: '1',
      title: 'New Notification',
      content: 'content notification.',
    })

    expect(result.isRight())
    expect(inMemoryNotificationRepository.items[0]).toEqual(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (result.value as unknown as { notification: any })?.notification,
    )
  })
})
