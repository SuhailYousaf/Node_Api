const express =require('express')
const app= express()
const mongoose =require("mongoose")
const Product = require('./models/ProductModels')
require('dotenv').config();

app.use(express.json())

app.get('/',(req, res)=>{
     res.send("hello node api")
})

//get all products
app.get('/products',async(req,res)=>{
    try {
      const products = await Product.find({})
      res.status(200).json(products)
        
    } catch (error) {
         res.status(500).json({message:error.message})
    }
})

//get a product 
app.get('/product/:id',async(req,res)=>{
    try {
        const {id} =req.params;
      const product= await Product.findById(id);
      res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message:error.message})
    }

})

//update  a product
app.put('/product/:id',async(req, res)=>{
    try {
        const {id}= req. params;
        const product = await Product.findByIdAndUpdate(id, req.body)
        if(!product){
            res.status(404).json({message:`could not find Product ${id}`})
        }
        const Prod =await Product.findById(id)
        res.status(200).json(Prod)
    } catch (error) {
         res.status(500).json({message:error.message})
    }
     
})

//Delete a Product 
app.delete('/product/:id',async(req,res)=>{
     
    try {
        const {id}= req.params;
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            res.status(404).json({message:`could not found  product ${id}`})
        }
        res.status(200).json(product)
    } catch (error) {
         res.status({message:error.message})
    }

})

//product add / post
app.post('/product',async(req,res)=>{
   try {
     const product = await Product.create(req.body)
     res.status(200).json(product)
   } catch (error) {
       console.log(error.message)
       res.status(500).json({message:error.message})
   }
})


app.listen (3000,()=>{
    console.log("server Connected 3000")
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected Database!'))
  .catch((error)=>{
    console.log(`mongoDb Not connected ${error}`)
  })