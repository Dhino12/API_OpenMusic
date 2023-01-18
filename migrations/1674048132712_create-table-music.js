/* eslint-disable camelcase */
// Music <=========================
exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('music', {
        id: {
            type: 'VARCHAR(16)',
            primaryKey: true
        },
        title: {
            type: 'VARCHAR(255)',
            notnull: true
        },
        year: {
            type: 'INT',
            notnull: true
        },
        performer: {
            type: 'VARCHAR(255)',
            notnull: true
        },
        genre: {
            type: 'VARCHAR(128)',
            notnull: true
        },
        duration: {
            type: 'INT'
        },
        album_id: {
            type: 'VARCHAR(16)',
            references: 'albums',
            onDelete: 'cascade',
        }
    })
};

exports.down = pgm => {
    pgm.dropTable('music');
};
