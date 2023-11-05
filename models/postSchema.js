import mongoose from 'mongoose';
const postSchema=new mongoose.Schema({
    post:"String",
    name:"String",
    profile:"String",
    desc:"String",
    tags:[String],
});
const Post=mongoose.models.Post || mongoose.model('Post',  postSchema);
export default Post;