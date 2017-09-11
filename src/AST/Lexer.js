/* eslint-disable import/unambiguous */

const matchAt = require('match-at');
const Token = require('./Token');

// const latexExpr = `% This is a comment
// f(x) = \\int_{-\\infty}^\\infty
// % Another comment

// \\hat f(\\xi)\\,e^{2 \\pi i \\xi x}
// \\,d\\xi`;

const latexExpr = `\\left( \\sum_{k=1}^n a_k b_k \\right)^2 \\leq
\\left( \\sum_{k=1}^n a_k^2 \\right)
\\left( \\sum_{k=1}^n b_k^2 \\right)`;

const tokenRegex = new RegExp(
  '([ \r\n\t]+)|' +
    '([!-\\[\\]-\u2027\u202A-\uD7FF\uF900-\uFFFF]' +
    '|[\uD800-\uDBFF][\uDC00-\uDFFF]' +
    '|\\\\(?:[a-zA-Z@]+|[^\uD800-\uDFFF])' +
    ')'
);

class Lexer {
  constructor(input) {
    this.input = input;
    this.pos = 0;
  }

  lex() {
    const input = this.input;
    const pos = this.pos;
    if (pos === input.length) {
      return new Token('EOF', pos, pos);
    }
    const match = matchAt(tokenRegex, input, pos);
    if (match === null) {
      throw new Error(
        "Unexpected character: '" + input[pos] + "'",
        new Token(input[pos], pos, pos + 1)
      );
    }
    const text = match[2] || ' ';
    const start = this.pos;
    this.pos += match[0].length;
    const end = this.pos;
    return new Token(text, start, end, this);
  }
}

function lexer(str) {
  // Remove all comments
  str = str.replace(/%.*\n\s*/g, '');

  const lexer = new Lexer(str);
  const tokens = [];
  while (lexer.pos !== str.length) {
    tokens.push(lexer.lex());
  }

  return tokens;
}

function* iterFromArr(arr) {
  for (let i = 0; i < arr.length; i++) {
    yield arr[i];
  }
}

function test() {
  const testArr = lexer(latexExpr);
  const iter = iterFromArr(testArr);

  let nextVal = iter.next();
  while (!nextVal.done) {
    console.log(nextVal.value);
    nextVal = iter.next();
  }
}

test();
