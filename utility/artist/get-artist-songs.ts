import type { z } from 'zod';
import { HTTPException } from 'hono/http-exception';


import { useFetch } from '../../helpers';
import type { UC } from '../../common/types';
import { Endpoints } from '../../common/endpoints';
import { createSongPayload } from '../../helpers/track.helper';
import type { ArtistSongAPISchema, ArtistSongSchema } from '../../schemas/artist';


export interface GetArtistSongsArgs {
    artistId: string
    page: number
    sortBy: 'popularity' | 'latest' | 'alphabetical'
    sortOrder: 'asc' | 'desc'
}


export class GetArtistSongsUC implements UC<GetArtistSongsArgs, z.infer<typeof ArtistSongSchema>> {
    constructor() {}

    async execute({ artistId, page, sortOrder, sortBy }: GetArtistSongsArgs) {
        const { data } = await useFetch<z.infer<typeof ArtistSongAPISchema>>({
            endpoint: Endpoints.artists.songs,
            params: {
                artistId,
                page,
                sort_order: sortOrder,
                category: sortBy
            }
        });

        if (!data) throw new HTTPException(404, { message: 'artist songs not found' });
        return {
            total: data.topSongs.total,
            songs: data.topSongs.songs.map((song) => createSongPayload(song))
        }
    }
}