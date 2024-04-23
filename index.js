// to help with debugging
function unbleach(n) {
    if (n) return n.replace(/ /g, 's').replace(/\t/g, 't').replace(/\n/g, 'n');
}

// solution
function whitespace(code, input) {
    var output = '', stack = [], heap = {};
    // ...
    return output;
};



class Lexer {
    constructor(input) {
        this.input = input;
        this.position = 0; //current char position
        this.readPosition = this.position + 1; //next char position
        this.ch = input[0]; //current char
    }

    readChar() {
        //end of string ch equals =0;
        if (this.readPosition >= this.input.length) return this.ch = 0;

        this.ch = this.input[this.readPosition];
        this.position = this.readPosition;
        this.readPosition++;
    }

    nextToken() {

        if (this.ch === 0) return "EOF";

        let token = tokens[this.ch];

        this.readChar();

        return token;

    }
}

const tokens = {
    " ": "[space]",
    "\t": "[tab]",
    "\n": "[line-feed]"
}

export default whitespace;
export {
    tokens,
    Lexer
};
