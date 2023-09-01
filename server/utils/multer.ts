import path from "path";

import multer from "multer";

export const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (_, file, cb) => {
    cb(null, `${Date.now()}.${file.originalname.split(".")[1]}`);
  },
});

export const checkFileType = (file: any, cb: any) => {
  const fileTypes = /jpeg|jpg|png|gif|svg/;

  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: You can Only Upload Images!!");
  }
};
