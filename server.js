const express = require("express");
const app = express();
app.use(express.static("public"));

const http = require("http").Server(app);

const porta = 8080;

http.listen(porta, function(){
    console.log("Server iniciado, abra o navegador em: http://localhost:" + porta);
});

app.get('/', function(req, resp){
    resp.sendFile(__dirname + "/index.html");
});