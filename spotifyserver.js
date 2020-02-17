const express = require('express');
var app = express();
var wu = require('./spotifymanager/webusermanager');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var privatekey = "k7R!.44TeHtM8VvQzhf"
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.post('/webuser/add',(req,res)=> {
    wu.webusermanager.add(req,res);
});


app.get('/webuser',(req,res) => {
    var token = req.query.token;

    try {
        var result = jwt.verify(token, privatekey);
        wu.webusermanager.getall(req,res);
      } 
      catch(err) 
      {
          console.log(err);
          res.status(401).send("Yetkisiz erişim!!");
      }

})


app.post('/token',(req,res) => {
    var email = req.body.email;
    var password = req.body.password;

    if(email == "a@a.com" && password == "123"){
       var token = jwt.sign(email,privatekey);
       res.send(token);
    }
    else{
        res.send("token yok token");
    }
})


app.listen(3000);