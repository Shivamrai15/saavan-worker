import type { z } from 'zod';
import { HTTPException } from 'hono/http-exception';

import { useFetch } from '../../helpers';
import type { UC } from '../../common/types';
import { Endpoints } from '../../common/endpoints';
import { createAlbumPayload } from '../../helpers/album.helper';
import type { AlbumAPISchema, AlbumSchema } from '../../schemas/album';

export class GetAlbumByLinkUC implements UC<string, z.infer<typeof AlbumSchema>> {
    constructor() {}

    async execute(token: string) {
        const { data } = await useFetch<z.infer<typeof AlbumAPISchema>>({
            endpoint: Endpoints.albums.link,
            params: {
                token,
                type: 'album'
            }
        });

        if (!data) throw new HTTPException(404, { message: 'album not found' });
        return createAlbumPayload(data);
    }
}