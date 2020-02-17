const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0-6plg3.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });

const Schema = mongoose.Schema;


// function BaseSchema() {   
        
//     Schema.apply(this, arguments);     
                                        
//     this.add({                              
//         isdelete:Boolean,
//         adddate:Date,
//         updatedate:Date
//     });                                     
// };
// util.inherits(BaseSchema, Schema);


const adminuserSchema = new Schema({
    email:String,
    password:String
})


const webuserSchema = new Schema({
    email:String,
    password:String,
    favorites:[],
    paymentmethods:{
        name:String,
        cardno:String,
        cvv:String,
        lastdate:String
    }
});

const artistSchema = new Schema({
    name:String,
    profilimg:String,
    description:String,
    Albums:Array
});

const albumSchema = new Schema({
    name:String,
    publishdate:Date,
    description:String,
    thumbimg:String,
    songs:[]
});

const songSchema = new Schema({
    name:String,
    time:Number,
    file:String
});


const album = mongoose.model('AlbumModel', albumSchema);
const webuser = mongoose.model('WebUserModel', webuserSchema);
const song = mongoose.model('SongModel', songSchema);
const artist = mongoose.model('ArtistModel', artistSchema);

module.exports = {
    webuser
}