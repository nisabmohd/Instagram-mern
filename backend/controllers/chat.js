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

exports.createOrGetRoom = async (req, res) => {
    try {
        const have = await Chat.findOne({ people: { $all: [req.body._id, req.user._id] } })
        console.log(have);
        if (have) {
            return res.send(have)
        }
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


exports.findRoom = async (req, res) => {
    try {
        const result = await Chat.findOne({ roomId: req.params.roomId })
        res.send(result)
    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        });
    }
}