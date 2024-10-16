const express=require("express");
const app=express();
const path=require("path");
let port =5000;
const {v4:uuidv4}=require("uuid");
const methodOverride=require("method-override");

app.set("view engine","views");
app.set("views",path.join(__dirname,"/views"));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname,"/public")));

let posts=[
    {
        id :uuidv4(),
        username:"Vivek",
        content:"I am a full stack Developer.. :)"
    },
    {
        id :uuidv4(),
        
        username:"Deepak",
        content:"I am a App Developer.. :)"
    },
    {
        id :uuidv4(),

        username:"Shivam",
        content:"I am a Neet Aspirant.. :)"
    },
    {
        id :uuidv4(),
        username:"Ansh",
        content:"I am a junior student. :)"
    },
];
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.post("/posts",(req,res)=>{
   if (req.body.username.length===0 || req.body.content.length===0){
    res.send("Oops ! Please Fill both the Inputs..")
   }
   else{
    let newPost={
        id :uuidv4(),
        username:req.body.username,
        content:req.body.content
    };
    posts.push(newPost)
    res.redirect("/posts")
   }
})
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.filter(elem=>elem.id==id)[0];
    if(post){
        res.render("show.ejs",{post});
    }
    else{
        res.send("Oops! Invalid UserId :(")
    }
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.filter(elem=>elem.id==id)[0];
    if(post){
        res.render("Edit.ejs",{post});
    }
    else{
        res.send("Oops! Invalid UserId :(")
    }
})

app.patch("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find(elem=>elem.id==id);
    if(post){
        post.content=req.body.content;
        res.redirect("/posts")
    }
    else{
        res.send("Oops! Invalid UserId :(")
    }

})

app.get("/posts/:id/del",(req,res)=>{
    let {id}=req.params;
    let post=posts.find(elem=>elem.id==id);
    if(post){
        res.render("delete.ejs",{post});  
    }
    else{
        res.send("Oops! Invalid UserId :(")
    }
})

app.delete("/posts/:id/del",(req,res)=>{
    let {id}=req.params;
    console.log(id);
    posts=posts.filter(post=>post.id!=id)
    res.redirect("/posts");
    })

app.listen(port,()=>{
    console.log(`server has started at port ${port}`);
})
