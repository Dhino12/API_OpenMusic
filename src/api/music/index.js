import MusicHandler from "./handler"
import routes from "./routes";

const musicPlugin = {
    name: 'music',
    version: '1.0.0',
    register: async (server, { service, validator }) => {
        const musicHandler = new MusicHandler(service,validator);
        server.route(routes(musicHandler));
    }
}

export default musicPlugin;