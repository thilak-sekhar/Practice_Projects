const express = require('express'); 
const routes = require('./routes/users.js')
const app=express();
const PORT=5000;
app.use("/items",routes)
app.listen(PORT,()=>console.log("server is running at port "+PORT )); 