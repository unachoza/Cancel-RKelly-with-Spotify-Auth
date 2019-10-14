/* What do I want my server to do? 
    count users
    count deleted songs
    count found songs
*/

const db = require('../db/config')
const cancel = {}


cancel.allUsers = () => {
    return db.query(`
    SELECT * FROM users
    `)
}

cancel.addUser = (user) => {
    return db.one(`
    INSERT INTO users
    (display_name, email, country, songs)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [user.display_name, user.email, user.country, user.songs]
    )
}

cancel.countSong = (song) => {
    return db.one(`
    INSERT INTO songs
    (name, artist, deleted)
    VALUES ($1, $2)
    RETURNING *
    `
    [song.name, song.artist, song.deleted]
    )
}

module.exports = cancel