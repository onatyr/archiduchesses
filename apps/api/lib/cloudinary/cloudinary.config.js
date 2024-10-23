'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const cloudinary_1 = require('cloudinary');
const dotenv_1 = __importDefault(require('dotenv'));
const path_1 = __importDefault(require('path'));
const node_url_1 = require('node:url');
dotenv_1.default.config({
  path: path_1.default.resolve(
    path_1.default.dirname((0, node_url_1.fileURLToPath)(import.meta.url)),
    '../.env'
  ),
});
cloudinary_1.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
exports.default = cloudinary_1.v2;
