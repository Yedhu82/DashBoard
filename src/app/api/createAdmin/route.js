import Profile from "@/models/Profile";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'


export const POST = async(request)=>{
    try {
        await connect()

        const {name,email,password} = await request.json()
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newProfile = new Profile({
            name:name,
            email:email,
            password:hashedPassword
        })

       const profile =  await newProfile.save()
         if(profile){
            return new NextResponse(JSON.stringify("Profile Registered success"),{status:200})
         }
         else{
            return new NextResponse(JSON.stringify("Error in Registering"),{status:500})
         }




    } catch (error) {
        return new NextResponse(JSON.stringify(error.message),{status:500})
    }
}