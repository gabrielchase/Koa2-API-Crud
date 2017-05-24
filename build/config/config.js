'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var config = exports.config = {
    dbUri: process.env.DATABASE_URL || 'postgres://localhost:5432/koacrud?user=gchasepatron&password=postgrespassword'
};