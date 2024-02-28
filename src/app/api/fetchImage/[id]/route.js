import { NextResponse } from "next/server";
import connect from "@/utils/db";
import PortImage from "@/models/PortImage";


export const dynamic = 'force-dynamic';
export const GET = async(request,{params})=>{

    try{
        await connect()
        console.log(params.id);
        const work = await PortImage.findOne({_id:params.id});
         
        if(work){
            return new NextResponse(JSON.stringify(work),{
                status:200
            })
                }else
                {
            return new NextResponse(JSON.stringify('No Work found'),{status:404})
                }
       

    }catch(err){
        console.log(err.message);
            return new NextResponse(JSON.stringify(err.message),{status:500})
    }




}
