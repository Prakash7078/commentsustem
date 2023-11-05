import connectDB from '../../libs/mongodb';
import Post from '../../models/postSchema';
import { NextResponse } from 'next/server';
import Comment from '../../models/commentSchema';
export async function GET() {
    await connectDB();
    const posts=await Post.find({});
    return new NextResponse(JSON.stringify({posts}));

}
export async function POST(req) {
    await connectDB();
    const data=await req.json();
    const res=await Comment({personId:data.itemid,desc:data.desc,msgs:[]});
    await res.save();
    console.log(res);
    return new NextResponse(JSON.stringify({message:"add succesfully"}));

}
export async function PUT(req){
    await connectDB();
    const data=await req.json();
    const update = { $push: {msgs: data.desc } };
    console.log(update);
    console.log(data._id);
    const res=await Comment.findByIdAndUpdate(data._id,update,{new:true});
    console.log(res);
    return new NextResponse(JSON.stringify({message:"update succesfully"}));

}