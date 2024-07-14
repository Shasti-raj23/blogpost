import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import product from "./product/product.models.js";

const app = express();
const port = 4000;

// In-memory data store

let lastId = 0;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let posts
//Write your code here//
async function  getBlogs(){
  const blogs = await product.find({})
  return blogs
}
//CHALLENGE 1: GET All posts
app.get("/posts",async(req,res)=>{
  try{
    posts= await getBlogs()
    res.json(posts);
  }catch{
    res.sendStatus(500)
  }
})

//CHALLENGE 2: GET a specific post by id
app.get("/posts/:id",async(req,res)=>{
  posts = await getBlogs() 
  const post = posts.find((p)=> p.id === parseInt(req.params.id))
  if(!post) return res.status(400).json({message:"The post not found"});
  res.json(post);

})
//CHALLENGE 3: POST a new post
app.post("/posts",async(req,res)=>{
  const newId = lastId+1
  const post={
    id: newId,
    title : req.body.title,
    content : req.body.content,
    author : req.body.author,
    date : new Date()
  }
      const products=await product.create(post)
      res.status(200).json(products)
  // res.status(201).send(post)

})

//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch("/posts/:id",async(req,res)=>{
  const post={
    authour:req.body.author,
    title:req.body.title,
    content:req.body.content
  }
  console.log(post)
  const idc = parseInt(req.params.id)
  const result = await product.updateOne({id:idc},post)
  res.json(result);
})
//CHALLENGE 5: DELETE a specific post by providing the post id.
app.delete("/posts/:id",async(req,res)=>{
  
  try {
    const result = await product.deleteOne({ id: req.params.id });
    if (result.deletedCount === 0) {
        return res.status(404).send({ message: 'Product not found' });
    }
    res.status(200).send({ message: 'Product successfully deleted' });
} catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal Server Error' });
}
  
})

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});


mongoose.connect('mongodb+srv://blog:blog@blogpost.oyhs3ox.mongodb.net/?retryWrites=true&w=majority&appName=blogpost')
.then(()=>{
  console.log("Succesfully connected")
}
).catch(()=>{
  console.log("Error in connecting to the database")
})