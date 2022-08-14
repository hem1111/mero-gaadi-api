import multer from 'multer';

const multerConfig = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./images");
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});

export const upload = multer({
    storage: multerConfig,
});

export const uploadImage = upload.single('file');