const supabase = require("../Config/supabase");
const { v4: uuidv4 } = require("uuid");

const uploadToSupabase = async (file, folder) => {

    const filePath = `${folder}/${Date.now()}-${uuidv4()}-${file.originalname.replace(/\s+/g, "_")}`;


  const { error } = await supabase.storage
    .from("telu-files")
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: true,
    });

  if (error) throw error;

  const { data } = supabase.storage
    .from("telu-files")
    .getPublicUrl(filePath);

  return data.publicUrl;
};

module.exports = uploadToSupabase;
