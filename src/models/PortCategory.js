import mongoose from 'mongoose';
const { Schema } = mongoose;


const PortCategorySchema = new Schema({
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

export default mongoose.models.PortCategory || mongoose.model('PortCategory', PortCategorySchema);