import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const service={};
service.generateAccessToken = async (payload) => {
  try {
    return jwt.sign(payload, process.env.NODE_APP_ACCESS_TOKEN || 'access_token', { expiresIn: '1h' });
  } catch (error) {
    console.error("Error generating access token:", error);
    throw new Error("Token generation failed");
  }
};
service.generateRefreshToken = async (payload) => {
	try {
	  return jwt.sign(payload, process.env.NODE_APP_REFRESH_TOKEN || 'refresh_token', { expiresIn: '365d' });
	} catch (error) {
	  console.error("Error generating access token:", error);
	  throw new Error("Token generation failed");
	}
  };
export default service;