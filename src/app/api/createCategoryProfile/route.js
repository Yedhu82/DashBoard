import connect from "@/utils/db";
import MainCategory from "@/models/MainCategory";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDAPIKEY,
    api_secret: process.env.CLOUDAPISECRET,
    secure: true,
});




export const dynamic = 'force-dynamic';
export const POST = async (request)=>{
    try {
        const catData = await request.formData();
        const title = catData.get('title')
        const subTitle = catData.get('subtitle')
        const imageFile = catData.get('image')

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
                console.log(imageUrl,'img');
    
                const mainCategory = await new MainCategory({
                    title:title,
                    subtitle:subTitle,
                    image:imageUrl
    
                })
                const category = await mainCategory.save()
    
                if(category){
                    return new NextResponse(JSON.stringify('Main Category'),{status:200})
                }
        } catch (error) {
            return new NextResponse(JSON.stringify(error.message),{status:500})
        }


    } catch (error) {
        return new NextResponse(JSON.stringify(error.message),{status:500})
    }
}