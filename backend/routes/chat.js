const { getRooms, createRoom } = require('../controllers/chat')
const { isAuthenticated } = require('../middlewares/auth')

const router = require('express').Router()

router.route("/getrooms").get(isAuthenticated, getRooms)
router.route("/createRooms").post(isAuthenticated, createRoom)

module.exports = router