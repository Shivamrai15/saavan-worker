import type { z } from 'zod';
import { HTTPException } from 'hono/http-exception';

import { useFetch } from '../../helpers';
import type { UC } from '../../common/types';
import { Endpoints } from '../../common/endpoints';
import { createAlbumPayload } from '../../helpers/album.helper';
import type { AlbumAPISchema, AlbumSchema } from '../../schemas/album';



export class GetAlbumByIdUC implements UC<string, z.infer<typeof AlbumSchema>> {
    constructor() {}

    async execute(id: string) {
        const { data } = await useFetch<z.infer<typeof AlbumAPISchema>>({
            endpoint: Endpoints.albums.id,
            params: { albumid: id }
        });

        if (!data) throw new HTTPException(404, { message: 'album not found' });
        return createAlbumPayload(data);
    }
}