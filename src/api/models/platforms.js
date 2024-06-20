const mongoose = require('mongoose');

const platformSchema = new mongoose.Schema({
    name:{type:"String", required:true},
    image:{type:"String", required:true},
    gif:{type:"String", required:false},
    movies:[{type: mongoose.Types.ObjectId, ref:"movies", required:false}]
},
{
    timestamps: true,
    collection: 'platforms',
})

const Platform = mongoose.model('platforms', platformSchema, "platforms");
module.exports = Platform;