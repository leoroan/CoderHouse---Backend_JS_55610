import storage from "../configs/multer.config.js";
import { userService } from "../services/repository/services.js";
import multer from "multer";

const upload = multer({ storage: storage });

const uploadDocumentAndUpdateUser = (req, res, next) => {
  upload.single('document')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: 'Error al subir el documento' });
    }

    try {
      const userId = req.params.uid;
      const documentName = req.file.originalname;

      const user = await userService.getUserById(userId);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      user.documents.push({ name: documentName, reference: req.file.path });
      await user.save();

      res.status(200).json({ message: 'Documento subido correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
};

export default uploadDocumentAndUpdateUser;