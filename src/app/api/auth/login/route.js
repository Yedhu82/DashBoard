import connect from "@/utils/db";
import { cookies } from 'next/headers'
import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { getJwtSecretKey } from "@/libs/auth";
import Profile from "@/models/Profile";
import bcrypt from 'bcrypt'


export const dynamic = 'force-dynamic';
export const POST = async(request)=>{
    try{
        const {email , password } = await request.json();
         
        const lowercasedEmail = email.toLowerCase();
        console.log(email,password);
        await connect();
        const user = await Profile.findOne({email : lowercasedEmail})
        if(user){
            console.log("truw user");
            const isPasswordCorrect = await bcrypt.compare(password , user.password)
            if(isPasswordCorrect){
                console.log("truw pass");
              const token = await new SignJWT({
                     id: user._id,
                 })
                .setProtectedHeader({ alg: "HS256" })
                .setIssuedAt() 
                // .setExpirationTime("3000s") 
                .sign(getJwtSecretKey());
            cookies().set({
                name: 'userToken',
                value: token,
                httpOnly: true,
                path: '/',
              })

            const serializedUser = JSON.stringify(user); 
            
            return new NextResponse(serializedUser, { status: 200, headers: { "Content-Type": "application/json" } });
            }else{
                return new NextResponse(JSON.stringify("Password is Incorrect") , {status:401})
            }
        }
        else
        {
          
            return new NextResponse(JSON.stringify("User is Not an admin"), { status: 404 });

        }

      
        }catch(error){
        console.error("Error processing request:", error);
        return new NextResponse((JSON.stringify(error.message)), {
          status: 500,
        });
    }

}