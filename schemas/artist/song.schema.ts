import { z } from 'zod';
import { SongAPISchema, SongSchema } from '@/schemas/song';

export const ArtistSongAPISchema = z.object({
    artistId: z.string(),
    name: z.string(),
    subtitle: z.string(),
    image: z.string(),
    follower_count: z.string(),
    type: z.string(),
    isVerified: z.boolean(),
    dominantLanguage: z.string(),
    dominantType: z.string(),
    topSongs: z.object({
        songs: z.array(SongAPISchema),
        total: z.number()
    })
})

export const ArtistSongSchema = z.object({
    total: z.number(),
    songs: z.array(SongSchema)
})