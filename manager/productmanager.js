var models = require('./../mongoosemodels')

const productmanager = {
    add : (req,res) => {
        var entity = new models.Product();
        entity.name = req.body.name;
        entity.description = req.body.description;
        entity.unitprice = req.body.unitprice;

        entity.save((err,result) => {
            if(!err){
                res.status(201).send("Success!!");
            }
            else{
                res.status(500).json(err);
            }
        })
    },
    getall : (req,res) => {
        models.Product.find({},(err,document) => { 
            if(!err){
                document.sort({name:1});
                res.send("33");       
            }
            else{
                res.status(500).json(err);
            }
        })
    },
    getbyid: (req,res) => {
        var id = req.params.id;
        // models.Product.find({id:id},(err,document) => {
        //     if(!err){
        //         res.json(document[0]);
        //     }
        // })
        models.Product.findById(id,(err,document) => {
            if(!err){
                res.json(document);
            }
            else{
                res.status(500).json(err);
            }
        })
    },
    update: (req,res) => {
        var productid = req.body.id;
        models.Product.findById(productid,(err,document) => {
            if(!err && document != null){
                document.name = req.body.name;
                document.unitprice = req.body.unitprice;
                document.description = req.body.description;

                document.save((saveerr,saveresult) => {
                    if(!saveerr){
                        res.json(document);
                    }
                    else{
                        res.json(saveerr);
                    }
                })
            }
            if(!err && document == null){
                res.send("Böyle bir ürün bulunamadı");
            }
            if(err){
                res.json(err);
            }
            
            
        })
    },
    delete: (req,res) => {
        var productid = req.body.id;

        models.Product.findById(productid,(err,document) => {
            if(!err){
                document.isdelete = true;
                document.save();
                res.json(document);
            }
            else{
                res.status(500).json(err);
            }
        })
    },
    forcedelete:(req,res) => {
        var productid = req.body.id;

        models.Product.deleteOne({_id:productid},(err) => {
            if(!err){
                res.send("GERÇEK Silme işlemi başarılı! aman dikkat!");
            }
        });
    },
    getallactiveproducts: (req,res) => {
      //isdelete kolonu false olan productları getir.
      models.Product.find({isdelete:false},(err,document) => {
          if(!err){
              res.json(document);
          }
      })  
    },
    getallactiveproducstByPrice:(req,res) => {
        //isdelete false olan ve fiyatı body den gelen fiyata eşit olan
        var price = req.query.price;
      
        models.Product.find({isdelete:false,unitprice:price},(err,document) => {
            if(!err){
                res.json(document);
            }
        });
    },
    getallpnameorcname: (req,res) => {
        var pname = req.query.productname;
        var cname = req.query.categoryname;

        models.Product.find({$or:[{name:pname},{categoryname:cname}]},(err,document) => {
            if(!err){
                res.json(document);
            }
        })
    }

}

module.exports = {
    productmanager
}