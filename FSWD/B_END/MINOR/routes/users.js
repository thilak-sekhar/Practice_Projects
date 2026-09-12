const express=require('express');
const router = express.Router();




let items=[
    {
        name:"Margherita",
        toppings:"Tomato sauce, fresh mozzarella, basil, olive oil",
        characteristics: "A classic Neapolitan pizza, known for its simplicity and fresh ingredients.",
        cost:"Rs.199/-",
    },
    {
        name:"Pepperoni",
        toppings:"Tomato sauce, mozzarella, pepperoni slices",
        characteristics:"One of the most popular pizzas in the United States, known for its spicy pepperoni.",
        cost:"Rs.229/-"
    },
    {
        name:"BBQ Chicken",
        toppings:" BBQ sauce, mozzarella, grilled chicken, red onions, cilantro",
        characteristics:"A smoky, tangy pizza with a distinct barbecue flavor..",
        cost:"Rs.299/-"
    },
    {
        name:"Panner_Tikka",
        toppings:"  Marinated paneer, tomato sauce, mozzarella cheese, bell peppers, onions, tomatoesr",
        characteristics:"Fusion of Italian and Indian flavors, soft paneer texture, spicy and tangy with marinated paneer.",
        cost:"Rs.299/-"
    },

]


router.get("/",(req,res)=>{
    res.send(items);
})


router.get("/:name", (req,res) =>{
    const name=req.params.name;
    filtered_item = items.filter(item => item.name == name);
    res.send(filtered_item);
})

router.delete("/:name",(req,res)=>{
    const name=req.params.name;
    items = items.filter(item => item.name != name);
    res.send('item with the name '+name+' deleted')
})

router.put("/:name",(req,res)=>{
    const name=req.params.name; 
    let filtered_items = items.filter((item=> item.name === name));
    if(filtered_items.length>0){
        let filtered_item = filtered_items[0];
        let name= req.query.name;
        let toppings=req.query.toppings;
        let characteristics=req.query.characteristics;
        let cost = req.query.cost;
        if(name){
            filtered_item.name = name;
        }
        if(toppings){
            filtered_item.toppings=toppings;
        }
        if(characteristics){
            filtered_item.characteristics = characteristics;
        }
        if(cost){
            filtered_item.cost = cost;
        }
        items = items.filter(item => item.name!=name);
        items.push(filtered_item);
        res.send('user is updated');

    }
    else{
        res.send("unable to find the user");
    }
})

router.post("/",(req,res)=>{
    items.push({
    "name":req.query.name,
    "toppings":req.query.toppings,
    "characteristics":req.query.characteristics,
    "cost":req.query.cost,
    });
    res.send("the user has been added");
})


module.exports=router;