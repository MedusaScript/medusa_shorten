const express = require("express")
const router = express.Router()
const {generateNewUrl,getAnalytics} = require("../controllers/url")
router.post("/",generateNewUrl)
router.get("/analytics/:shortId",getAnalytics)

module.exports = router;