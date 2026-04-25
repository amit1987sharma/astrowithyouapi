import multer from "multer";
import path from "path";
import sharp from "sharp";
import fs from "fs/promises"; // Use fs.promises for async unlink

const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        const uploadPath = `public/uploads/${req.destination}/`;
        try {
            await fs.mkdir(uploadPath, { recursive: true }); // Ensure directory exists
        } catch (error) {
            console.error("Error creating upload directory:", error);
            return cb(error);
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed!'), false);
    }
};

const upload = multer({ storage, fileFilter });

const processImage = async (req, res, next) => {
    if (!req.file && !req.files) {
        return next();
    }

    try {
        const uploadPath = `public/uploads/${req.destination}/`;

        const processFile = async (file) => {
            const originalPath = path.join(uploadPath, file.filename);
            const webpPath = originalPath.replace(path.extname(originalPath), ".webp");
            const thumbPath = path.join(uploadPath, `thumb_${path.basename(webpPath)}`);

            // Convert image to WebP format
            await sharp(originalPath)
                .resize({ width: 750, height: 600 })
                .toFormat("webp", { quality: 90 })
                .toFile(webpPath);

            // Create Thumbnail (100x100 WebP)
            await sharp(originalPath)
                .resize(375, 300)
                .toFormat("webp", { quality: 80 })
                .toFile(thumbPath);

            // Wait for Sharp to release file before deleting
            setTimeout(async () => {
                try {
                    await fs.unlink(originalPath);
                } catch (err) {
                    console.error("Error deleting original file:", err);
                }
            }, 500); // Delay to ensure file is released

            return {
                original: webpPath,
                thumbnail: thumbPath
            };
        };

        if (req.file) {
            req.processedFiles = await processFile(req.file);
        } else if (req.files) {
            req.processedFiles = await Promise.all(req.files.map(processFile));
        }

        next();
    } catch (error) {
        console.error("Image processing error:", error);
        return res.status(500).json({ error: "Image processing failed." });
    }
};

export { upload, processImage };
