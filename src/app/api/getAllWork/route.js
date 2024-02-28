import connect from "@/utils/db";
import Work from "@/models/Work";
import { NextResponse } from "next/server";


export const dynamic = 'force-dynamic';
export const GET = async () => {

    try {

        await connect()
        const works = await Work.find()
        return new NextResponse(JSON.stringify(works), { status: 200 })

    } catch (error) {
        return new NextResponse(JSON.stringify(error.message), { status: 500 })
    }
}