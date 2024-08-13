const shortid = require("shortid")
const URL = require("../models/url")

async function generateNewUrl(req,res){
 const body = req.body   
const shortID = shortid()
if(!body.url) return res.status(400).json({error: "No Url or it is incorrect"})
await URL.create({
    shortId : shortID,
    urlRedirect : body.url,
    visitHistory : [],
    createdBy : req.user._id

})

res.render("home",{
    id : shortID
})
}


async function getAnalytics(req,res){
const shortId = req.params.shortId
const result = await URL.findOne({shortId})
return res.json({totalClicks: result.visitHistory.length})
}
module.exports = {
    generateNewUrl,
    getAnalytics
}