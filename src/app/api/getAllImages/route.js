import connect from "@/utils/db";
import PortImage from "@/models/PortImage";
import { NextResponse } from "next/server";


export const dynamic = 'force-dynamic';
export const GET = async () => {

    try {

        await connect()
      const   imagesWithCategories = await PortImage.aggregate([
            {
              $addFields: {
                convertedCategoryId: { $toObjectId: "$category" } 
              }
            },
            {
              $lookup: {
                from: "portcategories",
                localField: "convertedCategoryId", 
                foreignField: "_id",
                as: "categoryDetails"
              }
            },
            {
              $unwind: "$categoryDetails" 
            },
            {
              $addFields: {
                "categoryTitle": "$categoryDetails.title"
              }
            },
            {
              $project: {
                "categoryDetails": 0, 
                "convertedCategoryId": 0 
              }
            }
          ]);
      
      
        return new NextResponse(JSON.stringify(imagesWithCategories), { status: 200 })

    } catch (error) {
        return new NextResponse(JSON.stringify(error.message), { status: 500 })
    }
}