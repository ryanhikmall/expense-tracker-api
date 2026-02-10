import multer from "multer";
import path from "path";
import fs from "fs";

// 1. Pastikan folder penyimpanan ada
const uploadDir = path.join(__dirname, "../../public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 2. Konfigurasi Penyimpanan (Storage)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Simpan di folder public/uploads
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Ganti nama file biar unik
    // Contoh: struk-170999999.jpg
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname); // Ambil ekstensi (.jpg/.png)
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

// 3. Filter File (Cuma boleh gambar)
const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // Terima
  } else {
    cb(new Error("Hanya boleh upload file gambar!"), false); // Tolak
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // Maksimal 2MB
});
