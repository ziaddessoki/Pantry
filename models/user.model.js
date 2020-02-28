const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username :{type:String, required: true},
    email: {type:String, required:true},
    fBaseId: {type:String, required:true},
    pantry: Array,
    favRecipes: Array,
},{
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;