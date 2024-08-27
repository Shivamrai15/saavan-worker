import type { z } from 'zod';
import { HTTPException } from 'hono/http-exception';

import { Endpoints } from '../../common/endpoints';
import { useFetch } from '../../helpers';
import type { UC } from '../../common/types';
import { createPlaylistPayload } from '../../helpers/playlist.helper';
import type { PlaylistAPISchema, PlaylistSchema } from '../../schemas/playlist';

export interface GetPlaylistByLinkArgs {
    token: string
    limit: number
    page: number
}

export class GetPlaylistByLinkUC implements UC<GetPlaylistByLinkArgs, z.infer<typeof PlaylistSchema>> {
    constructor() {}

    async execute({ token, limit, page }: GetPlaylistByLinkArgs) {
        const { data } = await useFetch<z.infer<typeof PlaylistAPISchema>>({
            endpoint: Endpoints.albums.link,
            params: {
                token,
                n: limit,
                p: page,
                type: 'playlist'
            }
        });

        if (!data) throw new HTTPException(404, { message: 'playlist not found' });

        const playlist = createPlaylistPayload(data);
        return {
            ...playlist,
            songCount: playlist?.songs?.length || null,
            songs: playlist?.songs?.slice(0, limit) || []
        }
    }
}