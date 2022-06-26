const express=require("express");
const cors = require('cors');

const app = express();

const {Entry} = require('./models/entry');

app.use(express.json());
app.use(cors());


app.get('',(request,response)=>{
    response.send("Welcome")
});


app.get('/entries',async (request,response)=>{
    let entries = await Entry.find();
    response.send(entries);
});

app.post("/entries/create",(request,response)=>{
    let entry = request.body.entry;
    let entryObj = new Entry({...entry});
    entryObj.save();
    response.send("Entry Created");
});

app.delete("/entries/delete/:id",async (req, res)=>{
    await Entry.deleteOne({"_id" : req.params.id});
    res.send({message:"Entry deleted"});
});


app.put("/entries/update/:id",async (req, res)=>{
    
    const id = req.params.id;
    const entry = req.body.entry;
    await Entry.updateOne({"_id" : id},{$set:entry});
    res.send({message: "Entry updated"});
});

app.listen(4000, ()=>{
    console.log("Server is running");
}); 