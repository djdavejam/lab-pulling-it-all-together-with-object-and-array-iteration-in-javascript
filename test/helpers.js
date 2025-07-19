const chai = require('chai');
const sinon = require('sinon');
global.expect = chai.expect;
const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const assert = require('assert');

const html = fs.readFileSync(path.resolve(__dirname, '..', 'index.html'), 'utf-8');
const js = fs.readFileSync(path.resolve(__dirname, '..', 'index.js'), 'utf-8');

// Use Babel to transform the code
const babelResult = babel.transform(js, {
    presets: ['@babel/preset-env']
});

const src = babelResult.code;

const vm = require('node:vm');
vm.runInThisContext(src, {filename: 'index.js'});

module.exports = {
    assert,
    chai,
    sinon,
    fs,
    path,
    babel,
    html,
    babelResult,
    src,
    js
};