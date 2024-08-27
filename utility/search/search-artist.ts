import type { z } from 'zod';
import { HTTPException } from 'hono/http-exception';

import { useFetch } from '../../helpers';
import type { UC } from '../../common/types';
import { Endpoints } from '../../common/endpoints';
import { createArtistMapPayload } from '../../helpers/artist.helper';
import type { SearchArtistAPISchema, SearchArtistSchema } from '../../schemas/search';


export interface SearchArtistsArgs {
    query: string
    page: number
    limit: number
}



export class SearchArtistsUC implements UC<SearchArtistsArgs, z.infer<typeof SearchArtistSchema>> {
    constructor() {}

    async execute({ query, limit, page }: SearchArtistsArgs): Promise<z.infer<typeof SearchArtistSchema>> {
        const { data } = await useFetch<z.infer<typeof SearchArtistAPISchema>>({
            endpoint: Endpoints.search.artists,
            params: {
                q: query,
                p: page,
                n: limit
            }
        });

        if (!data) throw new HTTPException(404, { message: 'artist not found' });
        return {
            total: data.total,
            start: data.start,
            results: data.results?.map(createArtistMapPayload).slice(0, limit) || []
        }
    }
}