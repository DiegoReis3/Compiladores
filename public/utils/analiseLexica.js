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
    console.log("Requisição enviada, conteúdo:\n\n" + codigo);

    const response = await fetch('/lexico', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: codigo }),
    });
    console.log(response)

    const result = await response.json();
    console.log(result);
}