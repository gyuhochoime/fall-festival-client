export interface Song {
  id: number;
  title: string;
  link: string;
  image: string;
}

export interface Artist {
  id: number;
  name: string;
  genre: string;
  image: string;
  songs: Song[];
}

export interface ArtistApiResponse {
  status: string;
  data: Artist;
  message: string;
}

export interface Performance {
  id: number;
  artistId: number;
  day: string;
  startTime: string;
  endTime: string;
}

export interface PerformanceApiResponse {
  status: string;
  data: Performance[];
  message: string;
}

export interface PerformanceWithArtist {
  id: number;
  artistId: number;
  day: string;
  startTime: string;
  endTime: string;
  artist: Artist;
}
