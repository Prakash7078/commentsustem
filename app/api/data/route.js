import connectDB from '../../../libs/mongodb';
import Post from '../../../models/postSchema';
import { NextResponse } from 'next/server';
import Comment from '../../../models/commentSchema';
import data from '../data';
export async function POST(req) {
    await connectDB();
    await Post.deleteMany({});
    for(let key in data.posts){
        const {post,name,profile,desc,tags}=data.posts[key];
        const res=await Post.create({post,name,profile,desc,tags});
        console.log("res",res);
    }
    return new NextResponse(JSON.stringify({message:"created succesfully"}));
}
export async function GET(req){
    await connectDB();
    const res=await Comment.find({});
    return new NextResponse(JSON.stringify({res}));

}