const jwt = require("jsonwebtoken");
const secret = "hamiz$@";

// Function to sign a user object and create a JWT
function setUser(user) {
    try {
        return jwt.sign({
            _id : user._id,
            email:user.email
        }, secret); // Token expires in 1 hour
    } catch (error) {
        console.error("Error signing token:", error);
        return null;
    }
}

// Function to verify a JWT and decode the user object
function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.error("Error verifying token:", error);
        return null;
    }
}

module.exports = {
    setUser,
    getUser
};







// const sessionIdToUserMap = new Map();

// function setUser(id,user){
//     sessionIdToUserMap.set(id,user)
// }

// function getUser(id,user){
//     return sessionIdToUserMap.get(id,user);
// }
