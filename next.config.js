require('dotenv').config();

module.exports = {
    env: {
        HOSTNAME: process.env.HOSTNAME,
        BACKEND_HOSTNAME: process.env.BACKEND_HOSTNAME,
        BACKEND_API_ENDPOINT: process.env.BACKEND_API_ENDPOINT
    },
}

