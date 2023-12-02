import mongoose from 'mongoose';
const postSchema=new mongoose.Schema({
    post:{type:String,default:"https://clubs-bucket.s3.ap-south-1.amazonaws.com/users/iron.jpg"},
    name:"String",
    profile:{type:String,default:"https://clubs-bucket.s3.ap-south-1.amazonaws.com/nature.jpg"},
    desc:"String",
    tags:[String],
});
const Post=mongoose.models.Post || mongoose.model('Post',  postSchema);
export default Post;