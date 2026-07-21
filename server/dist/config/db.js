"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    connectionString: process.env.PRODUCTION_DB,
});
exports.default = pool;
//# sourceMappingURL=db.js.map