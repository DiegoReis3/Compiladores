function lexico(){
    
    let data = [
        ["Lexema1", "Token1", "Erro1", "Linha1", "Coluna Inicial1", "Coluna Final1"],
        ["Lexema2", "Token2", "Erro2", "Linha2", "Coluna Inicial2", "Coluna Final2"],
        ["Lexema3", "Token3", "Erro3", "Linha3", "Coluna Inicial3", "Coluna Final3"],
        ["Lexema4", "Token4", "Erro4", "Linha4", "Coluna Inicial4", "Coluna Final4"],
        ["Lexema5", "Token5", "Erro5", "Linha5", "Coluna Inicial5", "Coluna Final5"],
        ["Lexema6", "Token6", "Erro6", "Linha6", "Coluna Inicial6", "Coluna Final6"],
        ["Lexema7", "Token7", "Erro7", "Linha7", "Coluna Inicial7", "Coluna Final7"],
        ["Lexema8", "Token8", "Erro8", "Linha8", "Coluna Inicial8", "Coluna Final8"],
        ["Lexema9", "Token9", "Erro9", "Linha9", "Coluna Inicial9", "Coluna Final9"]
    ];

    let words = document.getElementById("areaCodigo").value.split(/\s+/);

    let tabela = generateTable(data);

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
                    <th>Linha</th>
                    <th>Coluna Inicial</th>
                    <th>Coluna Final</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Adiciona as linhas de dados
    data.forEach(row => {
        tableHTML += `
            <tr>
                <td>${row[0]}</td>
                <td>${row[1]}</td>
                <td>${row[2]}</td>
                <td>${row[3]}</td>
                <td>${row[4]}</td>
                <td>${row[5]}</td>
            </tr>
        `;
    });

    tableHTML += `
            </tbody>
        </table>
    `;
    return tableHTML;
}


