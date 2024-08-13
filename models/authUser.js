const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")

const authUserSchema = new mongoose.Schema(
    {
      name : {
        type : String,
        required : true
      },
email :{
    type : String,
    required : true,
    unique : true
},

password: {
    type : String,
    required : true,
}
    },
    {
        timestamps : true
    }
)
// Secure Password 
authUserSchema.pre('save',async function(next){
const user = this;
 if(!user.isModified("password")){
    next()
 }
 try {
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(user.password,saltRound)
    user.password = hashedPassword
 } catch (error) {
    
 }
})
const authUser = mongoose.model("authUser",authUserSchema)

module.exports = authUser