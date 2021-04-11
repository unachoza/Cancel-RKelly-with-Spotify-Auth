const options = {
    query: (e) => {
        console.log(e.query)
    }
}

const pgp = require('pg-promise')(options)

const db = () => {
    if(process.env.NODE_ENV === 'developement' || !process.env.NODE_ENV){
        return pgp({
            database: 'cancel',
            port: 5432, 
            host: 'localhost'
        })
    } else return pgp(process.env.DATABASE_URL)
}



module.exports = db