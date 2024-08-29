import { z } from 'zod';
import { ArtistMapSchema } from '@/schemas/artist';
import { DownloadSchema } from '@/common/schema';
import { SongAPISchema, SongSchema } from '@/schemas/song';


export const PlaylistAPISchema = z.object({
    id: z.string(),
    title: z.string(),
    subtitle: z.string(),
    header_desc: z.string(),
    type: z.string(),
    perma_url: z.string(),
    image: z.string(),
    language: z.string(),
    year: z.string(),
    play_count: z.string(),
    explicit_content: z.string(),
    list_count: z.string(),
    list_type: z.string(),
    list: z.array(SongAPISchema),
    more_info: z.object({
        uid: z.string(),
        is_dolby_content: z.boolean(),
        subtype: z.array(z.string()).default([]),
        last_updated: z.string(),
        username: z.string(),
        firstname: z.string(),
        lastname: z.string(),
        is_followed: z.string(),
        isFY: z.boolean(),
        follower_count: z.string(),
        fan_count: z.string(),
        playlist_type: z.string(),
        share: z.string(),
        sub_types: z.array(z.string()),
        images: z.array(z.string()),
        H2: z.string().nullable(),
        subheading: z.string(),
        video_count: z.string(),
        artists: z.array(
            z.object({
            id: z.string(),
            name: z.string(),
            role: z.string(),
            image: z.string(),
            type: z.string(),
            perma_url: z.string()
            })
        )
        })
    }).extend({
        description: z.string()
})


export const PlaylistSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    year: z.number().nullable(),
    type: z.string(),
    playCount: z.number().nullable(),
    language: z.string(),
    explicitContent: z.boolean(),
    songCount: z.number().nullable(),
    url: z.string(),
    image: z.array(DownloadSchema),
    songs: z.array(SongSchema).nullable(),
    artists: z.array(ArtistMapSchema).nullable()
});