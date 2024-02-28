import connect from "@/utils/db";
import PortImage from "@/models/PortImage";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';




cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDAPIKEY,
    api_secret: process.env.CLOUDAPISECRET,
    secure: true,
});



export const dynamic = 'force-dynamic';
export const POST = async(request)=>{
try {
    await connect();
    const workData = await request.formData();
    console.log(workData);
    const title = workData.get('title')
    const subTitle = workData.get('subtitle')
    const imageFile = workData.get('image')
    const category = workData.get('category')

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

            const newWork = await new PortImage({
                title:title,
                subtitle:subTitle,
                category:category,
                image:imageUrl

            })
            const work = await newWork.save()

            if(work){
                return new NextResponse(JSON.stringify('Work Cretared'),{status:200})
            }
    } catch (error) {
        return new NextResponse(JSON.stringify(error.message),{status:500})
    }

    } catch (error) {
        return new NextResponse(JSON.stringify(error.message),{status:500})
}

}