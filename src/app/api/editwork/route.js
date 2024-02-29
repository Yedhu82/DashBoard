import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Work from "@/models/Work";
import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDAPIKEY,
    api_secret: process.env.CLOUDAPISECRET,
    secure: true,
});

export const dynamic = 'force-dynamic';
export const POST = async (request) => {
    try {
        await connect();
        const workData = await request.formData();
        console.log(workData);
        const title = workData.get('title');
        const subTitle = workData.get('subtitle');
        const id = workData.get('id');
        const imageFile = workData.get('image');

        if (!id) {
            throw new Error('Work ID is required.');
        }

        const work = await Work.findOne({ _id: id });
        if (!work) {
            throw new Error('Work not found.');
        }
         console.log(imageFile,'imf');
         if (imageFile !== null) {
            console.log("Image file is not null. Proceeding with image upload.");
            try {
                const imageUrl = await uploadImageToCloudinary(imageFile);
               
               
               
                const oldImageUrl = work.image;

                if (oldImageUrl) {
                    await deleteImageFromCloudinary(oldImageUrl);
                }

                // Update the image URL in the database
                work.image = imageUrl;
            } catch (error) {
                console.error('Error uploading image:', error);
                throw new Error('Failed to upload image.');
            }
        }

        // Update other fields in the database
        work.title = title;
        work.subtitle = subTitle;
        await work.save();

        return new NextResponse(JSON.stringify("Success"), { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return new NextResponse(JSON.stringify(error.message), { status: 500 });
    }
};

async function uploadImageToCloudinary(imageFile) {
    const fileBuffer = await imageFile.arrayBuffer();
    const mime = imageFile.type;
    const encoding = 'base64';
    const base64Data = Buffer.from(fileBuffer).toString('base64');
    const fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;

    const result = await cloudinary.uploader.upload(fileUri, { invalidate: true });
    return result.secure_url;
}

async function deleteImageFromCloudinary(imageUrl) {
    try {
        const publicId = imageUrl.split('/').slice(-1)[0].replace(/\.[^/.]+$/, '');
        const deleteImg = await cloudinary.uploader.destroy(publicId);
        if (deleteImg) {
            console.log(deleteImg, 'success');
        }
    } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
        throw new Error('Failed to delete image from Cloudinary.');
    }
}