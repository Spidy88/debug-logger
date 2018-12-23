module.exports = {
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT || 6379,
        channel: process.env.REDIS_CHANNEL || 'events'
    },

    server: {
        port: process.env.SERVER_PORT || process.env.PORT
    },

    health: {
        isEnabled: false,
        port: process.env.HEALTH_PORT
    },

    logger: {
        logToConsole: false
    },

    sentry: {
        isEnabled: false
    },

    logRocket: {
        isEnabled: false
    },

    sockets: {
        host: process.env.SOCKETS_HOST
    }
};