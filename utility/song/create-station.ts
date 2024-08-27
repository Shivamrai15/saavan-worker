import { HTTPException } from 'hono/http-exception';

import { useFetch } from '../../helpers';
import { Endpoints } from '../../common/endpoints';
import type { UC } from '../../common/types';


export class CreateSongStationUC implements UC<string, string> {
    constructor() {}

    async execute(songId: string) {
        const encodedSongId = JSON.stringify([encodeURIComponent(songId)])
        const { data, ok } = await useFetch<{ stationid: string }>({
        endpoint: Endpoints.songs.station,
        params: {
                entity_id: encodedSongId,
                entity_type: 'queue'
            },
            context: 'android'
        });

        if (!data || !ok || !data.stationid) throw new HTTPException(500, { message: 'could not create station' });

        return data.stationid;
    }
}