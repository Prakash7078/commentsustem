import connectDB from '../../../libs/mongodb';
import Post from '../../../models/postSchema';
import { NextResponse } from 'next/server';
export async function DELETE(req,{params}){
    const {id}=params;
    await connectDB();
    await Post.findByIdAndDelete(id);
    return new NextResponse(JSON.stringify({message:"post delete succesfully"}));
}