import mongoose from 'mongoose';
const { Schema } = mongoose;


const WorkSchema = new Schema({
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

export default mongoose.models.Work || mongoose.model('Work', WorkSchema);