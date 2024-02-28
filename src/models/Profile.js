import mongoose from 'mongoose';
const { Schema } = mongoose;


const ProfileSchema = new Schema({
name:{
    type:String,
   
},
email:{
    type:String,
},
password:{
    type:String,
},
imageUrl:{
    type:String
}

},

{timestamps:true}
)

export default mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);