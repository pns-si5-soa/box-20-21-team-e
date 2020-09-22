const express=require('express');
const app=express();


app.get('/',(req,res)=>{
    try {
        res.send('hello Richard');
      } catch (error) {
        console.error(error);
       
      }
});
app.get('/elon',(req,res)=>{
    try {
        res.send("hello Richard c'est Elon");
      } catch (error) {
        console.error(error);
       
      }
})
app.get('/tory',(req,res)=>{
    try {
        res.send("hello Richard c'est Tory");
      } catch (error) {
        console.error(error);
       
      }
})
app.listen(3000,()=>console.log('listening on port 3000 '))
