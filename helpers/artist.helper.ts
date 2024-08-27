import type { z } from 'zod';

import type {
    ArtistSchema,
    ArtistAPISchema,
    ArtistMapSchema,
    ArtistMapAPISchema,
} from '../schemas/artist';
import { createImageLinks } from './link.helper';
import { createAlbumPayload } from './album.helper';
import { createSongPayload } from './track.helper';


export const createArtistPayload = (artist: z.infer<typeof ArtistAPISchema>): z.infer<typeof ArtistSchema> => ({
    id: artist.artistId || artist.id,
    name: artist.name,
    url: artist.urls?.overview || artist.perma_url,
    type: artist.type,
    followerCount: artist.follower_count ? Number(artist.follower_count) : null,
    fanCount: artist.fan_count || null,
    isVerified: artist.isVerified || null,
    dominantLanguage: artist.dominantLanguage || null,
    dominantType: artist.dominantType || null,
    bio: artist.bio ? JSON.parse(artist.bio) : null,
    dob: artist.dob || null,
    fb: artist.fb || null,
    twitter: artist.twitter || null,
    wiki: artist.wiki || null,
    availableLanguages: artist.availableLanguages || null,
    isRadioPresent: artist.isRadioPresent || null,
    image: createImageLinks(artist.image),
    topSongs: artist.topSongs?.map(createSongPayload) || null,
    topAlbums: artist.topAlbums?.map(createAlbumPayload) || null,
    singles: artist.singles?.map(createSongPayload) || null,
    similarArtists:
        artist.similarArtists?.map((similarArtist) => ({
        id: similarArtist.id,
        name: similarArtist.name,
        url: similarArtist.perma_url,
        image: createImageLinks(similarArtist.image_url),
        languages: similarArtist.languages ? JSON.parse(similarArtist.languages) : null,
        wiki: similarArtist.wiki,
        dob: similarArtist.dob,
        fb: similarArtist.fb,
        twitter: similarArtist.twitter,
        isRadioPresent: similarArtist.isRadioPresent,
        type: similarArtist.type,
        dominantType: similarArtist.dominantType,
        aka: similarArtist.aka,
        bio: similarArtist.bio ? JSON.parse(similarArtist.bio) : null,
        similarArtists: similarArtist.similar ? JSON.parse(similarArtist.similar) : null
        })) || null
});


export const createArtistMapPayload = (
    artist: z.infer<typeof ArtistMapAPISchema>
): z.infer<typeof ArtistMapSchema> => ({
    id: artist.id,
    name: artist.name,
    role: artist.role,
    image: createImageLinks(artist.image),
    type: artist.type,
    url: artist.perma_url
});