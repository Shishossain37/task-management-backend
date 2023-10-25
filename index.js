
require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn.js");
const cors = require("cors");
const router = require("./routes/router.js");
const PORT = process.env.PORT || 5000


app.use(cors());
app.use(express.json());

app.use(router);

app.listen(PORT,()=>{
    console.log(`Server start at port no ${PORT}`)
})