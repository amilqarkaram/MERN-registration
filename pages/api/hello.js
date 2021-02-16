// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//requiring packages
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const util  = require("util");
//initailizing middleware
// allow us to make handle HTTP requests from another origin
app.use(cors());
app.use(bodyparser.json());
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin-amilqar:123hurBnomC@cluster0.rmpoy.mongodb.net/mpUserDB", {useNewUrlParser: true, useUnifiedTopology: true});
const userDocSchema = {
  firstName: String,
  lastName: String,
  emailAddress: String,
  textResponse: String,
  image: String
};
const mpUser = mongoose.model("userInfo",userDocSchema);
app.post("/api/hello",function(req, res){
  let user = new mpUser(JSON.parse(req.body));
  user.save(function(err,user){
    if(err){console.log(err)}
  });
});
app.get("/api/hello",function(req,res){
  res.send(req.body);
});
export default app;
