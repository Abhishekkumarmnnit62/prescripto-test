import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure upload folder exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // save files in /uploads
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname); // unique filename
    }
});

const upload = multer({ storage });

export default upload;
