import type { z } from 'zod';
import { createImageLinks } from '../helpers';
import { createArtistMapPayload } from './artist.helper'
import { createSongPayload } from './track.helper';
import type { PlaylistAPISchema, PlaylistSchema } from '../schemas/playlist';

export const createPlaylistPayload = (
    playlist: z.infer<typeof PlaylistAPISchema>
): z.infer<typeof PlaylistSchema> => ({
    id: playlist.id,
    name: playlist.title,
    description: playlist.header_desc,
    type: playlist.type,
    year: playlist.year ? Number(playlist.year) : null,
    playCount: playlist.play_count ? Number(playlist.play_count) : null,
    language: playlist.language,
    explicitContent: playlist.explicit_content === '1',
    url: playlist.perma_url,
    songCount: playlist.list_count ? Number(playlist.list_count) : null,
    artists: playlist.more_info.artists?.map(createArtistMapPayload) || null,
    image: createImageLinks(playlist.image),
    songs: (playlist.list && playlist.list?.map(createSongPayload)) || null
});