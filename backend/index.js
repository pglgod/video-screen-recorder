

const conectToMongo = require('./db');
const express = require('express');
var cors = require('cors');
// const path = require('path')




conectToMongo();
const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());


app.get( "/", (req, res) =>{
    obj={
        app: "KORERO",
        version:"1.0"
    }
    return  res.json({massage: "Welcome to KORERO", data: obj})

});

app.use( '/api', require('./router/auth'));
app.use( '/api', require('./router/videoupload'));


app.listen( port, () => console.log( `KOREO is running on http://localhost:${port} `)); 