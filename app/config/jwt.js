module.exports = {
    secret: process.env.JWT_SECRET,
    expired: parseInt(process.env.JWT_EXPIRITY) * 1000,
    refresh_token_expired: parseInt(process.env.JWT_REFRESH_LIMETIME)
};
