import User from '../models/UserModel.js'
import jwtService from './JwtServices.js'
import bcrypt from "bcrypt"
import mongoose from 'mongoose' 
const service={};
service.createUser= (newUser)=>{
	return new Promise(async(resolve, reject)=>{
		const { name, email, password, confirmPassword, phone } = newUser;
		try {
			const checkUser=await User.findOne({
				email:email
			})
			if(checkUser!==null){
				resolve({
					status: 'OK',
					message: 'The email is already'
					});
			}else{
				const hash=bcrypt.hashSync(password,10);
				const createdUser = await User.create({
					name,
					email,
					password:hash,
					phone,
				});
		
				if (createdUser) {
					resolve({
					status: 'OK',
					message: 'User created successfully',
					data: createdUser,
					});
				} else {
					// Trường hợp tạo user thất bại nhưng không throw lỗi
					reject({
					status: 'ERR',
					message: 'User creation failed',
					});
				}
			}
		

		} catch (error) {
		reject({
			status: 'ERR',
			message: 'An error occurred while creating user',
			error: error.message,
		});
		}
	})
}
service.loginUser= (newUser)=>{
	return new Promise(async(resolve, reject)=>{
		const { name, email, password, confirmPassword, phone } = newUser;
		try {
			const checkUser=await User.findOne({
				email:email,
				// password:bcrypt.hashSync(password,10)
			})
			if(checkUser===null){
				resolve({
					status: 'OK',
					message: 'The user is not defined'
					});
			}else{
				const comparePassword=bcrypt.compareSync(password,checkUser.password);
				
				if (comparePassword) {
					const accessToken=await jwtService.generateAccessToken(
						{
							id:checkUser.id,
							isAdmin:checkUser.isAdmin
						}
					)
					const refreshToken=await jwtService.generateRefreshToken(
						{
							id:checkUser.id,
							isAdmin:checkUser.isAdmin
						}
					)
					console.log(accessToken,'accessToken+++++++++++++++++')
					resolve({
					status: 'OK',
					message: 'Login successfully',
					data: checkUser,
					access_token:accessToken,
					refresh_token:refreshToken
					});
				} else {
					// Trường hợp tạo user thất bại nhưng không throw lỗi
					reject({
					status: 'ERR',
					message: 'Login failed',
					});
				}
			}
		

		} catch (error) {
		reject({
			status: 'ERR',
			message: 'An error occurred while creating user',
			error: error.message,
		});
		}
	})
}
service.updateUser= (userId,data)=>{
	return new Promise(async(resolve, reject)=>{
		try {
			const checkUser=await User.findOne({
                _id: new mongoose.Types.ObjectId(userId.toString())
            })
			console.log(checkUser,'checkUser++++++++++++')
			console.log(userId,'userId++++++++++++')
			if(checkUser===null){
				resolve({
					status: 'OK',
					message: 'User does not exist'
					});
			}else{
				// const updateUser=await User.findByIdAndUpdate(data,{new:true});
				const updateUser = await User.findByIdAndUpdate(
                    userId,  // first parameter: ID
                    { $set: data },               // second parameter: data to update
                    { new: true }                 // third parameter: options
                );
				resolve({
					status: 'OK',
					message: 'User update successfully',
					// data: updateUser,
					});
			}
		

		} catch (error) {
		reject({
			status: 'ERR',
			message: 'An error occurred while creating user',
			error: error.message,
		});
		}
	})
}
export default service;