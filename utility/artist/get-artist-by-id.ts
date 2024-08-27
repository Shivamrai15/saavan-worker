import type { z } from 'zod';
import { HTTPException } from 'hono/http-exception';


import { useFetch } from '../../helpers';
import type { UC } from '../../common/types';
import { Endpoints } from '../../common/endpoints';
import { createArtistPayload } from '../../helpers/artist.helper';
import type { ArtistAPISchema, ArtistSchema } from '../../schemas/artist';


export interface GetArtistByIdArgs {
    artistId: string
    page: number
    songCount: number
    albumCount: number
    sortBy: 'popularity' | 'latest' | 'alphabetical'
    sortOrder: 'asc' | 'desc'
}


export class GetArtistByIdUC implements UC<GetArtistByIdArgs, z.infer<typeof ArtistSchema>> {
    constructor() {}

    async execute({ artistId, page, songCount, albumCount, sortBy, sortOrder }: GetArtistByIdArgs) {
        const { data } = await useFetch<z.infer<typeof ArtistAPISchema>>({
            endpoint: Endpoints.artists.id,
            params: {
                artistId,
                n_song: songCount,
                n_album: albumCount,
                page,
                sort_order: sortOrder,
                category: sortBy
            }
        });

        if (!data) throw new HTTPException(404, { message: 'artist not found' });
        return createArtistPayload(data);
    }
}