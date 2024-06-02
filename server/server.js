//dotenv
require ('dotenv').config();
//connect DB
const {connectDB} = require('./config/db');
connectDB();


const express = require('express');
const cors = require('cors');

//Import Routes
const authRoute = require('./routes/authRoute');
const quizRoute = require('./routes/quizRoute');

const { register } = require('./controllers/authController');
const multer = require('multer');

const path = require('path');

const app = express();

//cors
app.use(cors());

//body parser
app.use(express.json());

//Mount the route
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/quizzes',quizRoute);

//Image Storage Engine
const storage = multer.diskStorage({
  destination: './upload/images',
  filename:(req,file,cb)=>{
      return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({storage:storage})

//Creating upload Endpoint for image
app.use('/images',express.static('upload/images'))



app.post("/api/v1/upload",upload.single('quiz'),(req,res)=>{

  res.json({
      success: 1,
      image_url:`http://localhost:${port}/images/${req.file.filename}`
  })
})

app.post("/api/v1/uploadAvatar",upload.single('avatar'),(req,res)=>{

  res.json({
      success: 1,
      image_url:`http://localhost:${port}/images/${req.file.filename}`
  })
})
  

    

const port = process.env.APP_PORT;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})