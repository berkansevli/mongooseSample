var models = require('./../spotifymongoose');


const webusermanager = {
    add: (req,res) => {
        var webuser = new models.webuser();
        webuser.email = req.body.email;
        webuser.password = req.body.password;
        webuser.favorites = req.body.favorites;
        webuser.paymentmethods.name = req.body.pname;
        webuser.paymentmethods.cardno = req.body.cardno;
        webuser.paymentmethods.cvv = req.body.cvv;
        webuser.paymentmethods.lastdate = req.body.lastdate;
        webuser.isdelete = false;

        webuser.save((err,result) => {
            if(!err){
                res.send("Success!");

            }
        })
    },
    getall: (req,res) => {
        // models.webuser.find({}).limit(2).exec((err,data) =>{
        //     res.json(data);
        // })

        // models.webuser.find({}).sort('-email').limit(2).exec((err,data) =>{
        //     res.json(data);
        // })


       const x =  models.webuser.updateOne({_id:'5e491854ae12fe370c805c45'},{email:"pppp@ppp.com"});
      x.n;
      x.nModified;


        models.webuser.find({}).exec((err,data) =>{
            if(!err){
                res.json(data);
            }
            else{
                res.json(err);
            }
        });







    }
}

module.exports = {
    webusermanager
}


// With a JSON doc
// Person.
//   find({
//     occupation: /host/,
//     'name.last': 'Ghost',
//     age: { $gt: 17, $lt: 66 },
//     likes: { $in: ['vaporizing', 'talking'] }
//   }).
//   limit(10).
//   sort({ occupation: -1 }).
//   select({ name: 1, occupation: 1 }).
//   exec(callback);

// // Using query builder
// Person.
//   find({ occupation: /host/ }).
//   where('name.last').equals('Ghost').
//   where('age').gt(17).lt(66).
//   where('likes').in(['vaporizing', 'talking']).
//   limit(10).
//   sort('-occupation').
//   select('name occupation').
//   exec(callback);