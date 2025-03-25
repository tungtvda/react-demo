const service={};
service.createUser=()=>{
	return new Promise((resolve, reject)=>{
		try {
			resolve({
				test:'1'
			})
		} catch (error) {
			reject(error)
		}
	})
}
export default service;