import mongoose from 'mongoose';
const { Schema } = mongoose;


const BlogSchema = new Schema({
title:{
    type:String,
},
subtitle:{
    type:String,
},
description:{
    type:String,
},
createdOn:{
type:String
},
image:{
    type:String
}
},

{timestamps:true}
)

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);