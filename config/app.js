module.exports = {
    debug: process.env.APP_DEBUG === 'true' ? true : false || false,
    rate: {
        max: process.env.RATE_MAX || 60,
        retry: process.env.RATE_RETRY || 60000
    },
    apiKey: process.env.API_SECRET
}