import userSevice from '../services/UserServices.js';
const controllers={};
controllers.createUser=async (req,res)=>{
	try {
		// console.log(req.body,'createUser+++++++++')
		// const data=await userSevice.createUser();
		return res.status(200).json(
			{}
		);
	} catch (e) {
		return res.status(404).json({
			message:e
		})
	}
}
export default controllers;