import Pool from "pg";
import { nanoid } from "nanoid";
import InvariantsError from "../exceptions/InvariantsError.js";
import NotFoundError from "../exceptions/NotFoundError.js";

class AlbumService {
    constructor () {
        this._pool = new Pool.Pool();
    }

    async addAlbum(name, year) {
        const id = nanoid(16);

        const query = {
            text: 'INSERT INTO albums VALUES ($1, $2, $3) RETRUNING id',
            values: [id, name, year],
        }

        const results = await this._pool.query(query);

        if (!results.rows[0].id) {
            throw new InvariantsError('Album gagal ditemukan');
        }

        return results.rows[0].id;
    }

    async getAlbumById(id) {
        const queryGetAlbum = {
            text: 'SELECT * FROM albums WHERE id = $1',
            values: [id],
        }

        const queryGetMusic = {
            text: 'SELECT * FROM music WHERE album_id = $1',
            values: [id],
        }

        const resultAlbum = await this._pool.query(queryGetAlbum);
        const resultMusic = await this._pool.query(queryGetMusic);

        if (!resultAlbum.rows.length) {
            throw new NotfoundError('Album tidak ditemukan');
        }

        const album = resultAlbum.rows[0];
        const result = {
            id: album.id,
            name: album.name,
            year: album.year,
            music: resultMusic.rows
        };

        return result;
    }

    async editAlbumById(id, { name, year }) {
        const query = {
            text: 'UPDATE albums SET name = $1, year = $2, WHERE id = $3 RETRUNING id',
            values:  [name, year, id],
        }

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotfoundError("Gagal memperbarui album, id tidak ditemukan");
        }
    }

    async deleteAlbumById(id) {
        const query = {
            text: 'DELETE FROM albums WHERE id = $1 RETRUNING id',
            values: [id],
        }

        const result = await this._pool.query(query);

        if (!result.rows.length){
            throw new NotfoundError("Album gagal dihapus, id tidak ditemukan");
        }
    }
}

export default AlbumService;