'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.schema = undefined;

var _pgAsync = require('pg-async');

var _pgAsync2 = _interopRequireDefault(_pgAsync);

var _config = require('../config/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var pgAsync = new _pgAsync2.default(_config.config.dbUri);

var todosConfig = {
    tableName: 'todos'
};

var schema = exports.schema = {
    create: ['CREATE TABLE IF NOT EXISTS TODOS (\n            ID          SERIAL PRIMARY KEY,\n            TITLE       VARCHAR(60),\n            COMPLETED   BOOLEAN\n        );']
};

var todoCrudOps = {
    read: function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            return _context.abrupt('return', pgAsync.query('SELECT * FROM ' + todosConfig.tableName));

                        case 1:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        function read() {
            return _ref.apply(this, arguments);
        }

        return read;
    }(),
    readOne: function () {
        var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(id) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            return _context2.abrupt('return', pgAsync.query('SELECT * FROM ' + todosConfig.tableName + ' WHERE id = $1', id));

                        case 1:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        }));

        function readOne(_x) {
            return _ref2.apply(this, arguments);
        }

        return readOne;
    }(),
    create: function () {
        var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(_ref3) {
            var title = _ref3.title,
                completed = _ref3.completed;
            var todo;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            todo = {
                                title: title,
                                completed: completed
                            };
                            _context3.next = 3;
                            return pgAsync.query('\n            INSERT INTO ' + todosConfig.tableName + ' \n            (title, completed) VALUES ($1, $2)', title, completed);

                        case 3:
                            return _context3.abrupt('return', _context3.sent);

                        case 4:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined);
        }));

        function create(_x2) {
            return _ref4.apply(this, arguments);
        }

        return create;
    }(),
    update: function () {
        var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(id, _ref5) {
            var title = _ref5.title,
                completed = _ref5.completed;
            var query;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            query = 'UPDATE ' + todosConfig.tableName + ' SET ';


                            if (title != undefined) query += 'title = \'' + title + '\' ';
                            if (title != undefined && query != undefined) query += ', ';
                            if (completed != undefined) query += 'completed = ' + completed + ' ';
                            if (id > 0) query += 'WHERE id = ' + id;

                            return _context4.abrupt('return', pgAsync.query(query));

                        case 6:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, undefined);
        }));

        function update(_x3, _x4) {
            return _ref6.apply(this, arguments);
        }

        return update;
    }(),
    delete: function () {
        var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(id) {
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            pgAsync.query('DELETE FROM ' + todosConfig.tableName + ' WHERE id = $1', id);

                        case 1:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, undefined);
        }));

        function _delete(_x5) {
            return _ref7.apply(this, arguments);
        }

        return _delete;
    }()
};

exports.default = todoCrudOps;