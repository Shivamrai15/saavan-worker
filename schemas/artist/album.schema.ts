import { z } from 'zod';
import { AlbumAPIResponseModel, AlbumModel } from '#modules/albums/models';


export const ArtistAlbumAPISchema = z.object({
    artistId: z.string(),
    name: z.string(),
    subtitle: z.string(),
    image: z.string(),
    follower_count: z.string(),
    type: z.string(),
    isVerified: z.boolean(),
    dominantLanguage: z.string(),
    dominantType: z.string(),
    topAlbums: z.object({
        albums: z.array(AlbumAPIResponseModel),
        total: z.number()
    })
})


export const ArtistAlbumSchema = z.object({
    total: z.number(),
    albums: z.array(AlbumModel)
})