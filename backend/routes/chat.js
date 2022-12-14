const { getRooms, findRoom, createOrGetRoom, leaveChat } = require('../controllers/chat')
const { isAuthenticated } = require('../middlewares/auth')

const router = require('express').Router()

router.route("/getrooms").get(isAuthenticated, getRooms)
router.route("/handshake").post(isAuthenticated, createOrGetRoom)
router.route('/delete').put(isAuthenticated, leaveChat)
router.route("/:roomId").get(isAuthenticated, findRoom)

module.exports = router