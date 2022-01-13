const express = require("express");
const path = require("path");
const hbs=require("hbs");
require("./db/conn");
const User=require("./models/usermessage")
const app = express();
port = process.env.port || 3000;


var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
app.use(express.json());

//seting the path
const staticpath = path.join(__dirname, "../public");
const templatespath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");


//middleware
app.use("/css",express.static(path.join(__dirname, "../node_modules/bootstrape/dist/css")));
app.use("/js",express.static(path.join(__dirname, "../node_modules/bootstrape/dist/js")));
app.use("/jq",express.static(path.join(__dirname, "../node_modules/jquery/dist")));

app.use(express.urlencoded({extended:false}));
app.use(express.static(staticpath));

app.set("view engine","hbs");
app.set("views", templatespath);
hbs.registerPartials(partialpath);

//routing
//app.get(path,callback)
app.get("/", (req, res) => {
  res.render("index");
});

  app.post("/contact", async(req, res) => {
    try{
      //res.render("contact");
    const userData=new User(req.body);
    await userData.save();
    res.status(201).render("index");
    }catch(error){
      res.status(500).send(error);
    }
  });
//server
app.listen(port, () => {
  console.log(`server running at port no:${port}`);
});
 