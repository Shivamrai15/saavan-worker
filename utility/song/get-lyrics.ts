import type { z } from 'zod';
import { HTTPException } from 'hono/http-exception';

import { useFetch } from '../../helpers';
import { Endpoints } from '../../common/endpoints';
import { createSongLyricsPayload } from '../../helpers/track.helper';
import type { UC } from '../../common/types';
import type { LyricsAPIResponseSchema, LyricsSchema } from '../../schemas/song';

export class GetSongLyricsUC implements UC<string, z.infer<typeof LyricsSchema>> {
    constructor() {}

    async execute(songId: string) {
        const { data } = await useFetch<z.infer<typeof LyricsAPIResponseSchema>>({
            endpoint: Endpoints.songs.lyrics,
            params: {
                    lyrics_id: songId
                }
        });

        if (!data.lyrics) throw new HTTPException(404, { message: 'lyrics not found' });
        return createSongLyricsPayload(data);
    }
}