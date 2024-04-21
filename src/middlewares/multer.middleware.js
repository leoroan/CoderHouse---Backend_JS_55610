import { upload } from "../configs/multer.config.js";

const uploadDocumentMiddleware = async (req, res, next) => {
  const folder = req.query.folder;
  upload.single(folder)(req, res, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: 'Error al cargar el archivo.' });
    }
    next();
  });
};

export default uploadDocumentMiddleware;