document.addEventListener('DOMContentLoaded', () => {
    const botao = document.getElementById('buttonLexico');
    botao.addEventListener('click', lexicoPost);
});

async function lexicoPost() {
    const codigo =  window.getCodeMirrorContent();
    if (!codigo){
        alert("Conteúdo vazio!!! Insira o código!")
        return;
    }
    // console.log("Requisição enviada, conteúdo:\n\n" + codigo);

    const response = await fetch('/lexico', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: codigo }),
    });
    //console.log(response)

    const result = await response.json(); // Pega o JSON da resposta


    const [erros, tokens] = result.split('///', 2);  // Divide a string na primeira vírgula
    console.log(tokens);
    console.log(erros);

    //gera a tabela com os dados
    let tabela = generateTableFromResult(tokens, erros);
    
    //limpa area de resultados
    document.getElementById('divcontainTabela').innerHTML = ""

    //exibi a tabela na area de resultados
    document.getElementById('divcontainTabela').innerHTML = tabela;

}

function generateTableFromResult(result, errors) {
    // Cria o HTML da tabela de tokens
    let tableHTML = `
        <table id="table" class="table table-dark table-striped table-bordered border-white">
            <thead>
                <tr>
                    <th>Lexema</th>
                    <th>Token</th>
                </tr>
            </thead>
            <tbody>
    `;

    let tokens = result.split("\n"); // Separa as linhas do resultado
    console.log(tokens);

    // Adiciona as linhas de dados de tokens
    tokens.forEach(row => {
        const [token, lexema] = row.split(" ");
        tableHTML += `
            <tr>
                <td>${lexema}</td>
                <td>${token}</td>
            </tr>
        `;
    });

    tableHTML += `
            </tbody>
        </table>
    `;

     // Se houver erros, cria uma nova seção para erros
     if (errors && errors.trim() !== "") {
        let errorHTML = `
            <table id="errorTable" class="table table-danger table-striped table-bordered border-white">
                <thead>
                    <tr>
                        <th colspan="3" class="text-center">Erros:</th>
                    </tr>
                    <tr>
                        <th>Token</th>
                        <th>Linha</th>
                        <th>Coluna</th>
                    </tr>
                </thead>
                <tbody>
        `;

        // Processa os erros, pulando a linha `[object Object]`
        const errorLines = errors.split('\n').filter(line => !line.includes('[object Object]'));
        for (let i = 0; i < errorLines.length; i += 4) {
            const offendingSymbol = errorLines[i]; // A linha com o offendingSymbol (null no exemplo)
            const linha = errorLines[i + 1]; // Linha do erro
            console.log("linha:" + linha);
            const coluna = errorLines[i + 2]; // Coluna do erro
            console.log("coluna:" + coluna);
            const errorMessage = errorLines[i + 3]; // Mensagem de erro com o token
            console.log("errorMessage:" + errorMessage);

            if (errorMessage && linha && coluna) {
                const match = errorMessage.match(/token recognition error at: '(.+)'/);

                // Se houver correspondência com a expressão regular, continua
                if (match) {
                    const tokenErrado = match[1];

                    // Adiciona as linhas de erros
                    errorHTML += `
                        <tr>
                            <td>${tokenErrado}</td>
                            <td>${linha}</td>
                            <td>${coluna}</td>
                        </tr>
                    `;
                }
            }
        }

        errorHTML += `
                </tbody>
            </table>
        `;

        // Adiciona a tabela de erros ao final da tabela de tokens
        tableHTML += errorHTML;
    }

    return tableHTML;
}
