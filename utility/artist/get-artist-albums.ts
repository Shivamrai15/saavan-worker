import type { z } from 'zod';
import { HTTPException } from 'hono/http-exception';


import { useFetch } from '../../helpers';
import type { UC } from '../../common/types';
import { Endpoints } from '../../common/endpoints';
import { createAlbumPayload } from '../../helpers/album.helper';
import type { ArtistAlbumAPISchema, ArtistAlbumSchema } from '../../schemas/artist';



export interface GetArtistAlbumsArgs {
    artistId: string
    page: number
    sortBy: 'popularity' | 'latest' | 'alphabetical'
    sortOrder: 'asc' | 'desc'
}


export class GetArtistAlbumsUC implements UC<GetArtistAlbumsArgs, z.infer<typeof ArtistAlbumSchema>> {
    constructor() {}

    async execute({ artistId, page, sortOrder, sortBy }: GetArtistAlbumsArgs) {
        const { data } = await useFetch<z.infer<typeof ArtistAlbumAPISchema>>({
            endpoint: Endpoints.artists.albums,
            params: {
                artistId,
                page,
                sort_order: sortOrder,
                category: sortBy
            }
        });

        if (!data) throw new HTTPException(404, { message: 'artist albums not found' });
        return {
            total: data.topAlbums.total,
            albums: data.topAlbums.albums.map((album) => createAlbumPayload(album))
        }
    }
}