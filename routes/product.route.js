const { request, response } = require('express');
const express = require('express');

const productData = require('../models/product.model');


const route = express.Router();



//to get paginated get api.
route.get('/',(request,response)=>{
    response.status(200).send({message:"Welcome to my web scrapping app"})
})

//add new product
route.post('/mobiles', async (req, res) => {
    try{
        const payload = req.body;

        const newMobile = new productData(payload);

        await newMobile.save((err, data)=> {
            if(err){
                return res.status(400).send({message: 'Error while adding new Mobile details. Please check the data'});
            }
            res.status(201).send({mobileId: data._id, message: "Mobile has been added successfully." })
        })

    }catch(error){
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
});

//show details
route.put('/mobiles/:mobID', (req, res) => {
    try{
        productData.findByIdAndUpdate({_id: req.params.mobID}, {$set: req.body}, (err, data) =>{
            if(err){
                return res.status(400).send({message: 'Error while updating an existing user. Please check the data'})
            }

            res.status(201).send({mobileId: data._id, message: "Mobiles details have been updated."})
        })

    }catch(error){
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
});
//details
route.get('/mobiles', (req, res) => {
    try {
      var search = req.query.search;
      let { page, size } = req.query;
      if (!page) {
        page = 1;
      }
      if (!size) {
        size = 10;
      }
      const limit = parseInt(size);
      const skip = (page - 1) * size;
  
      productData
        .find(
          {
            title: { $regex: '.*' + search + '.*', $options: 'i' },
          },
          (err, data) => {
            if (err) {
              res.status(401).json('product not found');
            } else {
              res.status(200).json({
                page,
                size,
                data: data,
              });
            }
          }
        )
        .limit(limit)
        .skip(skip);
    } catch (error) {
      res.status(500).json('Internal server error');
      console.log('something went wrong', error);
    }
  });
  
  //delete product with id
  route.delete('/mobiles/:mobID', (req, res) => {
    try{
        productData.deleteOne({_id: req.params.mobID}, (err, data) => {
            if(err){
                return res.status(400).send('Error while deleting an mobile det. Please check the data');
            }

            res.status(200).send({message : `Mobile with id ${req.params.mobID} has been deleted.`})
        })
    }catch(error){
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
});
   

module.exports = route;