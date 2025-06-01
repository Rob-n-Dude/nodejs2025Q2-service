import { EntityKey } from '../EntityKey';

export class GetEntityEvent {
  constructor(
    public readonly key: EntityKey,
    public readonly ids: string[],
    public readonly callback: (entities: unknown[]) => void,
  ) {}
}
