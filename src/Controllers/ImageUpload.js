import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { Router } from "express";

const router = Router();

cloudinary.config({
  cloud_name:'dwhuyfuxn',
  api_key: 387417973272736,
  api_secret: 'STp8ajLcNUs4FCMeOaxNOFIpKWo',
});

const upload = multer(); // Use multer without storage to handle the file in memory

router.post('/upload', upload.single('file'), (req, res) => {
  // Check if a file was uploaded
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Upload the file to Cloudinary using the buffer directly
  cloudinary.uploader.upload_stream(
    { resource_type: "auto" }, // Set resource type to auto for automatic format detection
    (error, result) => {
      if (error) {
        console.error('Error uploading to Cloudinary:', error);
        return res.status(500).send('Error uploading to Cloudinary.');
      }

      // Respond with the Cloudinary URL or other relevant data
      const imageUrl = result.secure_url;
      res.status(200).json({ imageUrl });
    }
  ).end(req.file.buffer); // Pass the buffer directly to the Cloudinary uploader
});

const uploadImage = router;
export { uploadImage };