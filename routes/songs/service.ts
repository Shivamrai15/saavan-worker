import {
    CreateSongStationUC,
    GetSongByIdUC,
    GetSongByLinkUC,
    GetSongLyricsUC,
    GetSongSuggestionsUC,
    type GetSongByIdArgs,
    type GetSongSuggestionsArgs
} from '../../utility/song';
  
export class SongService {
    private readonly getSongByIdUC: GetSongByIdUC;
    private readonly getSongByLinkUC: GetSongByLinkUC;
    private readonly getSongLyricsUC: GetSongLyricsUC;
    private readonly createSongStationUC: CreateSongStationUC;
    private readonly getSongSuggestionsUC: GetSongSuggestionsUC;
  
    constructor() {
        this.getSongByIdUC = new GetSongByIdUC();
        this.getSongByLinkUC = new GetSongByLinkUC();
        this.getSongLyricsUC = new GetSongLyricsUC();
        this.createSongStationUC = new CreateSongStationUC();
        this.getSongSuggestionsUC = new GetSongSuggestionsUC();
    }
  
    getSongByIds = (args: GetSongByIdArgs) => {
        return this.getSongByIdUC.execute(args);
    }
  
    getSongByLink = (token: string) => {
        return this.getSongByLinkUC.execute(token);
    }
  
    getSongLyrics = (songId: string) => {
        return this.getSongLyricsUC.execute(songId);
    }
  
    createSongStation = (songIds: string) => {
        return this.createSongStationUC.execute(songIds);
    }
  
    getSongSuggestions = (args: GetSongSuggestionsArgs) => {
        return this.getSongSuggestionsUC.execute(args);
    }
}