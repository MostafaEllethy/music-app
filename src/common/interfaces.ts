export interface SearchResponse {
  artists: Artists;
  tracks: Tracks;
}

export type Song = ArtistSong | Track;

export interface Track {
  artists?: Artist[];
  images: Images;
  subtitle: string;
  title: string;
  key: string;
  hub: Hub;
}

export interface Artist {
  adamid: string;
}

export interface Images {
  background: string;
  coverart: string;
}

export interface Hub {
  actions: Action[];
}

export interface Action {
  uri?: string;
}

export interface Tracks {
  hits: TracksHit[];
}

export interface TracksHit {
  track: Track;
}

export interface Artists {
  hits: ArtistsHit[];
}

export interface ArtistsHit {
  artist: HitArtist;
}

export interface HitArtist {
  adamid: string;
  avatar: string;
  name: string;
}

export interface ArtistDetails {
  artists: { [key: string]: { attributes: ArtistAttributes } };
  songs: { [key: string]: ArtistSong };
}

export interface ArtistSong {
  attributes?: SongAttributes;
}

export interface SongAttributes {
  albumName?: string;
  name: string;
  artistName: string;
  artwork: Artwork;
  url: string;
  previews?: Preview[];
}

export interface ArtistAttributes {
  artwork: Artwork;
  genreNames: string[];
  name: string;
  url: string;
}

export interface Artwork {
  height: number;
  url: string;
  width: number;
}

export interface Preview {
  url: string;
}

export interface GeoLocation {
  country_code2: string;
  country_name: string;
}
