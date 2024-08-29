import { App } from './app';
import { AlbumRoute, ArtistRoute, PlaylistRoute, SearchRoute, SongRoute} from '../routes';

const app = new App([
    new AlbumRoute(),
    new ArtistRoute(),
    new SongRoute(),
    new SearchRoute(),
    new PlaylistRoute()
]).getApp();


export default app;
