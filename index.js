const express = require("express");
const app = express();
const path = require("path")
const PORT = 3001
const URL = require("./models/url")
const {connectToMongoDb} = require('./connect')
const cookieParser = require("cookie-parser")
const {restrictToLoggedInUserOnly,checkAuth} = require("./middleware/auth")
// Routes 
const urlRoute = require("./routes/url")
const staticRoute = require("./routes/StaticRouter")
const userRoute = require("./routes/user")


connectToMongoDb("mongodb://localhost:27017/url-shortener")
.then(()=> console.log("DB Connected"))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/url", restrictToLoggedInUserOnly ,urlRoute)
app.use("/user",userRoute)
app.use("/",checkAuth,staticRoute)
app.set("view engine", "ejs")
app.set("views",path.resolve("./views"))
app.get("/test",async (req,res)=>{
    const allUrls = await URL.find({})
    return res.render("home", {
        urls : allUrls,

    })
})
app.get("/:shortId",async (req,res)=>{
const shortId = req.params.shortId;
const entry = await URL.findOneAndUpdate({
shortId
},
{$push: {
    visitHistory : {
        timestamps : Date.now()
    }
}}
)
res.redirect(URL.urlRedirect)

})
app.listen(PORT,()=>{
    console.log('Server up and Running');
})
