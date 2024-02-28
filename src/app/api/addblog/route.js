import connect from "@/utils/db";
import Blog from "@/models/Blog";
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
    const description =workData.get('description')
    const imageFile = workData.get('image')

    const date = new Date("2021-05-26");
const options = { month: 'long', day: '2-digit', year: 'numeric' };
const formattedDate = date.toLocaleDateString('en-US', options);

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

            const newWork = await new Blog({
                title:title,
                subtitle:subTitle,
                description:description,
                createdOn:formattedDate,
                image:imageUrl


            })
            const work = await newWork.save()

            if(work){
                return new NextResponse(JSON.stringify('Blog Cretared'),{status:200})
            }
    } catch (error) {
        return new NextResponse(JSON.stringify(error.message),{status:500})
    }

    } catch (error) {
        return new NextResponse(JSON.stringify(error.message),{status:500})
}

}