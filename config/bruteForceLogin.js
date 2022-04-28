const limiter = require('express-rate-limit')

exports.loginLimiter = limiter({
    windowMs: 2* 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false
})
exports.registerLimiter = limiter({
    windowMs: 2* 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false
})