import connect from "@/utils/db";
import Work from "@/models/Work";
import { NextResponse } from "next/server";

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDAPIKEY,
    api_secret: process.env.CLOUDAPISECRET,
    secure: true,
});

export const dynamic = 'force-dynamic';
export const DELETE = async(request,{params}) => {

try {
    await connect();
 console.log(params.id);
    if (!params.id) {
        return new NextResponse("No ID provided", { status: 400 });
    }

    const work = await Work.findOne({_id:params.id})
  console.log(work);
       if(!work){
        return new NextResponse(JSON.stringify("Course not found"), { status: 404 });
    }

    const publicId = work.image.split('/').slice(-1)[0].replace(/\.[^/.]+$/, '');
  

    try {
        const deleteImg = await cloudinary.uploader.destroy(publicId);
        if (deleteImg.result === 'ok') {
            console.log(deleteImg, 'success');
        } else {
            console.log(deleteImg, 'failed');
        }
    } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
    }

    const result = await Work.deleteOne({ _id: params.id });

        if (result.deletedCount === 0) {
            return new NextResponse(JSON.stringify("Course not found"), { status: 404 });
        }

        return new NextResponse(JSON.stringify("Course deleted successfully"), { status: 200 });

} catch (error) {
    return new NextResponse(JSON.stringify(error.message), { status: 500 });
}






}