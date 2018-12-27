module.exports = {
    redis: {
        url: process.env.REDIS_URL,
        channel: process.env.REDIS_CHANNEL || 'events'
    },

    server: {
        port: process.env.PORT
    },

    health: {
        isEnabled: process.env.HEALTH_ENABLED === 'true',
        port: +process.env.HEALTH_PORT
    },

    sentry: {
        isEnabled: process.env.SENTRY_ENABLED !== 'false',
        dsn: process.env.SENTRY_DSN,
        release: process.env.SENTRY_RELEASE
    },

    logRocket: {
        isEnabled: process.env.LOGROCKET_ENABLED !== 'false',
        domain: process.env.LOGROCKET_DOMAIN
    },

    sockets: {
        host: process.env.SOCKETS_HOST
    }
};