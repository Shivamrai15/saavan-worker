import type { z } from 'zod';
import { HTTPException } from 'hono/http-exception';


import { useFetch } from '../../helpers';
import type { UC } from '../../common/types';
import { Endpoints } from '../../common/endpoints';
import { createSongPayload } from '../../helpers/track.helper';
import { GetSongLyricsUC } from './get-lyrics';
import type { SongAPISchema, SongSchema } from '../../schemas/song';


export interface GetSongByIdArgs {
    songIds: string
    includeLyrics?: boolean
}


export class GetSongByIdUC implements UC<GetSongByIdArgs, z.infer<typeof SongSchema>[]> {
    private readonly getSongLyricsUC: GetSongLyricsUC

    constructor() {
        this.getSongLyricsUC = new GetSongLyricsUC()
    }

    async execute({ songIds, includeLyrics }: GetSongByIdArgs) {
        const { data } = await useFetch<{ songs: z.infer<typeof SongAPISchema>[] }>({
        endpoint: Endpoints.songs.id,
        params: {
                pids: songIds
            }
        });

        if (!data.songs?.length) throw new HTTPException(404, { message: 'song not found' });
        const songs = data.songs.map((song) => createSongPayload(song));

        if (includeLyrics) {
        await Promise.all(
                songs.map(async (song) => {
                song.lyrics = await this.getSongLyricsUC.execute(song.id)
            })
        )}

        return songs;
    }
}