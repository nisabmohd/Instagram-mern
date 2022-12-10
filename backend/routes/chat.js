const { getRooms, findRoom, createOrGetRoom } = require('../controllers/chat')
const { isAuthenticated } = require('../middlewares/auth')

const router = require('express').Router()

router.route("/getrooms").get(isAuthenticated, getRooms)
router.route("/handshake").post(isAuthenticated, createOrGetRoom)
router.route("/:roomId").get(isAuthenticated, findRoom)

module.exports = router