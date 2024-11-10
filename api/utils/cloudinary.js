const  { v2 : cloudinary } = require('cloudinary');
const fs = require("node:fs")

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET_KEY // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null;
        }

        // Upload the file on Cloudinary
         const uploadResult = await cloudinary.uploader
           .upload(
               localFilePath , {
                    resource_type:'auto',

               }
            )
            //file uploaded successfully
            console.log("file uploaded successfully on cloudinary", uploadResult.url);  //upload hone ke baad ka public URL
        return uploadResult;
  
    } catch (error) {
        fs.unlinkSync(localFilePath)  //remove ,locally saved temporary file as the upload option got failed
        console.log(error);
        return null;
    }
    
}

module.exports = {uploadOnCloudinary}