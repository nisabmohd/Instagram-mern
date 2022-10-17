const { getUser, followHandle, getFollowings, getFollowers } = require('../controllers/user')
const {isAuthenticated}=require('../middlewares/auth')

const router=require('express').Router()

router.route('/:userId').get(getUser)

router.route("/handlefollow/:userId").get(isAuthenticated,followHandle)

router.route("/followings/:userId").get(isAuthenticated,getFollowings)

router.route("/followers/:userId").get(isAuthenticated,getFollowers)

module.exports=router