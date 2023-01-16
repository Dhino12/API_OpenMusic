import Hapi from '@hapi/hapi'

const init = async () => {
    
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
            options: {
                serice: null,
                validator: null
            }
        },
        {
            options: {
                serice: null,
                validator: null
            }
        }
    ])

    await server.register(require('inert'))
    console.log(`Server berjalan pada ${server.info.uri}`);
}

init();