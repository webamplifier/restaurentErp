require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require("./routes/route");

const Multer = require('multer');
const path = require('path');
const defaultPath = './public/uploads';

const app = express();
const port = process.env.PORT;
app.use(cors());

let db = require('./knexfile');
let environment = process.env.NODE_ENV;
global.knex = require('knex')(db[environment]);

let storage = Multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, defaultPath);
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname);
    }
});

let upload = Multer({ storage: storage });
app.use(upload.any());

app.use((req,res,next) => {
    console.log(req.path, new Date());
    next();
})

app.use("/api",router);

app.listen(port,()=>{
    console.log("Port is up",port)
})

