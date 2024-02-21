const multer = require("multer");
const createError = require("http-errors");
const path = require("path");

uploder = (subfolder_path, image_type, image_size, error_msg) => {
  const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}/`;

  // Multer define storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();

      cb(null, fileName, fileExt);
    },
  });

  // Multer upload

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: image_size,
    },
    fileFilter: (req, file, cb) => {
      if (image_type.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createError(error_msg));
      }
    },
  });

  return upload;
};
module.exports = uploder;
