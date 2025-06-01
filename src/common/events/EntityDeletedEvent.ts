import { EntityKey } from '../EntityKey';

export class EntityDeletedEvent {
  constructor(
    public readonly key: EntityKey,
    public readonly id: string,
  ) {}
}
