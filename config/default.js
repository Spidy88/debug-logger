module.exports = {
    server: {
        port: process.env.SERVER_PORT || process.env.PORT
    },

    health: {
        isEnabled: false,
        port: process.env.HEALTH_PORT
    },

    logger: {
        logToConsole: false
    }
};