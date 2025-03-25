import User from '../models/UserModel.js'
import bcrypt from "bcrypt"
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
					resolve({
					status: 'OK',
					message: 'Login successfully',
					data: checkUser,
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
export default service;