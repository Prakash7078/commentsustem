import connectDB from '../../../libs/mongodb';
import Post from '../../../models/postSchema';
import { NextResponse } from 'next/server';
export async function POST(req){
    await connectDB();
    const {username,desc,tags}=await req.json();
    const res=await Post({name:username,desc:desc,tags:tags.split('#')});
    await res.save();
    return new NextResponse(JSON.stringify({message:"post add succesfully"}));
}
