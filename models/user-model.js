const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:  {
        type:String,
        validate(value){
            if(!value.includes('harbingergroup.com')){
                throw new Error('Enter valid credentials!'); 
            }
        }
    },
    outlookId:String
});

const User = mongoose.model('user', userSchema);

module.exports = User;