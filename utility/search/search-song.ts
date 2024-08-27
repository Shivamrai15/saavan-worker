import type { z } from 'zod';

import { useFetch } from '../../helpers';
import type { UC } from '../../common/types';
import { Endpoints } from '../../common/endpoints';
import { createSongPayload } from '../../helpers/track.helper';
import type { SearchSongAPISchema, SearchSongSchema } from '../../schemas/search';


export interface SearchSongsArgs {
    query: string
    page: number
    limit: number
}



export class SearchSongsUC implements UC<SearchSongsArgs, z.infer<typeof SearchSongSchema>> {
    constructor() {}

    async execute({ query, limit, page }: SearchSongsArgs): Promise<z.infer<typeof SearchSongSchema>> {
        const { data } = await useFetch<z.infer<typeof SearchSongAPISchema>>({
            endpoint: Endpoints.search.songs,
            params: {
                q: query,
                p: page,
                n: limit
            }
        });

        return {
            total: data.total,
            start: data.start,
            results: data.results?.map(createSongPayload).slice(0, limit) || []
        }
    }
}