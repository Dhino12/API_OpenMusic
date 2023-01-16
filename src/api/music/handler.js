class MusicHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.getMusicHandler = this.getMusicHandler.bind(this);
        this.postMusicHandler = this.postMusicHandler.bind(this);
        this.getMusicByIdHandler = this.getMusicByIdHandler.bind(this);
        this.putMusicByIdHandler = this.putMusicByIdHandler.bind(this);
        this.deleteMusicByIdHandler = this.deleteMusicByIdHandler.bind(this);
    }

    async postMusicHandler(request, h) {
        try {
            

            const {
                year, title,
                genre, performer,
                duration = null, albumId = null
            } = request.payload;

            const musicId = await this._service.addMusic(
                { title, year, genre, performer, duration, albumId }
            );

            const response = h.response({
                status: 'success',
                data: {
                    musicId
                }
            })

            response.code(201);
        } catch (error) {
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kesalahan pada server'
            });

            response.code(500);
            console.log(error);
        }

        return response;
    }

    async getMusicHandler(request, h) {
        try {
            const { title = null, performer = null } = request.query;
            const music = await this._service.getMusic(title, performer);

            return{
                status: 'success',
                data: {
                    music
                }
            }
        } catch (error) {
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kesalahan pada server'
            });
            response.code(500);
            console.log(error);

            return response;
        }
    }

    async getMusicByIdHandler(request, h) {
        try {
            const { id } = request.params;
            const music = await this._service.getMusicById(id);
            return {
                status: 'success',
                data: {
                    music
                }
            }
        } catch (error) {
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kesalahan pada server'
            });

            response.code(500);
            console.log(error);

            return response;
        }
    }

    async putMusicByIdHandler(request, h) {
        try {
            this._validator.validateMusicPayload(request.payload);
            const { id } = request.params;

            const {
                title, year,
                genre, performer,
                duration = null, albumId = null
            } = request.payload;

            await this._service.editMusicById(
                id, { title, year, genre, performer, duration, albumId }
            )

            return {
                status: 'success',
                message: 'Musik Berhasil diperbarui',
            }
        } catch (error) {
            const response = h.response({
                status: 'fail',
                message: error.message
            });
            response.code(500);
            return response;
        }
    }

    async deleteMusicByIdHandler(request, h) {
        try {
            const { id } = request.params;
            await this._service.deleteMusicById(id);

            return {
                status: 'success',
                message: 'Musik berhasil dihapus'
            }
        } catch (error) {
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kesalahan pada server',
            });

            response.code(500);

            return response;
        }
    }
}

export default MusicHandler;