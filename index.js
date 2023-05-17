require('dotenv').config();
const express = require('express');
const cors =require('cors');

//import routes
const connect = require('./db/connect');
const productData = require('./models/product.model');
const productRoute = require('./routes/product.route');
const scrapData =require('./db/scrap');

const app = express();
app.use(express.json());
//cors
app.use(cors());

//connecting DB
// connect();  

app.get('/',(req, res) => {
    res.send('Welcome to Web scrapping app!!');     
});
  //connecting DB

server = async ()=>{
    await connect();
    await scrapData();
    //Db resets for every 12 hrs i.e:43200*1000;

    setInterval( async () =>{
        await scrapData();
        console.log('data reseted');
    },43200*1000);
}

app.use((res,req,next) => {
    console.log('logging middlware');
    next();
});

//product routers
app.use('/api/product', productRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`App running on port ${PORT}`);
})

server();