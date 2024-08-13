const { getUser } = require("../service/auth");

async function restrictToLoggedInUserOnly(req, res, next) {
    const userUid = req.cookies?.uid;
    console.log("User UID from cookies:", userUid);

    if (!userUid) {
        console.log("No user UID found, redirecting to login.");
        return res.redirect("/login");
    }

    const user = await getUser(userUid);
    console.log("User fetched from getUser function:", user);

    if (!user) {
        console.log("No user found with given UID, redirecting to login.");
        return res.redirect("/login");
    }

    req.user = user;
    next();
}

async function checkAuth(req,res,next){
    const userUid = req.cookies?.uid;
    const user = getUser(userUid);
    req.user = user;
    next()
}
module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth
};
