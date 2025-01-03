'use strict'
const mongoose = require('mongoose')
const os = require('os')
const process = require('process')
const _SECOND = 5000

const countConnect = () => {
    const numConnection = mongoose.connections.length
    console.log(`Number of connections: ${numConnection}`)
}

const checkOverload = () => {
    setInterval(() => {
        const numConnection = mongoose.connections.length
        const numCores = os.cpus().length
        const memoryUsage = process.memoryUsage().rss

        // Example maximum number of connection based on number of cores
        const maxConnections = numCores * 5

        console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`)

        if (numConnection > maxConnections) {
            console.log('Connection overload detected')
        }
    }, _SECOND)
}

module.exports = {
    countConnect,
    checkOverload,
}
