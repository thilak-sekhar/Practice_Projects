const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://thilakkalakandram:FtMdJOJ4LBGubeQr@cluster0.4gme6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
const db = mongoose.connection;
db.on('error',console.error.bind(console,'mongodb connection error'));


const itemSchema = new mongoose.Schema({
    name:String,
    toppings:String,
    characteristics:String,
    cost:String
    
})

const Item = mongoose.model('Item',itemSchema);
const app=express();
app.use(express.json());





app.get('/items', async (req,res)=>{
    try{
        const items = await Item.find();
        res.send(items);
    }catch(err){
        res.status(500).send(err);
    }
})

app.get('/items/:id', async (req,res)=>{
    try{
        const item = await Item.findById(req.params.id);
        if(!item){
            return res.status(404).send('Item not found');
        }
        res.send(item);
    }catch(err){
        res.status(500).send(err);
    }
})

app.delete('/items/:id', async (req,res)=>{
    try{
        const item = await Item.findByIdAndDelete(req.params.id);
        if(!item){
            return res.status(404).send('Item not found');
        }
        res.send('item deleted');
    }catch(err){
        res.status(500).send(err);
    }
})

app.put('/items/:id', async (req,res)=>{
    try{
        const item = await Item.findByIdAndUpdate(req.params.id, req.body , {new:true});
        if(!item){
            return res.status(404).send('Item not found');
        }
        res.send(item);
    }catch(err){
        res.status(500).send(err);
    }
})

app.post('/items', async (req,res)=>{
    try{
        const item = new Item(req.body);
        await item.save();
        res.send(item);
    }catch(err){
        res.status(500).send(err);
    }
})


const PORT = 3000;
app.listen(PORT, (req,res)=>{
    console.log("server is running on port"+PORT);
})