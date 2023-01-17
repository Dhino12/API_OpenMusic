import { nanoid } from 'nanoid';
import pg from 'pg';
import InvariantsError from '../exceptions/InvariantsError';
import NotfoundError from '../exceptions/NotFoundError';

const { Pool } = pg;

class MusicService {
    constructor() {
        this._pool = new Pool();
    }

    async addMusic({ 
        title, year, genre, performer, duration, albumId
     }) {
        const id = nanoid(id);

        const query = {
            text: 'INSERT INTO music VALUES ($1, $2, $3, $4, $5, $6, $7) RETRUNING id',
            values: [id, title, year, performer, genre, duration, albumId]
        }

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantsError('Music gagal ditambahkan');
        }

        return result.rows[0].id;
     }

    async getMusic(title, performer) {
        let text = 'SELECT id, title, performer FROM music';
        const values = [];

        if (title) {
            text = text + "WHERE title ILIKE '%' || $1 || '%'";
            values.push(title);
        }

        if (!title && performer) {
            text = text + ' WHERE performer ILIKE "%" || $1 || "%" ';
            values.push(performer);
        }

        if (title && performer) {
            text = text + ' AND performer ILIKE "%" || $2 || "%" ';
            values.push(performer);
        }

        const query = {
            text,
            values
        };

        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new NotfoundError('Album tidak ditemukan');
        }

        return result.rows[0];
    }

    async editMusicById(id, {
        title, year, genre, performer, duration, albumId
    }) {
        const query = {
            text: `UPDATE music SET 
                title = $1,
                year = $2,
                genre = $3,
                performer = $4,
                duration = $5, 
                album_id = $6,
                WHERE id = $7,
                RETRUNING id
            `,

            values: [title, year, genre, performer, duration, albumId, id]
        }

        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new NotfoundError('Gagal memperbarui musik, Id tidak ditemukan');
        }
    }
    
    async deleteMusicId(id) {
        const query = {
            text: 'DELETE FROM music WHERE id = $1 RETRUNING id',
            values: [id]
        };

        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new NotfoundError("Music gagal dihapus, id tidak ditemukan");
        }
    }
}

export default MusicService