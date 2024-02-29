import connect from "@/utils/db"
import MainCategory from "@/models/MainCategory"
import { NextResponse } from "next/server"




const catId = '65d3985db53dd9e23fe74625'

export const dynamic = 'force-dynamic';
export const GET = async ()=>{
    try {
        await connect()
        const category = await MainCategory.findOne({_id:catId})
        
        return new NextResponse(JSON.stringify(category),{status:200})
    } catch (error) {
        return new NextResponse("Poda Myre",{status:500})
    }
}