import { NextResponse } from "next/server";
import connect from "@/utils/db";
import { v2 as cloudinary } from 'cloudinary';
import MainCategory from "@/models/MainCategory";

cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDAPIKEY,
    api_secret: process.env.CLOUDAPISECRET,
    secure: true,
});


export const dynamic = 'force-dynamic';

export const POST = async (request) => {
    try {
        await connect()

        const ProfileData = await request.formData();
        const imageFile = ProfileData.get('image');
        const catId = ProfileData.get('id')
   console.log(imageFile,'file');
        const fileBuffer = await imageFile.arrayBuffer()
        var mime = imageFile.type; 
        var encoding = 'base64'; 
        var base64Data = Buffer.from(fileBuffer).toString('base64');
        var fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;

        try {
            const uploadToCloudinary = () => {
                return new Promise((resolve, reject) => {
                    cloudinary.uploader.upload(fileUri, { invalidate: true })
                        .then((result) => {
                            resolve(result);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                });
            };
            
            const result = await uploadToCloudinary();
            let imageUrl = result.secure_url;

            const userProfile = await MainCategory.findOne({_id:catId})

            if(userProfile){
                const oldImageUrl = userProfile.image ;
                if (oldImageUrl !== "") {
                    try {
                        const publicId = oldImageUrl.split('/').slice(-1)[0].replace(/\.[^/.]+$/, '');
                        const deleteImg = await cloudinary.uploader.destroy(publicId);
                        if(deleteImg){
                            console.log(deleteImg,'success');
                        }
                    } catch (error) {
                        console.error("Error deleting image from Cloudinary:", error);
                    }
                }
                userProfile.image=imageUrl;
                await userProfile.save()
                return new NextResponse (JSON.stringify("Image Upload Success"),{status:200})
            } else {  
                return new NextResponse (JSON.stringify("No user"),{status:500})
            }
        } catch (error) {
            return new NextResponse (JSON.stringify(error.message),{status:500})
        }
    } catch (error) {
        return new NextResponse (JSON.stringify(error.message),{status:500})
    }
}

