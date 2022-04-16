const mongoose = require('mongoose');

const mongoURI = 
        process.env.NODE_ENV === 'production'
        ? process.env.DB_URL
        : `mongodb://localhost:27017/Project-2-Forum`

        mongoose.connect(`${mongoURI}`, {useNewUrlParser: true})
            .then((conn) => {
                console.log(`Connected to mongodb on ${conn.connections[0].name} db `)
            })
            .catch((err) => {console.error(err)});

            module.exports = mongoose