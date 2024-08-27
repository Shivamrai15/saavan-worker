import type { z } from 'zod';
import { HTTPException } from 'hono/http-exception';

import { Endpoints } from '../../common/endpoints';
import { useFetch } from '../../helpers';
import type { UC } from '../../common/types';
import { createPlaylistPayload } from '../../helpers/playlist.helper';
import type { PlaylistAPISchema, PlaylistSchema } from '../../schemas/playlist';


export interface GetPlaylistByIdArgs {
    id: string
    limit: number
    page: number
}



export class GetPlaylistByIdUC implements UC<GetPlaylistByIdArgs, z.infer<typeof PlaylistSchema>> {
    constructor() {}

    async execute({ id, limit, page }: GetPlaylistByIdArgs) {
        const { data } = await useFetch<z.infer<typeof PlaylistAPISchema>>({
            endpoint: Endpoints.playlists.id,
            params: {
                listid: id,
                n: limit,
                p: page
            }
        })

        if (!data) throw new HTTPException(404, { message: 'playlist not found' });

        const playlist = createPlaylistPayload(data);
        return {
            ...playlist,
            songCount: playlist?.songs?.length || null,
            songs: playlist?.songs?.slice(0, limit) || []
        }
    }
}