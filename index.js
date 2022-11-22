require('dotenv').config();
const express = require('express');

//import routes
const connect = require('./db/connect');
const productData = require('./models/product.model');

const productRoute = require('./routes/product.route');

// const scarpData =require('./db/scrap');
const cors =require('cors');

const app = express();

//connecting DB
connect();

app.use(express.json());


//cors
app.use(cors());

app.get('/',(req, res) => {
    res.send('Welcome to Web scrapping app!!');     
    });


  
// server = async ()=>{
//     await connect();
//     await scarpData();

//     setInterval( async () =>{
//         await scrapData();
//         console.log('data reseted');
//     },43200*1000);
// }

// app.use((res,req,next) => {
//     console.log('logging middlware');
//     next();
// });

//product routers
app.use('/api/product', productRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`App running on port ${PORT}`);
})

// server();
