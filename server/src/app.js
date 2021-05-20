const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const {json} = require('body-parser')
const cors = require('cors')
const path = require("path");

const routes = require('./routes')

const app = express()
const port = process.env.SERVER_PORT

app.use(cors())
app.use(json())
app.use(routes)
app.use("/files", express.static(path.resolve(__dirname, "uploads")));

app.listen(port, () => console.log(`Server iniciado na porta: ${port}`))