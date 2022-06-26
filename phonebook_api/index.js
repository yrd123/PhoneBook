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

app.listen(4000, ()=>{
    console.log("Server is running");
}); 