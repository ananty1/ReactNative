require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt")


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));


app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
        credentials: true,
        optionsSuccessStatus: 204,
    })
);

// const mongodburl = "mongodb://localhost:27017";   // for localhost testing

const mongodbusername = process.env.MONGO_USERNAME;   
const mongodbpassword = process.env.MONGO_PASSWORD;   

mongoose.connect(`mongodb+srv://${mongodbusername}:${mongodbpassword}@cluster0.uteab1d.mongodb.net/?retryWrites=true&w=majority` , {
    dbName: "retina",
}).then(()=> {
    console.log("Database Connected");
}).catch((e) => {console.log(e)});



// Define a user schema
const userSchema = new mongoose.Schema({
    name : {type: String , required: true},
    age : { type: Number , required: true},
    email : {type: String , required: true},
    password : {type: String , required: true},

    classificationHistory: [{
      class: { type: String, required: true },
      confidence: { type: Number, required: true },
      timestamp: { type: Date, default: Date.now }
  }]
});

const UserModel = mongoose.model('User', userSchema);



app.post('/api/classify', async (req, res) => {
  try {
      const { email, imageClass, confidence } = req.body;

      const user = await UserModel.findOne({ email });

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      user.classificationHistory.push({
          class: imageClass,
          confidence,
      });

      await user.save();

      res.status(200).json({ message: 'Classification details saved successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});



// Route for user registration
app.post('/api/user/register', async (req, res) => {
    try {
      const { name, age, email, password } = req.body;
  
      const existingUser = await UserModel.findOne({ email });
  
      if (existingUser) {
        console.log(existingUser);
        return res.status(400).json({ message: 'User with this email already exists' });
      }
  
    const hashedpassword = await bcrypt.hash(password , 10);
     await UserModel.create({
       name,
       email,
       password : hashedpassword,
       age,
     });

      // const newUser = new UserModel({ name, age, email, password });
      // console.log(newUser);
      // await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

// Route for user login
app.post('/api/user/login', async (req, res) => {
  const { email, password } = req.body;
    // console.log(email);
    // console.log(password);
  try {
    const user = await UserModel.findOne({ email, });
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Wrong password' });
    }

    return res.json({ message: 'Login successful' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


const port = process.env.PORT || 3000 ;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
