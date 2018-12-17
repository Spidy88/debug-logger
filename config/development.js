module.exports = {
    redis: {
        host: 'localhost',
        port: 6379,
        channel: 'events'
    },

    health: {
        port: 9000
    },

    server: {
        port: 8888
    },

    logger: {
        logToConsole: true
    }
};