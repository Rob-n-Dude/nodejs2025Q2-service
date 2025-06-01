export class AddTrackToFavoritesEvent {
  constructor(
    public readonly trackId: string,
    public readonly callback: (exists: boolean) => Promise<void>,
  ) {}
}
