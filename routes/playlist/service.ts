import {
    GetPlaylistByIdUC,
    GetPlaylistByLinkUC,
    type GetPlaylistByIdArgs,
    type GetPlaylistByLinkArgs
} from '../../utility/playlist';
  
export class PlaylistService {
    private readonly getPlaylistByIdUC: GetPlaylistByIdUC;
    private readonly getPlaylistByLinkUC: GetPlaylistByLinkUC;
  
    constructor() {
        this.getPlaylistByIdUC = new GetPlaylistByIdUC();
        this.getPlaylistByLinkUC = new GetPlaylistByLinkUC();
    }
  
    getPlaylistById = (args: GetPlaylistByIdArgs) => {
        return this.getPlaylistByIdUC.execute(args);
    }
  
    getPlaylistByLink = (args: GetPlaylistByLinkArgs) => {
        return this.getPlaylistByLinkUC.execute(args);
    }
}