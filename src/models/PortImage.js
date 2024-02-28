import mongoose from 'mongoose';
const { Schema } = mongoose;


const PortImageSchema = new Schema({
title:{
    type:String,
},
subtitle:{
    type:String,
},
category:{
type:String
},
image:{
    type:String
}
},

{timestamps:true}
)

export default mongoose.models.PortImage || mongoose.model('PortImage', PortImageSchema);