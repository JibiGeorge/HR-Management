const express = require('express')
const app = express();
const morgan = require('morgan')
require('dotenv').config();


// middleware
app.use(morgan('tiny'));


app.listen(process.env.PORT,()=>{
    console.log("Server Running");
})