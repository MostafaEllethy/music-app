import { ArtistSong, Song } from "./interfaces";

export function isArtistSong(song?: Song): song is ArtistSong {
  return (song as ArtistSong)?.attributes?.name !== undefined;
}
