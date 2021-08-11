const express = require("express");
const app = express();
const path = require("path");

//require and use our database
const reD = require("./data.json");
//css and ejs links
app.set("view engine", "ejs");
app.use(express.static("public"))


//home route
app.get("/",(req,res)=>{
    res.render("home", {name : "home"});
});

//friends route
app.get("/friends",(req,res)=>{
    const friends = ["Emmanuel", " Michael","Owino", "Ramsey","Bonke"];
    res.render("friends",{friends ,name:"friends"});
});

//lucky number route
app.get("/random",(req,res)=>{
    const luckyNo = Math.floor(Math.random() * 100 + 1);
    res.render("luckyNo", { luckyNo , name : "luckyNo"});
})
// subbredit route
app.get("/r/:subredit", (req,res)=>{
    const {subredit} = req.params;
    const data = reD[subredit];
    if(data){
        res.render("subredit", {...data} );
    }else{
        res.render("notfound",{subredit});
    }
})
app.get("/notfound", (req, res) => {
     res.render("notfound", {name : "notfound",notfound})
}); 
// invalid seach 
app.get("*", (req,res)=>{
    res.send("<h1> Invalid page request, try again!</h1>");
});


// this is the server
app.listen(8080,()=>{
    console.log("The server has started at 8080  Successfully!!")
})