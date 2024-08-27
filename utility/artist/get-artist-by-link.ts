import type { z } from 'zod';
import { HTTPException } from 'hono/http-exception';


import { useFetch } from '../../helpers';
import type { UC } from '../../common/types';
import { Endpoints } from '../../common/endpoints';
import { createArtistPayload } from '../../helpers/artist.helper';
import type { ArtistAPISchema, ArtistSchema } from '../../schemas/artist';


export interface GetArtistByLinkArgs {
    token: string
    page: number
    songCount: number
    albumCount: number
    sortBy: 'popularity' | 'latest' | 'alphabetical'
    sortOrder: 'asc' | 'desc'
}


export class GetArtistByLinkUC implements UC<GetArtistByLinkArgs, z.infer<typeof ArtistSchema>> {
    constructor() {}

    async execute({ token, page, songCount, albumCount, sortBy, sortOrder }: GetArtistByLinkArgs) {
        const { data } = await useFetch<z.infer<typeof ArtistAPISchema>>({
            endpoint: Endpoints.artists.link,
            params: {
                token,
                n_song: songCount,
                n_album: albumCount,
                page,
                sort_order: sortOrder,
                category: sortBy,
                type: 'artist'
            }
        });

        if (!data) throw new HTTPException(404, { message: 'artist not found' });
        return createArtistPayload(data);
    }
}