const app = require('./app')
const port = process.env.PORT || 5000
const host = process.env.HOST || 'localhost'

app.listen(port, host, () => console.log(`Server has been started on http://${host}:${port}`))