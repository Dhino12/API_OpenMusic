import Hapi from '@hapi/hapi'
import albums from './api/albums/index.js';
import music from './api/music/index.js';
import AlbumService from './services/AlbumService.js';
import MusicService from './services/MusicService.js';
import AlbumValidator from './validator/albums/index.js';
import MusicValidator from './validator/music/index.js';
import dotenv from 'dotenv';
dotenv.config();

const init = async () => {
    const albumService = new AlbumService();
    const musicService = new MusicService();

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            }
        }
    })

    await server.register([
        {
            plugin: albums,
            options: {
                serice: albumService,
                validator: AlbumValidator
            }
        },
        {
            plugin: music,
            options: {
                serice: musicService,
                validator: MusicValidator
            }
        }
    ])


    console.log(`Server berjalan pada ${server.info.uri}`);
    await server.start();
}

init();