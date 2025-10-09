import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET

    });

const uploadOnCloudinary = async(localFilePath) => {
    try {
        if(!localFilePath)  return null
        const response = await cloudinary.uploader.upload(localFilePath,
            {resource_type:"auto"})

            console.log("Uploaded to Cloudinary", response.url);
            return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); //remove file as upload failed
        console.log("Error while uploading to Cloudinary", error);
        return null;
    }
}

cloudinary.v2.uploader.upload("https://img.olympics.com/images/image/private/t_s_16_9_g_auto/t_s_w960/f_auto/primary/kwrg2dden7rnzxryvckm",
    {public_id:"olympic_flag"},
    function(error, result) {console.log(result, error); });