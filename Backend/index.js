const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
require('dotenv').config();
const authRoutes=require('./routes/authRoutes');
const domainRoutes=require('./routes/domainRoutes');

const app=express();
app.use(cors());
app.use(express.json());

const PORT=process.env.PORT;

app.use('/api/auth',authRoutes);
app.use('/api/domain',domainRoutes);

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
})