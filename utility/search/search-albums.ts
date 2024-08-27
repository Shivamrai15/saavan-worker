import type { z } from 'zod';

import { useFetch } from '../../helpers';
import type { UC } from '../../common/types';
import { Endpoints } from '../../common/endpoints';
import { createSearchAlbumPayload } from '../../helpers/search.helper';
import type { SearchAlbumAPISchema, SearchAlbumSchema } from '../../schemas/search';


export interface SearchAlbumsArgs {
    query: string
    page: number
    limit: number
}


export class SearchAlbumsUC implements UC<SearchAlbumsArgs, z.infer<typeof SearchAlbumSchema>> {
    constructor() {}

    async execute({ query, limit, page }: SearchAlbumsArgs): Promise<z.infer<typeof SearchAlbumSchema>> {
        const { data } = await useFetch<z.infer<typeof SearchAlbumAPISchema>>({
            endpoint: Endpoints.search.albums,
            params: {
                q: query,
                p: page,
                n: limit
            }
        });
        return createSearchAlbumPayload(data);
    }
}