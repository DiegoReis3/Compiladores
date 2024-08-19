document.addEventListener('DOMContentLoaded', (event) => {
    // Inicializa o CodeMirror
    const editor = CodeMirror.fromTextArea(document.getElementById('areaCodigo'), {
        mode: "pascal",
        theme: "dracula",
        lineNumbers: true
        });

    // Função global para obter o conteúdo do CodeMirror
    window.getCodeMirrorContent = function() {
        return editor.getValue();
    };

    const uploadButton = document.getElementById('uploadButton');
    const fileInput = document.getElementById('fileInput');

    uploadButton.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file && file.type === "text/plain") {
            const reader = new FileReader();
            reader.onload = function(e) {
                // Define o conteúdo do editor para o conteúdo do arquivo
                editor.setValue(e.target.result);
            };
            reader.readAsText(file);
        } else {
            alert("Por favor, selecione um arquivo .txt");
        }
    });
});
