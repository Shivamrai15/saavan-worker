import {
    GetArtistAlbumsUC,
    GetArtistByIdUC,
    GetArtistByLinkUC,
    GetArtistSongsUC,
    type GetArtistAlbumsArgs,
    type GetArtistByIdArgs,
    type GetArtistByLinkArgs,
    type GetArtistSongsArgs
} from '../../utility/artist';

  
export class ArtistService {
    private readonly getArtistByIdUC: GetArtistByIdUC;
    private readonly getArtistByLinkUC: GetArtistByLinkUC;
    private readonly getArtistSongsUC: GetArtistSongsUC;
    private readonly getArtistAlbumsUC: GetArtistAlbumsUC;
  
    constructor() {
        this.getArtistByIdUC = new GetArtistByIdUC();
        this.getArtistByLinkUC = new GetArtistByLinkUC();
        this.getArtistSongsUC = new GetArtistSongsUC();
        this.getArtistAlbumsUC = new GetArtistAlbumsUC();
    }
  
    getArtistById = (args: GetArtistByIdArgs) => {
        return this.getArtistByIdUC.execute(args);
    }
  
    getArtistByLink = (args: GetArtistByLinkArgs) => {
        return this.getArtistByLinkUC.execute(args);
    }
  
    getArtistSongs = (args: GetArtistSongsArgs) => {
        return this.getArtistSongsUC.execute(args);
    }
  
    getArtistAlbums = (args: GetArtistAlbumsArgs) => {
        return this.getArtistAlbumsUC.execute(args);
    }
}