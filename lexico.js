function lexico(){
    let words = document.getElementById("areaCodigo").value.split(/\s+/);

    words = words.filter(Boolean);

    let resultado = processarPalavras(words);

    let tabela = generateTable(resultado);

    document.getElementById('divcontainTabela').innerHTML = "";
    document.getElementById('divcontainTabela').innerHTML = tabela;

    console.log(words);
}

function generateTable(data) {
    let tableHTML = `
        <table id="table" class="table table-dark table-striped table-bordered border-white">
            <thead>
                <tr>
                    <th>Lexema</th>
                    <th>Token</th>
                    <th>Erro</th>
                    <th>Linha</th>
                    <th>Coluna inicial</th>
                    <th>Coluna final</th>
                </tr>
            </thead>
            <tbody>
    `;

    data.forEach(row => {
        const token = verificaToken(row);
        const erro = verificaAlfabeto(row, token);
        const rowClass = erro != "-" ? "class='table-danger'" : "";

        tableHTML += `
            <tr ${rowClass}>
                <td>${row}</td>
                <td>${token}</td>
                <td>${erro}</td>
                <td>Linha</td> 
                <td>Coluna inicial</td>
                <td>Coluna final</td>
            </tr>
        `;
    });

    tableHTML += `
            </tbody>
        </table>
    `;
    return tableHTML;
}

document.addEventListener('DOMContentLoaded', () => {
    const botao = document.getElementById('buttonLexico');
    botao.addEventListener('click', lexico);
});

const tabelaPalavrasReservadas = [
    { valor: "+",       nome: "simbolo_soma" },
    { valor: "-",       nome: "simbolo_subtracao" },
    { valor: "*",       nome: "simbolo_multiplicacao" },
    { valor: "/",       nome: "simbolo_divisao" },
    { valor: "var",     nome: "reservada_var" },
    { valor: "begin",   nome: "reservada_begin" },
    { valor: "end",     nome: "reservada_end" },
    { valor: "read",    nome: "reservada_read" },
    { valor: "write",   nome: "reservada_write" },
    { valor: "program", nome: "reservada_program" },
    { valor: "int",     nome: "reservada_int" },
    { valor: "float",   nome: "reservada_float" },
    { valor: "string",  nome: "reservada_string" },
    { valor: "(",       nome: "simbolo_abreParenteses" },
    { valor: ")",       nome: "simbolo_fechaParenteses" },
    { valor: ".",       nome: "simbolo_pontoFinal" },
    { valor: ":",       nome: "simbolo_doisPontos" },
    { valor: ";",       nome: "simbolo_pontoVirgula" },
    { valor: ":=",      nome: "simbolo_atribuicao" },
    { valor: ",",       nome: "simbolo_virgula" },
];

function verificaToken(data){
    const item = tabelaPalavrasReservadas.find(item => item.valor === data);

    if (item) return item.nome;
    else if (/^\d+$/.test(data)) return "numero_inteiro";
    else if (/^\d+\.\d+$/.test(data)) return "numero_decimal";
    else return "identificador";
}

function verificaAlfabeto(data, token) {
    const regexIdentificador = /^[a-zA-Z_$][a-zA-Z_$0-9]{0,24}$/;
    const regexNumeroInt = /^\d{1,10}$/;
    const regexNumeroDecimal = /^\d{1,5}\.\d{1,5}$/;
    const regexSimbolos = /^[+\-*/)(.:;,=]+$/;

    if ((token == "identificador" && regexIdentificador.test(data)) || (token == "numero_inteiro" && regexNumeroInt.test(data)) || (token == "numero_decimal" && regexNumeroDecimal.test(data)) || (token!="identificador" && token!="numero_inteiro" && token!="numero_decimal" && token!="erro")) {
        return "-";
    } else {
        for (let index = 0; index < data.length; index++) {
            let char = data.charAt(index);
            if (!regexSimbolos.test(char) && !regexIdentificador.test(char) && !regexNumeroInt.test(char) && !regexNumeroDecimal.test(char)) {
                return "Simbolo " + char + " não permitido";
            }
            if (token == "identificador" && data.length > 25) {
                return "Identificador com mais de 25 caracteres";
            }
            if (token == "numero_inteiro" && data.length > 10) {
                return "Número inteiro com mais de 10 caracteres";
            }
            if (token == "numero_decimal") {
                let partes = data.split(".");
                if (partes[0].length > 5) {
                    return "Número decimal com mais de 5 caracteres";
                } else if (partes[1].length > 5) {
                    return "Número decimal com mais de 5 casas decimais";
                }
            }
        }
        if (token == "identificador" && !regexIdentificador.test(data)) {
            return "Identificador não permitido"; 
        }
        return "Erro não identificado";
    }
}

function processarPalavras(words) {
    let resultado = [];
    const regexNumeroDecimal = /^\d+\.\d+/;

    words.forEach(palavra => {
        while (palavra.length > 0) {
            // Verifica se a palavra começa com um número decimal
            const matchDecimal = regexNumeroDecimal.exec(palavra);
            if (matchDecimal) {
                resultado.push(matchDecimal[0]);
                palavra = palavra.slice(matchDecimal[0].length);
                continue;
            }

            // Verifica se a palavra corresponde a um símbolo composto da tabela de palavras reservadas
            const matchSimboloComposto = tabelaPalavrasReservadas.find(item => palavra.startsWith(item.valor) && item.valor.length > 1);
            if (matchSimboloComposto) {
                resultado.push(matchSimboloComposto.valor);
                palavra = palavra.slice(matchSimboloComposto.valor.length);
                continue;
            }

            // Verifica se a palavra corresponde a uma palavra reservada simples (não composta)
            const matchPalavraReservada = tabelaPalavrasReservadas.find(item => palavra.startsWith(item.valor) && item.valor.length === 1);
            if (matchPalavraReservada) {
                resultado.push(matchPalavraReservada.valor);
                palavra = palavra.slice(matchPalavraReservada.valor.length);
                continue;
            }

            // Se não houver correspondência, divide a palavra em partes com base nos símbolos permitidos
            const simbolosPermitidos = /[+\-/*():;:=,\.]/;
            const partes = palavra.split(simbolosPermitidos);

            if (partes[0]) {
                resultado.push(partes[0]);
                palavra = palavra.slice(partes[0].length);
            } else {
                resultado.push(palavra[0]);
                palavra = palavra.slice(1);
            }
        }
    });

    return resultado;
}


