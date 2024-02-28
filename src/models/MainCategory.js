import mongoose from 'mongoose';
const { Schema } = mongoose;


const MainCategorySchema = new Schema({
title:{
    type:String,
},
subtitle:{
    type:String,
},
image:{
    type:String
}
},

{timestamps:true}
)

export default mongoose.models.MainCategory || mongoose.model('MainCategory', MainCategorySchema);