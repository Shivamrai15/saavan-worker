import type { z } from 'zod';
import { createImageLinks } from './link.helper';
import { createSongPayload } from './track.helper';
import { createArtistMapPayload } from './artist.helper';
import type { AlbumAPISchema, AlbumSchema } from '../schemas/album';

export const createAlbumPayload = (album: z.infer<typeof AlbumAPISchema>): z.infer<typeof AlbumSchema> => ({
    id: album.id,
    name: album.title,
    description: album.header_desc,
    type: album.type,
    year: album.year ? Number(album.year) : null,
    playCount: album.play_count ? Number(album.play_count) : null,
    language: album.language,
    explicitContent: album.explicit_content === '1',
    url: album.perma_url,
    songCount: album.more_info.song_count ? Number(album.more_info.song_count) : null,
    artists: {
        primary: album.more_info?.artistMap?.primary_artists?.map(createArtistMapPayload),
        featured: album.more_info?.artistMap?.featured_artists?.map(createArtistMapPayload),
        all: album.more_info?.artistMap?.artists?.map(createArtistMapPayload)
    },
    image: createImageLinks(album.image),
    songs: (album.list && album.list?.map(createSongPayload)) || null
})