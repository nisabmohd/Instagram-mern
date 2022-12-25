const { getUser, followHandle, getFollowings, getFollowers, notications, hasNotications, updateUser, search, getUserById, suggestions, changePassword, getAllUsers, resetPassword, checkResetToken, handleNewPassword } = require('../controllers/user')
const { isAuthenticated } = require('../middlewares/auth')

const router = require('express').Router()

router.route('/').put(isAuthenticated, updateUser)

router.route('/allusers').get(isAuthenticated, getAllUsers)

router.route("/suggestions").get(isAuthenticated, suggestions)

router.route("/changepassword").put(isAuthenticated, changePassword)

router.route("/reset").post(resetPassword)

router.route('/newpassword').post(handleNewPassword)

router.route('/:username').get(getUser)

router.route("/checkreset/:token").get(checkResetToken)

router.route('/get/:id').get(getUserById)

router.route("/handlefollow/:userId").get(isAuthenticated, followHandle)

router.route("/followings/:userId").get(isAuthenticated, getFollowings)

router.route("/followers/:userId").get(isAuthenticated, getFollowers)

router.route("/search/:text").get(isAuthenticated, search)

router.route("/view/notifications").get(isAuthenticated, notications)

router.route("/view/has-notifications").get(isAuthenticated, hasNotications)




module.exports = router