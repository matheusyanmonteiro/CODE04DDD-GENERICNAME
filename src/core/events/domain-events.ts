import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityID } from '../entities/unique-entity-id'
import { DomainEvent } from './domain-event'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DomainEventCallBack = (event: any) => void

export class DomainEvents {
  private static handlersMap: Record<string, DomainEventCallBack[]> = {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static markedAggregates: AggregateRoot<any>[] = []

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static markAggregateForDispatch(aggregate: AggregateRoot<any>) {
    const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id)

    if (!aggregateFound) {
      this.markedAggregates.push(aggregate)
    }
  }

  private static dispatchAggregateEvents(aggregate: AggregateRoot<any>) {
    aggregate.domainEvents.forEach((event: DomainEvent) =>
      this.dispatchAggregateEvents(event),
    )
  }

  private static removeAggregateFormMarkedDispatchList(
    aggregate: AggregateRoot<any>,
  ) {
    const index = this.markedAggregates.findIndex((a) => a.equals(aggregate))

    this.markedAggregates.splice(index, 1)
  }

  private static findMarkedAggregateByID(
    id: UniqueEntityID,
  ): AggregateRoot<any> | undefined {
    return this.markedAggregates.find((aggregate) => aggregate.id.equals(id))
  }
}
