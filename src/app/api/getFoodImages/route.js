import connect from "@/utils/db";
import PortImage from "@/models/PortImage";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const GET = async () => {
    try {
        await connect();
        
        const fashionImages = await PortImage.aggregate([
            {
                $match: { category: '65d3bc82b53dd9e23fe74671' } // Filter documents with the given category ID
            },
            {
                $project: { image: 1,title:1, _id: 0 }// Include only the image field, exclude _id
            }
        ]);

        return new NextResponse(JSON.stringify(fashionImages), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify(error.message), { status: 500 });
    }
}
