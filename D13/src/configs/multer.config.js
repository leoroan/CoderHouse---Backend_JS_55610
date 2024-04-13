import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = '../docs/files/uploads';

    if (file.fieldname === 'profileImage') {
      uploadPath += 'profiles/';
    } else if (file.fieldname === 'productImage') {
      uploadPath += 'products/';
    } else {
      uploadPath += 'documents/';
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Usa el nombre original del archivo
  }
});

export default storage