import type { z } from 'zod';
import { HTTPException } from 'hono/http-exception';

import { useFetch } from '../../helpers';
import type { UC } from '../../common/types';
import { Endpoints } from '../../common/endpoints';
import { createSearchPayload } from '../../helpers/search.helper';
import type { SearchAPISchema, SearchSchema } from '../../schemas/search';


export class SearchGlobalUC implements UC<string, z.infer<typeof SearchSchema>> {
    async execute(query: string): Promise<z.infer<typeof SearchSchema>> {
        const { data } = await useFetch<z.infer<typeof SearchAPISchema>>({
            endpoint: Endpoints.search.all,
            params: { query }
        });

        if (!data) throw new HTTPException(404, { message: `no results found for ${query}` });
        return createSearchPayload(data);
    }
}