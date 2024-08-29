import {
    SearchAlbumsUC,
    SearchGlobalUC,
    SearchArtistsUC,
    SearchPlaylistsUC,
    SearchSongsUC,
    type SearchAlbumsArgs,
    type SearchArtistsArgs,
    type SearchPlaylistsArgs,
    type SearchSongsArgs
} from '../../utility/search';
  
export class SearchService {
    private readonly searchGlobalUC: SearchGlobalUC;
    private readonly searchSongsUC: SearchSongsUC;
    private readonly searchAlbumsUC: SearchAlbumsUC;
    private readonly searchArtistsUC: SearchArtistsUC;
    private readonly searchPlaylistsUC: SearchPlaylistsUC;
  
    constructor() {
        this.searchGlobalUC = new SearchGlobalUC();
        this.searchSongsUC = new SearchSongsUC();
        this.searchAlbumsUC = new SearchAlbumsUC();
        this.searchArtistsUC = new SearchArtistsUC();
        this.searchPlaylistsUC = new SearchPlaylistsUC();
    }
  
    searchAll = (query: string) => {
        return this.searchGlobalUC.execute(query);
    }
  
    searchSongs = (args: SearchSongsArgs) => {
        return this.searchSongsUC.execute(args);
    }
  
    searchAlbums = (args: SearchAlbumsArgs) => {
        return this.searchAlbumsUC.execute(args);
    }
  
    searchArtists = (args: SearchArtistsArgs) => {
        return this.searchArtistsUC.execute(args);
    }
  
    searchPlaylists = (args: SearchPlaylistsArgs) => {
        return this.searchPlaylistsUC.execute(args);
    }
}