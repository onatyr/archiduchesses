"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drizzle_kit_1 = require("drizzle-kit");
exports.default = (0, drizzle_kit_1.defineConfig)({
    schema: './database/schema.ts',
    out: './database/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DB_URL
    },
});
