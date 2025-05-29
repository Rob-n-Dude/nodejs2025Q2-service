export interface Repository<I> {
  findById(id: string): Promise<I | null>;
  findAll(): Promise<I[]>;
  create(item: I): Promise<I>;
  update(id: string, item: Partial<I>): Promise<I | null>;
  delete(id: string): Promise<boolean>;
}
