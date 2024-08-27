import antlr4 from 'antlr4';

class CustomErrorListener extends antlr4.error.ErrorListener {
    constructor() {
        super();
        this.errors = [];
    }

    syntaxError(recognizer, offendingSymbol, line, charPositionInLine, msg, e) {
        // Adiciona o erro à lista
        this.errors.push(`${recognizer}\n${offendingSymbol}\n${line}\n${charPositionInLine}\n${msg}`);
    }

    getErrors() {
        return this.errors.join('\n');
    }
}

export { CustomErrorListener };
