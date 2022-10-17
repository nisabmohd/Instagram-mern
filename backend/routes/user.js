const { getUser, followHandle, getFollowings, getFollowers, notications, hasNotications } = require('../controllers/user')
const {isAuthenticated}=require('../middlewares/auth')

const router=require('express').Router()

router.route('/:userId').get(getUser)

router.route("/get/notifications").get(isAuthenticated,notications)

router.route("/get/has-notifications").get(isAuthenticated,hasNotications)

router.route("/handlefollow/:userId").get(isAuthenticated,followHandle)

router.route("/followings/:userId").get(isAuthenticated,getFollowings)

router.route("/followers/:userId").get(isAuthenticated,getFollowers)



module.exports=router