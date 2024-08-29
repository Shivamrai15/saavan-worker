import { z } from 'zod';
import type { hc } from 'hono/client';
import { createRoute, OpenAPIHono } from '@hono/zod-openapi';

import type { Routes } from '../../common/types';
import { SongService } from './service';
import { LyricsSchema, SongSchema } from '../../schemas/song';



export class SongRoute implements Routes {
    public controller: OpenAPIHono;
    public static songClient: typeof hc;
    private songService: SongService;

    constructor() {
        this.controller = new OpenAPIHono();
        this.songService = new SongService();
    }

    public initRoutes() {
        this.controller.openapi(
        createRoute({
            method: 'get',
            path: '/tracks',
            tags: ['Track'],
            summary: 'Retrieve track by ID or link',
            description: 'Retrieve tracks by a comma-separated list of IDs',
            operationId: 'getSongByIdsOrLink',
            request: {
            query: z.object({
                ids: z.string().optional().openapi({
                    title: 'Track IDs',
                    description: 'Comma-separated list of track IDs',
                    type: 'string',
                    example: 'bovWQRQP,4IoDK8qI,5IoDK8qI'
                }),
                link: z
                .string()
                .url()
                .optional()
                .transform((value) => value?.match(/jiosaavn\.com\/song\/[^/]+\/([^/]+)$/)?.[1])
                .openapi({
                    title: 'Track Link',
                    description: 'A direct link to the track on JioSaavn',
                    type: 'string',
                    example: 'https://www.jiosaavn.com/song/mi-amor/EgcdZiViZmM'
                })
            })
            },
            responses: {
            200: {
                description: 'Successful response with track details',
                content: {
                'application/json': {
                    schema: z.object({
                    success: z.boolean().openapi({
                        description: 'Indicates whether the request was successful',
                        type: 'boolean',
                        example: true
                    }),
                    data: z.array(SongSchema).openapi({
                        title: 'Track Details',
                        description: 'Array of track details'
                    })
                    })
                }
                }
            },
            400: { description: 'Bad request when query parameters are missing or invalid' },
            404: { description: 'Track not found with the given ID or link' }
            }
        }),
        async (ctx) => {
            const { link, ids } = ctx.req.valid('query')

            if (!link && !ids) {
            return ctx.json({ success: false, message: 'Either track IDs or link is required' }, 400)
            }

            const response = link
            ? await this.songService.getSongByLink(link)
            : await this.songService.getSongByIds({ songIds: ids! })

            return ctx.json({ success: true, data: response })
        }
        )

        this.controller.openapi(
        createRoute({
            method: 'get',
            path: '/track/{id}',
            tags: ['Tracks'],
            summary: 'Retrieve track by ID',
            description: 'Retrieve a track by its ID. Optionally, include lyrics in the response.',
            operationId: 'getSongById',
            request: {
            params: z.object({
                    id: z.string().openapi({
                    title: 'Track ID',
                    description: 'ID of the track to retrieve',
                    type: 'string',
                    example: 'bovWQRQP'
                })
            }),
            query: z.object({
                lyrics: z.string().optional().openapi({
                title: 'Include lyrics',
                description: 'Include lyrics in the response',
                type: 'boolean',
                example: 'true',
                default: 'false'
                })
            })
            },
            responses: {
            200: {
                description: 'Successful response with track details',
                content: {
                'application/json': {
                    schema: z.object({
                    success: z.boolean().openapi({
                        description: 'Indicates whether the request was successful',
                        type: 'boolean',
                        example: true
                    }),
                    data: z.array(SongSchema).openapi({
                        description: 'Array of tracks'
                    })
                    })
                }
                }
            },
            400: { description: 'Bad request when query parameters are missing or invalid' },
            404: { description: 'Track not found for the given ID' }
            }
        }),
        async (ctx) => {
            const songId = ctx.req.param('id')
            const { lyrics } = ctx.req.valid('query')

            const response = await this.songService.getSongByIds({ songIds: songId, includeLyrics: lyrics === 'true' })

            return ctx.json({ success: true, data: response })
        }
        )

        this.controller.openapi(
        createRoute({
            method: 'get',
            path: '/track/{id}/lyrics',
            tags: ['Tracks'],
            summary: 'Retrieve lyrics for a track',
            description: 'Retrieve the lyrics for a track by its ID.',
            operationId: 'getSongLyrics',
            request: {
            params: z.object({
                    id: z.string().openapi({
                    description: 'ID of the track to retrieve the lyrics for',
                    type: 'string',
                    example: 'bovWQRQP'
                })
            })
            },
            responses: {
            200: {
                description: 'Successful response with track lyrics',
                content: {
                'application/json': {
                    schema: z.object({
                    success: z.boolean().openapi({
                        description: 'Indicates whether the request was successful',
                        type: 'boolean',
                        example: true
                    }),
                    data: LyricsSchema.openapi({
                        description: 'Lyrics for the track'
                    })
                    })
                }
                }
            },
            404: { description: 'Lyrics not found for the given track ID' }
            }
        }),
        async (ctx) => {
            const id = ctx.req.param('id');
            const result = await this.songService.getSongLyrics(id);
            return ctx.json({ success: true, data: result });
        })

        this.controller.openapi(
        createRoute({
            method: 'get',
            path: '/track/{id}/suggestions',
            tags: ['Tracks'],
            summary: 'Retrieve track suggestions',
            description: 'Retrieve track suggestions based on the given track ID. This can be used to get similar track to the one provided for infinite playback.',
            operationId: 'getSongSuggestions',
            request: {
            params: z.object({
                    id: z.string().openapi({
                    description: 'ID of the track to retrieve suggestions for',
                    type: 'string',
                    example: 'bovWQRQP'
                })
            }),
            query: z.object({
                limit: z.string().pipe(z.coerce.number()).optional().openapi({
                    description: 'Limit the number of suggestions to retrieve',
                    type: 'number',
                    title: 'Limit',
                    example: '10',
                    default: '10'
                })
            })
            },
            responses: {
            200: {
                description: 'Successful response with song suggestions',
                content: {
                'application/json': {
                    schema: z.object({
                    success: z.boolean().openapi({
                        description: 'Indicates whether the request was successful',
                        type: 'boolean',
                        example: true
                    }),
                    data: z.array(SongSchema).openapi({
                        description: 'Array of song suggestions'
                    })
                    })
                }
                }
            }
            }
        }),
        // @ts-ignore
        async (ctx) => {
            const songId = ctx.req.param('id')
            const { limit } = ctx.req.valid('query')
            const suggestions = await this.songService.getSongSuggestions({ songId, limit: limit || 10 })

            return ctx.json({ success: true, data: suggestions })
        })
    }
}