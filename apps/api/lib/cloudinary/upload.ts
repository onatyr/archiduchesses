import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.config';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async () => {
    return {
      folder: 'uploads',
      format: 'jpg',
    };
  },
});

const upload = multer({ storage: storage });

export default upload;
