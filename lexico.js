function lexico(){
    //identifica todas as palavras presentes no codigo
    let words = document.getElementById("areaCodigo").value.split(/\s+/);

    words = words.filter(Boolean);

    let resultado = [];

    resultado = processarPalavras(words)

    //gera a tabela com os dados
    let tabela = generateTable(resultado);

    //exibi a tabela na area de resultados
    document.getElementById('divcontainTabela').innerHTML = tabela;

    console.log(words)

}

function generateTable(data) {
    // Cria o HTML da tabela
    let tableHTML = `
        <table id="table" class="table table-dark table-striped table-bordered border-white">
            <thead>
                <tr>
                    <th>Lexema</th>
                    <th>Token</th>
                    <th>Erro</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Adiciona as linhas de dados
    data.forEach(row => {
        tableHTML += `
            <tr>
                <td>${row}</td>
                <td>${verificaToken(row)}</td>
                <td>${verificaAlfabeto(row)}</td>
            </tr>
        `;
    });

    tableHTML += `
            </tbody>
        </table>
    `;
    return tableHTML;
}

// Adiciona o listener para o evento click quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    const botao = document.getElementById('buttonLexico');
    botao.addEventListener('click', lexico);
});



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

function verificaAlfabeto(data) {
    // Regex para validar nomes de variáveis e identificar caracteres específicos
    const regexCombinado = /^([a-zA-Z_$][a-zA-Z_$0-9]{0,24})|([+\-*/)(.:;,=]*)$/;

    // Testa a string com a expressão regular combinada
    const resultado = data.match(regexCombinado);

    if (resultado) {
        // Se a string for válida como nome de variável, retorna "-"
        if (resultado[0] === data) {
            return "-";
        } else {
            // Se houver caracteres específicos após o nome de variável, retorna "caractere específico"
            return "caractere específico";
        }
    } else {
        return "erro";
    }
}

function processarPalavras(words) {
    const simbolosPermitidos = /[+\-/*():;:=,\.]/;
    let resultado = [];
    
    words.forEach(palavra => {
        // Verifica se a palavra contém caracteres não permitidos
        const partes = palavra.split(/([+\-/*():;:=,\.])/);

        partes.forEach(parte => {
            // Se a parte for um símbolo permitido ou palavra, adiciona ao resultado
            if (parte && (simbolosPermitidos.test(parte) || /[\w]+/.test(parte))) {
                resultado.push(parte);
            }
        });
    });

    return resultado;
}
