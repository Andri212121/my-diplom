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

app.put('/imagePost', fileUpload({createParentPath: true}), (req, res) => {
    img = req.files.file.data
    res.status(200).json('done')
})

app.put('/imageEdit', async (req, res) => {
    let feature = req.body
    console.log(feature)
            sharp(img)
                .rotate(feature.rotate, {background: "rgba(0, 0, 0, 0)"})
                .toFormat('png')
                .flip(feature.flip)
                .flop(feature.flop)
                .toBuffer((err, data, info) => {
                    res.send(data)
                });
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

