import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique:true
  },
  password: {
    type: String,
    required: true,
    min:5,
  },
  picturePath:{
    type:String,
    default:"",
  },
  friends:{
    type:Array,
    default:[]
  },
  location:{
    type:String
  },
  occupation:{
    type:String
  },
  viewedProfile:{
    type:Number,
    default:0
  },
  impressions:{
    type:Number,
    default:0
  }
},{timestamps:true});
// {timestamps:true} : this will give us automatic dates for when it is created 

const User=mongoose.model("User",userSchema);
export default User;