import express from 'express';
import multer from 'multer';

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, 'public/images'); // Ensure this folder exists
    },
    filename: (_req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage: storage });

// POST route for file upload
router.post('/', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json("No file uploaded.");
        }

        // Return the saved file's name
        return res.status(200).json({ filename: req.file.filename });
    } catch (error) {
        console.error(error);
        return res.status(500).json("Something went wrong during file upload.");
    }
});

export default router;
