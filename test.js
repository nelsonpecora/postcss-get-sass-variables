'use strict';
const postcss = require('postcss'),
  _ = require('lodash'),
  lib = require('./');

function run(input, variables) {
  const obj = {};

  return postcss([lib((extracted) => {
    _.assign(obj, extracted);
  })]).process(input, { from: '/foo/bar.css', to: '/foo/bar.css' })
    .then(() => {
      expect(obj).to.eql(variables);
    });
}

describe('get-sass-variables', () => {
  it('extracts variables from css', () => {
    return run('$foo: red;\n$bar: 1px;\n$baz: "Comic Sans MS"', { foo: 'red', bar: '1px', baz: '"Comic Sans MS"'});
  });

  it('allows arbitrary strings in variable values', () => {
    return run('$foo: this is a string', { foo: 'this is a string' });
  });

  it('allows snake-case', () => {
    return run('$foo-bar: baz;', { 'foo-bar': 'baz' });
  });

  it('passes through non-variable declarations', () => {
    return run('a { color: red; }', {});
  });
});
