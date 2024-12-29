const app = require('./src/app')

const PORT = process.env.PORT || 8088

const server = app.listen(PORT, () => {
  console.log(`WSV eCommerce start with ${PORT}`)
})
