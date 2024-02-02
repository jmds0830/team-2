import app from './app.js';
import userRoute from './routes/userRoute.js'; // Feel free to remove this route

// Add your routes here
app.use('/api/user', userRoute); // Feel free to remove this route

app.listen(app.get('port'), () => {
  console.log(`App is listening to port ${app.get('port')}`);
});
