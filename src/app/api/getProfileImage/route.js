import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Profile from "@/models/Profile";



const userId = '65d127c81ba53393e31d956b'



export const GET = async()=>{
    try {
        await connect()
        const user = await Profile.findOne({_id:userId})
        const imagUrl = user.imageUrl
        return new NextResponse(JSON.stringify(imagUrl),{status:200})
    } catch (error) {
        return new NextResponse(JSON.stringify(error.message),{status:500})
    }
}