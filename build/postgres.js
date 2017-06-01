'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SQL = undefined;

var _pgAsync = require('pg-async');

Object.defineProperty(exports, 'SQL', {
    enumerable: true,
    get: function get() {
        return _pgAsync.SQL;
    }
});
exports.createTables = createTables;
exports.postgresMiddleware = postgresMiddleware;

var _pgAsync2 = _interopRequireDefault(_pgAsync);

var _once = require('once');

var _once2 = _interopRequireDefault(_once);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function createTables(pgInstance, schemas) {
    await pgInstance.transaction(async function (instance) {
        try {
            await instance.query(schemas.create[0]);
        } catch (error) {
            console.log('Error creating tables: ', err);
        }
    });
}

function postgresMiddleware(uri, schemas) {
    var pgInstance = new _pgAsync2.default(uri);
    var setup = (0, _once2.default)(createTables);

    return async function (ctx, next) {
        await createTables(pgInstance, schemas);

        return await next();
    };
}