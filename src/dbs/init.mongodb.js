const mongoose = require('mongoose')
const { checkOverload } = require('../helpers/check.connect')
const {
    db: { host, name, port },
} = require('../config/config.mongodb')
const connectString = `mongodb://${host}:${port}/${name}`

class Database {
    constructor() {
        this.connect()
    }

    connect(type = 'mongodb') {
        if (true) {
            mongoose.set('debug', true)
            mongoose.set('debug', { color: true })
        }

        mongoose
            .connect(connectString, { maxPoolSize: 50 })
            .then((_) => {
                console.log('Connected Mongodb Success')
            })
            .catch((err) => console.log('Error Connect!'))
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance
    }
}

const instanceMongodb = Database.getInstance()
module.exports = instanceMongodb
