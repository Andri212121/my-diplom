const express = require('express')
const cors = require('cors')
const fs = require('fs')
const fileUpload = require("express-fileupload")

const app = express()
const port = 3001

app.use(cors({
    origin: "http://localhost:3000",
    method: ["GET", "POTS", "PUT", "DELETE"],
    credentials: true,
}))

app.use(express.json({limit: '50mb'}));
app.use(express.json())

app.put('/imagePost',fileUpload({createParentPath: true}), (req, res) => {
    console.log(req.files.file)

    fs.writeFile('./src/data/tempImg.png', req.files.file.data, err => {
        if (err) {
            console.error(err);
        }
    });

    res.status(200).json('done')
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

