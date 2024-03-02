const express = require ('express')
const app = express();
const cors = require ('cors');
const mongoose = require('mongoose');
const { getStudent, addStudent, getSingleStudent, deleteStudent, updateStudent } = require('./controllers/studentcontroller');
const { addCourse, getCourse, getSingleCourse, deleteCourse, updateCourse} = require('./controllers/coursecontroller');
require('dotenv').config()

const port = process.env.PORT || 3000

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});


//Middleware
app.use(cors())
app.use(express.json());

app.get('/' , (req, res)=>{
    res.send('Hello World')
})

//Studend API
app.get('/api/v1/students', getStudent);
app.get('/api/v1/students/:id', getSingleStudent);
app.post('/api/v1/students', addStudent);
app.delete('/api/v1/students/:id', deleteStudent);
app.put('/api/v1/students/:id', updateStudent);

//Course API
app.get('/api/v1/course', getCourse);
app.get('/api/v1/course/:id', getSingleCourse);
app.post('/api/v1/course', addCourse);
app.delete('/api/v1/course/:id', deleteCourse);
app.put('/api/v1/course/:id', updateCourse);


const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log('DATABASE CONNECTED');
    } catch (error) {
      console.log(error);
    }
  }
  connectDB().then(() => {
    app.listen(process.env.PORT)
  }).catch((err) => {
    console.log(err)
  })