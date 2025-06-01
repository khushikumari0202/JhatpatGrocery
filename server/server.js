import express from 'express';

const app = express();
const port = process.env.PORT || 4000;

//middleware configuration

app.get('/', (req, res)=> res.send("API is working"));

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})