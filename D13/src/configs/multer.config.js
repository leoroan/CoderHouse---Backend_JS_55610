import multer from "multer";
import  __dirname from "../utils.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    let uploadPath = `${__dirname}/docs/files/uploads/`;

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
    cb(null, file.originalname);
  }
});

export const upload = multer({ storage: storage });