const express = require('express')
const cors = require('cors')
const fs = require('fs')
const fileUpload = require("express-fileupload")
const sharp = require("sharp")

const app = express()
const port = 3001

app.use(cors({
    origin: "http://localhost:3000",
    method: ["GET", "POTS", "PUT", "DELETE"],
    credentials: true,
}))

app.use(express.json({limit: '50mb'}));
app.use(express.json())

let img

app.put('/imagePost',fileUpload({createParentPath: true}), (req, res) => {

    fs.writeFile('./src/data/tempImg.jpg', req.files.file.data, err => {});
    fs.writeFile('./src/data/outImg.jpg', req.files.file.data, err => {});

    res.status(200).json('done')
})

app.get('/imageEdit',  (req, res) => {
    fs.readFile('./src/data/tempImg.jpg', (err, data) => {
        sharp(data)
            .rotate(parseInt(req.query.angle))
            .jpeg()
            .toFile('./src/data/outImg.jpg', (err, info) => {})
    })

    res.send(true);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

