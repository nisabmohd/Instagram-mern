const Chat = require('../models/Room')
const { v4: id } = require('uuid')

exports.getRooms = async (req, res) => {
    try {
        const rooms = await Chat.find({ people: req.user._id })
        res.send(rooms)
    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        });
    }
}

exports.createRoom = async (req, res) => {
    try {
        const newChat = new Chat({
            roomId: id(),
            people: [
                req.user._id, req.body._id
            ],
        })
        const room = await newChat.save()
        res.send(room)
    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        });
    }
}