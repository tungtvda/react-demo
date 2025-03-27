import userSevice from '../services/UserServices.js';
const controllers={};
controllers.createUser=async (req,res)=>{
	try {
		const { name, email, password, confirmPassword, phone } = req.body;
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    	const isEmailValid = emailRegex.test(email);
		if (!name || !email || !password || !confirmPassword || !phone) {
			return res.status(400).json({
			  status: "ERR",
			  message: "All fields are required",
			});
		}
		if (!isEmailValid) {
			return res.status(422).json({
			  status: "ERR",
			  message: "Invalid email format",
			});
		}
		if (password !== confirmPassword) {
			return res.status(422).json({
			  status: "ERR",
			  message: "Passwords do not match",
			});
		}
		const newUser = await userSevice.createUser({ name, email, password, phone });
		return res.status(201).json({
			status: "OK",
			message: "User created successfully",
			data: newUser,
		  });
	} catch (e) {
		console.log(e,'e++++++++++++++++++++++++++')
		return res.status(500).json({
			status: "ERR",
			message: "Internal server error"
		});
	}
}
controllers.loginUser=async (req,res)=>{
	try {
		const { email, password} = req.body;
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    	const isEmailValid = emailRegex.test(email);
		if ( !email || !password) {
			return res.status(400).json({
			  status: "ERR",
			  message: "All fields are required",
			});
		}
		if (!isEmailValid) {
			return res.status(422).json({
			  status: "ERR",
			  message: "Invalid email format",
			});
		}
		
		const newUser = await userSevice.loginUser({email, password});
		if(newUser.status==="OK"){
			return res.status(201).json({
				status: "OK",
				message: "User login successfully",
				data: newUser,
			  });
		}
		return res.status(500).json({
			status: "ERR",
			message: "User login fail",
		  });
	} catch (e) {
		console.log(e,'e++++++++++++++++++++++++++')
		return res.status(500).json({
			status: "ERR",
			message: "Internal server error"
		});
	}
}
controllers.updateUser=async (req,res)=>{
	try {
		console.log(req.params.id,'req.param.id++++++++++++++')
		const userId=req.params.id,
		response=await userSevice.updateUser(userId, req.body);
		return res.status(201).json({
			status: "OK",
			message: "User Update successfully",
			update:response
		  });
	} catch (e) {
		console.log(e,'e++++++++++++++++++++++++++')
		return res.status(500).json({
			status: "ERR",
			message: "Update fail"
		});
	}
}
controllers.getUser=async (req,res)=>{
	try {
		const userId=req.params.id,
		response=await userSevice.updateUser(userId);
		return res.status(201).json({
			status: "OK",
			message: "Get user successfully",
			data:response.data
		  });
	} catch (e) {
		console.log(e,'e++++++++++++++++++++++++++')
		return res.status(500).json({
			status: "ERR",
			message: "Update fail"
		});
	}
}
export default controllers;