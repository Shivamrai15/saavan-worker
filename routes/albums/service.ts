import { GetAlbumByIdUC, GetAlbumByLinkUC } from '../../utility/album';

export class AlbumService {
    private readonly getAlbumByIdUC: GetAlbumByIdUC;
    private readonly getAlbumByLinkUC: GetAlbumByLinkUC;

    constructor() {
        this.getAlbumByIdUC = new GetAlbumByIdUC();
        this.getAlbumByLinkUC = new GetAlbumByLinkUC();
    }

    getAlbumById = (albumId: string) => {
        return this.getAlbumByIdUC.execute(albumId);
    }

    getAlbumByLink = (albumLink: string) => {
        return this.getAlbumByLinkUC.execute(albumLink);
    }
}