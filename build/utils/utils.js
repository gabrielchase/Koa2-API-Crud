'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setDb = setDb;
exports.stringGen = stringGen;
exports.getRandomInt = getRandomInt;

var _config = require('../config/config');

function setDb(env) {
    if (env === 'test') {
        return _config.config.test;
    } else {
        return _config.config.dev;
    }
}

function stringGen(len) {
    var text = " ";
    var charset = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < len; i++) {
        text += charset.charAt(Math.floor(Math.random() * charset.length));
    }return text;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}