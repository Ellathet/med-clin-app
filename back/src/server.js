const express = require('express');
const cors = require('cors')
const routes = require('./routes')
const app = express();

app.use(cors());
app.use(express.json())
app.use(routes)

//Tratamento de erros
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({error: error.message})
    
})

app.listen(3333, () => console.log("Server is Running"));