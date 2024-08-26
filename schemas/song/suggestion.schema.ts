import { z } from 'zod';
import { SongAPISchema } from './song.schema';

const SongStationAPISchema = z.record(
    z.string(),
    z.object({
        song: SongAPISchema
    })
);

export const SongSuggestionAPISchema = z.object({
    stationid: z.string()
}).and(SongStationAPISchema);