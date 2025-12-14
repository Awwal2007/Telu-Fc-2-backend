const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

// News images
const newsStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Telu-Blogs",
    allowed_formats: ["png", "jpg", "gif"],
    limits: { fileSize: 5 * 1024 * 1024 }
  },
});

// Coach documents
const coachStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Telu-Coaches",
    allowed_formats: ["png", "jpg", "gif", "pdf", "doc", "docx"],
    limits: { fileSize: 5 * 1024 * 1024 }
  },
});

const uploadCoachFiles = multer({ storage: coachStorage });
const uploadNewsImages = multer({ storage: newsStorage });

module.exports = { uploadNewsImages, uploadCoachFiles };
