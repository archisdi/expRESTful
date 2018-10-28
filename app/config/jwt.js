module.exports = {
    secret: process.env.JWT_SECRET,
    expired: +(process.env.JWT_EXPIRITY),
    refresh_token_expired: +(process.env.JWT_REFRESH_LIMETIME)
};
