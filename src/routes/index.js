
// import userRouter from 'src/routes/UserRouter';
import userRouter from './UserRouter.js'; // Import đúng đường dẫn

const routesIndex = {
  routes: (app) => {
    app.use('/api/user', userRouter); // Sử dụng userRouter thay vì {}
  },
};

export default routesIndex;