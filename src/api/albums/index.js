import AlbumHandler from "./handler";
import routes from "./routes";

const albumPlugin = {
    name: 'albums',
    version: '1.0.0',
    register: async (server, { service, validator }) => {
        const albumHandler = new AlbumHandler(service, validator);
        server.route(routes(albumHandler));
    }
};

export default albumPlugin;
