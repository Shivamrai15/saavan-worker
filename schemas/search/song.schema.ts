import { z } from 'zod';
import { SongAPISchema, SongSchema } from '@/schemas/song';


export const SearchSongAPISchema = z.object({
    total: z.number(),
    start: z.number(),
    results: z.array(SongAPISchema)
});


export const SearchSongSchema = z.object({
    total: z.number(),
    start: z.number(),
    results: z.array(SongSchema)
});