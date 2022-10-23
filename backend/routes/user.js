const { getUser, followHandle, getFollowings, getFollowers, notications, hasNotications, updateUser, search, getUserById } = require('../controllers/user')
const { isAuthenticated } = require('../middlewares/auth')

const router = require('express').Router()

router.route('/').put(isAuthenticated, updateUser)

router.route('/:username').get(getUser)

router.route('/get/:id').get(getUserById)

router.route("/get/notifications").get(isAuthenticated, notications)

router.route("/get/has-notifications").get(isAuthenticated, hasNotications)

router.route("/handlefollow/:userId").get(isAuthenticated, followHandle)

router.route("/followings/:userId").get(isAuthenticated, getFollowings)

router.route("/followers/:userId").get(isAuthenticated, getFollowers)

router.route("/search/:text").get(isAuthenticated, search)



module.exports = router