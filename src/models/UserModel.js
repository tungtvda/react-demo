import { Schema, model } from "mongoose";
const userSchema=new Schema(
	{
		name:{type:String, required:true},
		email:{type:String, required:true, unique:true},
		password:{type:String, required:true},
		isAdmin:{type:Boolean, default:false, required:true},
		phone:{type:String, required:false},
		access_token:{type:String, required:false},
		refresh_token:{type:String, required:false}
	},
	{
		timestamps:true
	}
);
const User=model("User",userSchema);
export default User;