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
  params: async (req, file) => {
    const isPdf = file.mimetype === "application/pdf";
    const isImage = file.mimetype.startsWith("image/");

    return {
      folder: "Telu-Coaches",
      resource_type: isImage || isPdf ? "image" : "raw",
      format: isPdf ? "pdf" : undefined,
      public_id: `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`,
    };
  },
});


const uploadCoachFiles = multer({ storage: coachStorage });
const uploadNewsImages = multer({ storage: newsStorage });

module.exports = { uploadNewsImages, uploadCoachFiles };
