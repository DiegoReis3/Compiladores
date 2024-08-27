import express from "express";
import http from "http";
import path from 'path';
import { fileURLToPath } from 'url';
import {lexicAnalisysGenerator} from "./modules/lexicoGerador.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static("public"));
app.use(express.json());

const httpServer = http.Server(app);
const porta = 8080;

httpServer.listen(porta, function(){
    console.log("[server]: Server iniciado, abra o navegador em: http://localhost:" + porta);
});

app.get('/', function(req, resp){
    resp.sendFile(__dirname + "/index.html");
});

app.post('/lexico', function(req, resp){
    const input = req.body.input;
    console.log("[server]: Requisição de Análise Léxica recebida, conteúdo:\n\n" + input);
    const output = lexicAnalisysGenerator(input);
    console.log("[server]: Resultado da Análise Léxica:\n\n" + output);
    resp.json(output);
});