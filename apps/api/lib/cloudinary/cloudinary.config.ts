import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
import path from "path";
import {fileURLToPath} from "node:url";

dotenv.config({
    path: path.resolve(__dirname, '../../../../.env')
});
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;