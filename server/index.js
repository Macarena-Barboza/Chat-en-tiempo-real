import express from "express";

const app = express()

app.get('/', (req, res) => {
    res.send('<h1>Holis</h1>')
})

app.listen(3001, () => {
    console.log('server list http://localhost:3001')
})

