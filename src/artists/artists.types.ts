export interface Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

export interface CreateArtist {
  name: string;
  grammy: boolean;
}
