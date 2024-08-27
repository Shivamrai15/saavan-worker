import type { z } from 'zod';
import { HTTPException } from 'hono/http-exception';

import { useFetch } from '../../helpers';
import { Endpoints } from '../../common/endpoints';
import type { UC } from '../../common/types';
import { createSongPayload } from '../../helpers/track.helper';
import type { SongAPISchema, SongSchema } from '../../schemas/song';


export class GetSongByLinkUC implements UC<string, z.infer<typeof SongSchema>[]> {
    constructor() {}

    async execute(token: string) {
        const { data } = await useFetch<{ songs: z.infer<typeof SongAPISchema>[] }>({
        endpoint: Endpoints.songs.link,
        params: {
                token,
                type: 'song'
            }
        });

        if (!data.songs?.length) throw new HTTPException(404, { message: 'track not found' });
        return data.songs.map((song) => createSongPayload(song));
    }
}