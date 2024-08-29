import type { z } from 'zod';
import { HTTPException } from 'hono/http-exception';

import { useFetch } from '../../helpers';
import { Endpoints } from '../../common/endpoints';
import { createSongPayload } from '../../helpers/track.helper';
import { CreateSongStationUC } from './create-station';
import type { UC } from '../../common/types';
import type { SongSchema, SongSuggestionAPISchema } from '../../schemas/song';


export interface GetSongSuggestionsArgs {
    songId: string
    limit: number
}



export class GetSongSuggestionsUC implements UC<GetSongSuggestionsArgs, z.infer<typeof SongSchema>[]> {
    
    private readonly createSongStation: CreateSongStationUC
    constructor() {
        this.createSongStation = new CreateSongStationUC()
    }

    async execute({ songId, limit }: GetSongSuggestionsArgs) {
        const stationId = await this.createSongStation.execute(songId)

        const { data, ok } = await useFetch<z.infer<typeof SongSuggestionAPISchema>>({
            endpoint: Endpoints.songs.suggestions,
            params: {
                stationid: stationId,
                k: limit
            },
            context: 'android'
        });

        if (!data || !ok) {
            throw new HTTPException(404, { message: `no suggestions found for the given song` })
        }

        const { stationid, ...suggestions } = data

        return (Object.values(suggestions)
            .map((element) => element && createSongPayload(element.song))
            .filter(Boolean)
            .slice(0, limit) || []
        )
    }
}