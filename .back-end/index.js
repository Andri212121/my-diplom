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

    fs.writeFile('./src/data/tempImg.jpg', req.files.file.data, err => {
    });
    fs.writeFile('./src/data/outImg.jpg', req.files.file.data, err => {
    });

    res.status(200).json('done')
})

app.get('/imageEdit', (req, res) => {
    const {operation} = req.query
    switch (operation) {
        case 'rotate':
            fs.readFile('./src/data/tempImg.jpg', (err, data) => {
                sharp(data)
                    .rotate(parseInt(req.query.angle), {background: "rgba(0, 0, 0, 0)"})
                    .png()
                    .toFile('./src/data/outImg.png', (err, info) => {
                    })
                res.send(true);
            })

            break
        case 'flip':
            fs.readFile('./src/data/tempImg.jpg', (err, data) => {
                sharp(data)
                    .flip()
                    .png()
                    .toFile('./src/data/outImg.png', (err, info) => {
                    })
                res.send(true);
            })

            break
        case 'flop':
            fs.readFile('./src/data/tempImg.jpg', (err, data) => {
                sharp(data)
                    .flop()
                    .png()
                    .toFile('./src/data/outImg.png', (err, info) => {
                    })
                res.send(true);
            })

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

