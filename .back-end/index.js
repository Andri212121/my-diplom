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

let imageExpansion = {
    width: 0,
    height: 0
}

app.put('/imagePost', fileUpload({createParentPath: true}), (req, res) => {

    const {width} = req.query
    const {height} = req.query

    imageExpansion.width = width
    imageExpansion.height = height

    sharp(req.files.file.data)
        .png()
        .toFile('./src/data/tempImg.png', (err, info) => {
        })
    sharp(req.files.file.data)
        .png()
        .toFile('./src/data/outImg.png', (err, info) => {
        })

    res.status(200).json('done')
})

    let rotate = (angle) => {
        fs.readFile('./src/data/outImg.png', (err, data) => {
            sharp(data)
                .rotate(parseInt(angle), {background: "rgba(0, 0, 0, 0)"})
                .png()
                .toFile('./src/data/outImg.png', (err, info) => {
                })
        })
    }
    let flip = () => {
        fs.readFile('./src/data/outImg.png', (err, data) => {
            sharp(data)
                .flip()
                .png()
                .toFile('./src/data/outImg.png', (err, info) => {
                })
        })
    }
    let flop = () => {
        fs.readFile('./src/data/outImg.png', (err, data) => {
            sharp(data)
                .flop()
                .png()
                .toFile('./src/data/outImg.png', (err, info) => {
                })
        })
    }
    let affine = (aff) => {
        fs.readFile('./src/data/outImg.png', (err, data) => {
            sharp(data)
                .affine(aff, {background: "rgba(0, 0, 0, 0)"})
                .png()
                .toFile('./src/data/outImg.png', (err, info) => {
                })
        })
    }

app.put('/imageEdit', async (req, res) => {
    const {operation} = req.query
    switch (operation) {
        case 'rotate':
            await rotate(req.query.angle)
            res.send(true);
            break

        case 'flip':
            await flip()
            res.send(true);
            break

        case 'flop':
            await flop()
            res.send(true);
            break

        case 'affine':
            await affine(req.body)
            res.send(true);
            break

        case 'undo':
            console.log(req.body)
            res.send(true);
            break
        case 'save':
            fs.readFile('./src/data/outImg.png', (err, data) => {
                fs.writeFile('./src/data/tempImg.jpg', data, err => {
                });
            })
            res.send(true);
            break

    }


    // res.send();
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

