const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

// News files (all types)
const newsStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "Telu-Blogs",
      resource_type: "raw", // accept any file type
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

// Coach files (all types)
const coachStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "Telu-Coaches",
      resource_type: "raw", // accept any file type
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

const uploadCoachFiles = multer({ storage: coachStorage });
const uploadNewsFiles = multer({ storage: newsStorage });

module.exports = { uploadNewsFiles, uploadCoachFiles };
