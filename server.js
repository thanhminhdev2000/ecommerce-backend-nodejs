const app = require('./src/app')

const PORT = process.env.DEV_APP_PORT || 8080

const server = app.listen(PORT, () => {
    console.log(`WSV eCommerce start with ${PORT}`)
})
