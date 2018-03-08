module.exports = {
    debug: process.env.APP_DEBUG === 'true' ? true : false || false,
    apiKey: process.env.API_SECRET
}