import { z } from 'zod';
import { DownloadSchema } from '@/common/schema'
import { ArtistMapAPISchema, ArtistMapSchema } from '@/schemas/artist/map.schema';
import { LyricsSchema } from './lyrics.schema';


export const SongAPISchema = z.object({
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
    list: z.string(),
    more_info: z.object({
        music: z.string(),
        album_id: z.string(),
        album: z.string(),
        label: z.string(),
        origin: z.string(),
        is_dolby_content: z.boolean(),
        '320kbps': z.string(),
        encrypted_media_url: z.string(),
        encrypted_cache_url: z.string(),
        album_url: z.string(),
        duration: z.string(),
        rights: z.object({
        code: z.string(),
        cacheable: z.string(),
        delete_cached_object: z.string(),
        reason: z.string()
        }),
        cache_state: z.string(),
        has_lyrics: z.string(),
        lyrics_snippet: z.string(),
        starred: z.string(),
        copyright_text: z.string(),
        artistMap: z.object({
        primary_artists: z.array(ArtistMapAPISchema),
        featured_artists: z.array(ArtistMapAPISchema),
        artists: z.array(ArtistMapAPISchema)
        }),
        release_date: z.string(),
        label_url: z.string(),
        vcode: z.string(),
        vlink: z.string(),
        triller_available: z.boolean(),
        request_jiotune_flag: z.boolean(),
        webp: z.string(),
        lyrics_id: z.string()
    })
});


export const SongSchema = z.object({
    id: z.string(),
    name: z.string(),
    type: z.string(),
    year: z.string().nullable(),
    releaseDate: z.string().nullable(),
    duration: z.number().nullable(),
    label: z.string().nullable(),
    explicitContent: z.boolean(),
    playCount: z.number().nullable(),
    language: z.string(),
    hasLyrics: z.boolean(),
    lyricsId: z.string().nullable(),
    lyrics: LyricsSchema.optional(),
    url: z.string(),
    copyright: z.string().nullable(),
    album: z.object({
        id: z.string().nullable(),
        name: z.string().nullable(),
        url: z.string().nullable()
    }),
    artists: z.object({
        primary: z.array(ArtistMapSchema),
        featured: z.array(ArtistMapSchema),
        all: z.array(ArtistMapSchema)
    }),
    image: z.array(DownloadSchema),
    downloadUrl: z.array(DownloadSchema)
});