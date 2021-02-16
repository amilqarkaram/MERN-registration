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
  image: String,
  githubName: String
};
let mpUser;
try {
  mpUser = mongoose.model('user')
} catch (error) {
  mpUser = mongoose.model('user', userDocSchema)
}
app.post("/api/hello",function(req, res){
  console.log("Json parse: ");
  console.log(util.inspect(JSON.parse(req.body), {showHidden: false, depth: null}));
  mpUser.findOne({githubName: (JSON.parse(req.body)).githubName},
  function(err,user){
    if(err){console.log(err)}
    else{
      if(!user){
        let user = new mpUser(JSON.parse(req.body));
        console.log("Creating a new user ");
        user.save(function(err,user){
          if(err){console.log(err)}
        });
      }
      else{
        user.overwrite(JSON.parse(req.body));
        user.save();
        console.log("User should be updated ");
      }
    }
  });
});
app.get("/api/hello",function(req,res){
  if(req.query.githubName){
  mpUser.findOne({githubName: req.query.githubName},function(err,result){
     if(err){console.log('there was an error in search for the query')}
     else{
       console.log("result: ");
       console.log(util.inspect(result, {showHidden: false, depth: null}));
       res.json(result);
     }
  });
}
else{
  res.send(null);
  res.end();
}
});
export default app;
