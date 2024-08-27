import type { z } from 'zod';
import { HTTPException } from 'hono/http-exception';

import { useFetch } from '../../helpers';
import type { UC } from '../../common/types';
import { Endpoints } from '../../common/endpoints';
import { createSearchPlaylistPayload } from '../../helpers/search.helper';
import type { SearchPlaylistAPISchema, SearchPlaylistSchema } from '../../schemas/search';


export interface SearchPlaylistsArgs {
    query: string
    page: number
    limit: number
}


export class SearchPlaylistsUC implements UC<SearchPlaylistsArgs, z.infer<typeof SearchPlaylistSchema>> {
    constructor() {}

    async execute({ query, limit, page }: SearchPlaylistsArgs): Promise<z.infer<typeof SearchPlaylistSchema>> {
        const { data } = await useFetch<z.infer<typeof SearchPlaylistAPISchema>>({
            endpoint: Endpoints.search.playlists,
            params: {
                q: query,
                p: page,
                n: limit
            }
        });

        if (!data) throw new HTTPException(404, { message: 'playlist not found' });
        return createSearchPlaylistPayload(data);
    }
}