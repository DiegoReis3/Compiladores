import antlr4 from "antlr4";
const { BailErrorStrategy, DefaultErrorStrategy, FailedPredicateException } = antlr4.error;

const DES = new DefaultErrorStrategy();

export default class CustomErrorStrategy extends BailErrorStrategy {
    reportInputMismatch(recognizer, e) {
        let errorDisplay = DES.getTokenErrorDisplay(e.offendingToken);
        let expected = e.getExpectedTokens().toString(recognizer.getLiteralNames(), recognizer.getSymbolicNames());
        expected = `{ ${expected} }`;

        let msg = `Entrada não esperada ${errorDisplay}; esperado: ${expected}.`;
        recognizer.notifyErrorListeners(msg, e.offendingToken, e);
    }

    reportNoViableAlternative(recognizer, e) {
        let tokens = recognizer.getTokenStream();
        let input;
        if (tokens !== undefined) {
            if (e.startToken.type === antlr4.Token.EOF) {
                input = "<EOF>";
            } else {
                const interval = new antlr4.Interval(e.startToken.tokenIndex, e.offendingToken.tokenIndex);
                const intervalSet = new antlr4.IntervalSet();
                intervalSet.addInterval(interval);
                input = tokens.getText(intervalSet);
            }
        } else {
            input = "<não reconhecida>";
        }

        let msg = `Entrada não esperada ${input}.`;
        recognizer.notifyErrorListeners(msg, e.offendingToken, e);
    }

    reportFailedPredicate(recognizer, e) {
        let ruleName = recognizer.ruleNames[recognizer._ctx.ruleIndex];
        let msg = `Regra ${ruleName} não satisfeita.`;
        recognizer.notifyErrorListeners(msg, e.offendingToken, e);
    }

    reportUnwatedToken(recognizer) {
        let t = recognizer.getCurrentToken();
        let expected = recognizer.getExpectedTokens().toString();
        let msg = `Entrada não esperada ${t.text}; esperado: ${expected}.`;
        recognizer.notifyErrorListeners(msg, t, undefined);
    }

    reportError(recognizer, e) {
        if (e instanceof antlr4.error.InputMismatchException) {
            this.reportInputMismatch(recognizer, e);
        } else if (e instanceof antlr4.error.NoViableAltException) {
            this.reportNoViableAlternative(recognizer, e);
        } else if (e instanceof FailedPredicateException) {
            this.reportFailedPredicate(recognizer, e);
        } else {
            console.log("Erro de sintaxe desconhecido: " + typeof e);
            recognizer.notifyErrorListeners(e.toString(), e.offendingToken, e);
        }
    }
}
