/* eslint-disable import/unambiguous */

module.exports = class Token {
  constructor(text, start, end) {
    this.text = text;
    this.start = start;
    this.end = end;
  }
};
