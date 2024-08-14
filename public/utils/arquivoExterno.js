function readFile() {
    // Obtém o input de arquivo
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0]; // Obtém o primeiro arquivo selecionado

    if (!file) {
        alert('Por favor, selecione um arquivo primeiro.');
        return;
    }

    var reader = new FileReader();

    // Define o que fazer quando o arquivo é carregado
    reader.onload = function(event) {
        var content = event.target.result;
        document.getElementById('fileContent').textContent = content;
    };

    // Define o que fazer em caso de erro
    reader.onerror = function() {
        alert('Erro ao ler o arquivo.');
    };

    // Lê o conteúdo do arquivo como texto
    reader.readAsText(file);

    document.getElementById("areaCodigo").value = reader;
}

document.addEventListener('DOMContentLoaded', (event) => {
    const uploadButton = document.getElementById('uploadButton');
    const fileInput = document.getElementById('fileInput');
    const fileContent = document.getElementById('areaCodigo');

    uploadButton.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file && file.type === "text/plain") {
            const reader = new FileReader();
            reader.onload = function(e) {
                fileContent.value = e.target.result;
            };
            reader.readAsText(file);
        } else {
            alert("Por favor, selecione um arquivo .txt");
        }
    });
});

