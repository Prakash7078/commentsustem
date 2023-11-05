import mongoose from 'mongoose';
const commentSchema=new mongoose.Schema({
    personId:{type:String, required:true},
    msgs:[String],
    desc:{type:String, required:true},
});
const Comment=mongoose.models.Comment || mongoose.model('Comment',commentSchema);
export default Comment;