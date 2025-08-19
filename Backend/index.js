const express=require("express");
<<<<<<< HEAD
const app=express();
app.listen(3000,()=>{
    console.log("server running on port 3000");
=======
const mongoose=require("mongoose");
const cors=require("cors");
require('dotenv').config();
const authRoutes=require('./routes/authRoutes');
const domainRoutes=require('./routes/domainRoutes');
const questionRoutes=require('./routes/questionRoutes');
const noteRoutes=require('./routes/noteRoutes');

const app=express();
app.use(cors());
app.use(express.json());

const PORT=process.env.PORT;

app.use('/api/auth',authRoutes);
app.use('/api/domain',domainRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/note', noteRoutes);

const connectDB=async()=>{
    try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Database Connected Succesfully !!!');
    }
    catch(error){
        console.error('Databse Connection Error',error.message);
        process.exit(1);
    }
}
connectDB();

app.get('/',(req,res)=>{
    res.send("Interview Prep API is working !!!");
});

app.listen(PORT,()=>{
    console.log("Server is running Properly !!!!");
>>>>>>> 8b3cf7f3ce3123cf065f5951a688de3297c8b023
})