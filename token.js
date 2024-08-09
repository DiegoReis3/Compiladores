// Define a tabela de palavras reservadas e seus nomes
const tabelaPalavrasReservadas = [
    { valor: "+",       nome: "simbolo_soma" },
    { valor: "-",        nome: "simbolo_subtracao" },
    { valor: "*",       nome: "simbolo_multiplicacao" },
    { valor: "/",       nome: "simbolo_divisao" },

    { valor: "var",       nome: "reservada_var" },
    { valor: "begin",    nome: "reservada_begin" },
    { valor: "end",    nome: "reservada_end" },
    { valor: "read",     nome: "reservada_read" },
    { valor: "write",      nome: "reservada_write" },

    { valor: "int",          nome: "reservada_int" },
    { valor: "float",      nome: "reservada_float" },
    { valor: "string",        nome: "reservada_string" },

    { valor: "(",        nome: "simbolo_abreParenteses" },
    { valor: ")",      nome: "simbolo_fechaParenteses" },
    { valor: ".",     nome: "simbolo_pontoFinal" },
    { valor: ":",     nome: "simbolo_doisPontos" },
    { valor: ";",         nome: "simbolo_pontoVirgula" },
    { valor: ":=",    nome: "simbolo_atribuicao" },
    { valor: ",",          nome: "simbolo_virgula" },
];

function verificaToken(data){
    item = tabelaPalavrasReservadas.find(item => item.valor == data)

    if (item == undefined) return "identificador";
    else return item.nome;
}

export default verificaToken;