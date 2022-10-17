const router=require('express').Router()
const {registerUser, tokenManage}=require('../controllers/auth')
const {loginUser}=require("../controllers/auth")

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route('/token').post(tokenManage)


module.exports=router