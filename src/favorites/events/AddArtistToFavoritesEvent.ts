export class AddArtistToFavoritesEvent {
  constructor(
    public readonly id: string,
    public readonly callback: (exists: boolean) => Promise<void>,
  ) {}
}
