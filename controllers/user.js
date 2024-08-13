const User = require("../models/authUser")
const { v4: uuidv4 } = require("uuid")
const { setUser } = require("../service/auth")
const bcrypt = require("bcryptjs")
const { compareHash } = require("../utils/hashing/hash")



async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body;
    await User.create({
        name, email,
        password
    });
    return res.redirect('/')

}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
        email
    });

    if (!user) {
        return res.render("login", {
            error: 'Invalid Username or Password'
        })
    }

    const passwordMatch = await compareHash(password, user.password)
    if (!passwordMatch) return res.status(500).json({ success: false, message: 'invalid creds', data: null })

    // const sessionId = uuidv4();
    // setUser(sessionId,user);
    const token = setUser(user);
    res.cookie("uid", token)
    return res.redirect('/')

}


module.exports = {
    handleUserSignUp,
    handleUserLogin
}