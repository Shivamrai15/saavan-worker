import { z } from 'zod';


export const LyricsSchema = z.object({
    lyrics: z.string(),
    copyright: z.string(),
    snippet: z.string()
});


export const LyricsAPIResponseSchema = z.object({
    lyrics: z.string(),
    lyrics_copyright: z.string(),
    snippet: z.string()
});