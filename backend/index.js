const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT=3000;

app.get('/',(req,res)=>{
    res.send("Hello World!!");
});

app.get('/about',(req,res)=>{
    res.send("This is about page");
})
app.listen(PORT,()=>{
    console.log(`Server is running on`,{PORT});
})