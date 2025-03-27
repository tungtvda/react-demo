import jwt from 'jsonwebtoken';

const authUserMiddleware = (req, res, next) => {
  try {
    const token = req.headers.token?.split(' ')[1]; // Kiểm tra token có tồn tại không
    if (!token) {
      return res.status(401).json({ message: 'No token provided', status: 'ERROR' });
    }

    const userId = req.params.id;

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token', status: 'ERROR' });
      }

      console.log('Authenticated User:', user);
      if (user.isAdmin || user.id === userId) {
        next();
      } else {
        return res.status(403).json({ message: 'Unauthorized access', status: 'ERROR' });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', status: 'ERROR' });
  }
};

export default authUserMiddleware;