import { z } from 'zod';
import { DownloadSchema } from '@/common/schema';

export const ArtistMapAPISchema = z.object({
    id: z.string(),
    name: z.string(),
    role: z.string(),
    type: z.string(),
    image: z.string(),
    perma_url: z.string()
})

export const ArtistMapSchema = z.object({
    id: z.string(),
    name: z.string(),
    role: z.string(),
    type: z.string(),
    image: z.array(DownloadSchema),
    url: z.string()
})