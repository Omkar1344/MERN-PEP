require('dotenv').config();
const express = require('express'); //Express module included
const app = express(); //Instance of express appplication
const cors=require('cors');

const authRoutes=require('./src/routes/authRoutes');
const linksRoutes = require('./src/routes/linksRoutes');
const userRoutes = require("./src/routes/userRoutes")

const cookieParser = require('cookie-parser');
const { default: mongoose } = require('mongoose');

app.use(express.json()); //Middleware
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('Database connected'))
.catch(error=>console.log(error));

const corsOptions={
    origin: process.env.CLIENT_ENDPOINT,
    credentials:true
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));

app.use('/auth',authRoutes);
app.use('/links',linksRoutes);
app.use('/users',userRoutes);

const PORT=5000;

// app.get('/',(req,res)=>{
//     res.send("Hello World!!");
// });

// app.get('/about',(req,res)=>{
//     res.send("This is about page");
// })
app.listen(PORT,(error)=>{
    if(error){
        console.log('Server not started: ',error);
    }else{
    console.log(`Server is running on http://localhost:${PORT}`);
    }
})