import express from 'express';
import { json } from 'body-parser';
import mongoose from "mongoose";
// const usersRoutes = require('./routes/user');
// const User = require("./models/user");
const app = express();

const schema = new mongoose.Schema({
  firstName: {
      type: String,
      required: true
  },
  lastName: {
      type: String,
      requied: true
  }
});
const User = mongoose.model('User', schema);

mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://auth-mongo-srv:27017/auth",{ useNewUrlParser: true })
    .then(()=>{
        console.log("Connected to database");
    })
    .catch(()=>{
        console.log("Connection failed!"); 
    });

app.use(json());
app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", 
  "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.get('/api/', (req: any, res: any) => {
  res.send('Hi there!');
});
app.post('/api/user', (req: any, res: any) => {
  
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName
  });

  user.save().then((result: any) => {
    res.status(201).json({
        message: 'User created!!!',
        result: result
    });
  }).catch((err:any) => {
    res.status(500).json({
            message: "Invalid authentication credentials!"
    });
  });

  // res.send('User created!');
});
// app.use('/api/user/', usersRoutes)
app.listen(4000, () => {
  console.log('Listening on port 3000!!!!!!!!');
});
