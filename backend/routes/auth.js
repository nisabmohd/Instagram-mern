const router=require('express').Router()
const {registerUser, tokenManage, logout}=require('../controllers/auth')
const {loginUser}=require("../controllers/auth")
const {isAuthenticated}=require('../middlewares/auth')

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route('/token').post(tokenManage)

router.route('/logout').post(isAuthenticated,logout)


module.exports=router