const dotenv = require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mysqlPool = require("./db/db");
const studentRoute = require("./routes/studentRoute")

// rest object
const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json())


// routes
app.use("/api/v1/student",studentRoute)


// routes
app.get("/test",(req,res)=>{
        res.status(200).send("<h1>Mysql Project</h1>")
})

// PORT
const PORT = process.env.PORT || 3000;

// conditionally listening
mysqlPool.query('SELECT 1').then(()=>{
    console.log("SQL database is connected");
})

// run server
app.listen(PORT,()=>{
        console.log(`Server is running ${PORT}`);
})