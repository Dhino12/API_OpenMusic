import MusicHandler from "./handler.js"
import routes from "./routes.js";

const musicPlugin = {
    name: 'music',
    version: '1.0.0',
    register: async (server, { service, validator }) => {
        const musicHandler = new MusicHandler(service,validator);
        server.route(routes(musicHandler));
    }
}

export default musicPlugin;