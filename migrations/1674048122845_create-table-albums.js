/* eslint-disable camelcase */
// Albums <=========================
exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('albums', {
        id: {
            type: 'VARCHAR(16)',
            primaryKey: true
        },
        name: {
            type: 'VARCHAR(128)',
            notnull: true
        },
        year: {
            type: 'INT',
            notnull: true
        }
    })
};

exports.down = pgm => {
    pgm.dropTable('albums')
};
