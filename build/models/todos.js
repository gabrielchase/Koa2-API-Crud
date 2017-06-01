'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.schema = undefined;

var _pgAsync = require('pg-async');

var _pgAsync2 = _interopRequireDefault(_pgAsync);

var _utils = require('../utils/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _setDb = (0, _utils.setDb)(process.env.NODE_ENV);

var dbUri = _setDb.dbUri;

var pgAsync = new _pgAsync2.default(dbUri);

var todosConfig = {
    tableName: 'todos'
};

var schema = exports.schema = {
    create: ['CREATE TABLE IF NOT EXISTS TODOS (\n            ID          SERIAL PRIMARY KEY,\n            TITLE       VARCHAR(60),\n            COMPLETED   BOOLEAN\n        );']
};

var todoCrudOps = {
    read: async function read() {
        return pgAsync.query('SELECT * FROM ' + todosConfig.tableName);
    },
    readOne: async function readOne(id) {
        return pgAsync.query('SELECT * FROM ' + todosConfig.tableName + ' WHERE id = $1', id);
    },
    create: async function create(_ref) {
        var title = _ref.title;
        var completed = _ref.completed;

        var todo = {
            title: title,
            completed: completed
        };

        return await pgAsync.row('\n            INSERT INTO ' + todosConfig.tableName + ' \n            (title, completed) VALUES ($1, $2)\n            RETURNING *', title, completed);
    },
    update: async function update(id, _ref2) {
        var title = _ref2.title;
        var completed = _ref2.completed;

        var query = 'UPDATE ' + todosConfig.tableName + ' SET ';

        if (title != undefined) query += 'title = \'' + title + '\' ';
        if (title != undefined && completed != undefined) query += ', ';
        if (completed != undefined) query += 'completed = ' + completed + ' ';
        if (id > 0) query += 'WHERE id = ' + id;

        query += ' RETURNING *';

        return pgAsync.row(query);
    },
    delete: async function _delete(id) {
        pgAsync.query('DELETE FROM ' + todosConfig.tableName + ' WHERE id = $1', id);
    }
};

exports.default = todoCrudOps;