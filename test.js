import whitespace from "./index.js";
import { assert, expect } from 'chai';
import { tokens, Lexer } from "./index.js";


let desc = "Testing the lexer";
describe(desc, function() {
    let input = "  \t\n";
    let output = "";

    let lexer = new Lexer(input);

    let token = lexer.nextToken();
    while (token !== "EOF") {
        output += (token);
        token = lexer.nextToken();
    }

    it(`${output} should be equal "[space][space][tab][line-feed]"`, function(done) {
        expect(output).to.equal("[space][space][tab][line-feed]");
        done();
    });
})


desc = "Testing push, output of numbers 0 through 3";
describe(desc, function() {
    let output1 = "   \t\n\t\n \t\n\n\n";
    let output2 = "   \t \n\t\n \t\n\n\n";
    let output3 = "   \t\t\n\t\n \t\n\n\n";
    let output0 = "    \n\t\n \t\n\n\n";

    assert.equal(whitespace(output1), "1");
    assert.equal(whitespace(output2), "2");
    assert.equal(whitespace(output3), "3");
    assert.equal(whitespace(output0), "0");
});

desc = "Testing ouput of numbers -1 through -3";
describe(desc, function() {
    let outputNegative1 = "  \t\t\n\t\n \t\n\n\n";
    let outputNegative2 = "  \t\t \n\t\n \t\n\n\n";
    let outputNegative3 = "  \t\t\t\n\t\n \t\n\n\n";

    assert.equal(whitespace(outputNegative1), "-1");
    assert.equal(whitespace(outputNegative2), "-2");
    assert.equal(whitespace(outputNegative3), "-3");
});

desc = "Testing simple flow control edge case";
describe(desc, function() {
    desc = "Expecting exception for unclean termination";
    assert.throws(desc, function() {
        whitespace("");
    });
});

desc = "Testing output of letters A through C";
describe(desc, function() {
    let outputA = "   \t     \t\n\t\n  \n\n\n";
    let outputB = "   \t    \t \n\t\n  \n\n\n";
    let outputC = "   \t    \t\t\n\t\n  \n\n\n";

    assert.equal(whitespace(outputA), "A");
    assert.equal(whitespace(outputB), "B");
    assert.equal(whitespace(outputC), "C");
});

desc = "Testing output of letters A through C with comments";
describe(desc, function() {
    let outputA = "blahhhh   \targgggghhh     \t\n\t\n  \n\n\n";
    let outputB = " I heart \t  cats  \t \n\t\n  \n\n\n";
    let outputC = "   \t  welcome  \t\t\n\t\n to the\nnew\nworld\n";

    assert.equal(whitespace(outputA), "A");
    assert.equal(whitespace(outputB), "B");
    assert.equal(whitespace(outputC), "C");
});

desc = "Testing stack functionality";
describe(desc, function() {
    let pushTwice = "   \t\t\n   \t\t\n\t\n \t\t\n \t\n\n\n";
    let duplicate = "   \t\t\n \n \t\n \t\t\n \t\n\n\n";
    let duplicateN1 = "   \t\n   \t \n   \t\t\n \t  \t \n\t\n \t\n\n\n";
    let duplicateN2 = "   \t\n   \t \n   \t\t\n \t  \t\n\t\n \t\n\n\n";
    let duplicateN3 = "   \t\n   \t \n   \t\t\n \t   \n\t\n \t\n\n\n";
    let swap = "   \t\t\n   \t \n \n\t\t\n \t\t\n \t\n\n\n";
    let discard = "   \t\t\n   \t \n \n\t \n\n\t\n \t\n\n\n";
    let slide = "   \t\t\n   \t \n   \t\n   \t  \n   \t\t \n   \t \t\n   \t\t\t\n \n\t \t\n \t\t\n\t\n \t\t\n \t\t\n \t\t\n \t\n\n\n";

    assert.equal(whitespace(pushTwice), "33");
    assert.equal(whitespace(duplicate), "33");
    assert.equal(whitespace(duplicateN1), "1");
    assert.equal(whitespace(duplicateN2), "2");
    assert.equal(whitespace(duplicateN3), "3");
    assert.equal(whitespace(swap), "32");
    assert.equal(whitespace(discard), "2");
    assert.equal(whitespace(slide), "5123");
});

