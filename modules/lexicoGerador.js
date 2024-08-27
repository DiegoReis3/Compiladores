import { CharStream, CommonTokenStream } from 'antlr4';
import LALG from './LALG/LALG.js';
import { CustomErrorListener } from './CustomErrorListener.js';  // Importe seu CustomErrorListener

function lexicAnalisysGenerator(input) {
    const chars = new CharStream(input);
    const lexer = new LALG(chars);
    const tokens = new CommonTokenStream(lexer);

    // Cria o manipulador de erros personalizado
    const errorListener = new CustomErrorListener();
    lexer.removeErrorListeners();  // Remove os listeners de erro padrão
    lexer.addErrorListener(errorListener);  // Adiciona o seu listener personalizado

    // Preenche o buffer de tokens
    tokens.fill();

    // Obter erros
    const errors = errorListener.getErrors();
    if (errors) {
        console.log('Erros encontrados:\n' + errors);
    }

    // Retorna o resultado da análise léxica
    const result = tokens.tokens.map((token) => {
        const tokenType = LALG.symbolicNames[token.type];
        const tokenName = tokenType ? tokenType : token.text;
        return `${tokenName} ${token.text}`;
    }).join('\n');

    // Adicionar os erros ao resultado
    if (errors) {
        return `${errors}///${result}`; // Se houver erros no código, será retornado a lista deles antes dos tokens
    }else{
        return `///${result}`; // Se não houver erros, será retornado apenas os tokens
    }
    return result;
}

export { lexicAnalisysGenerator };
