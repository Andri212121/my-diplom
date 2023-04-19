const express = require('express')
const cors = require('cors')
const fs = require('fs')

const app = express()
const port = 3001

app.use(cors({
    origin: "http://localhost:3000",
    method: ["GET", "POTS", "PUT", "DELETE"],
    credentials: true,
}))
app.use(express.json({limit: '50mb'}));
app.use(express.json())

app.post('/imagePost', function (req, res) {
    res.send('POST request to the homepage');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

