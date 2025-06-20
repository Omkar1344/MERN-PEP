const express = require('express'); //Express module included
const app = express(); //Instance of express appplication

const authRoutes=require('./src/routes/authRoutes');
const cookieParser = require('cookie-parser');

app.use(express.json()); //Middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/auth',authRoutes);

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