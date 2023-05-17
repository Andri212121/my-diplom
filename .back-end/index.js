const express = require('express')
const cors = require('cors')
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
                .affine(feature.affine, {background: "rgba(0, 0, 0, 0)"})
                .sharpen( feature.sharpen.sigma !== 0 ? feature.sharpen : { sigma: 0.000001, m1: feature.sharpen.m1, m2: feature.sharpen.m2, x1: feature.sharpen.x1, y2: feature.sharpen.y2, y3: feature.sharpen.y3 })
                .toBuffer((err, data, info) => {
                    res.send(data)
                });
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

