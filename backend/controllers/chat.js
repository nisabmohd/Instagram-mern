const Chat = require('../models/Room')
const { v4: id } = require('uuid')
const Room = require('../models/Room')

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
        const have = await Chat.findOne({ people: { $all: [...req.body.people, req.user._id] } })
        if (have) {
            return res.send(have)
        }
        const newChat = new Chat({
            roomId: id(),
            people: [
                req.user._id, ...req.body.people
            ],
        })
        const room = await newChat.save()
        res.send(room)
    } catch (err) {
        console.log(err);
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

exports.leaveChat = async (req, res) => {
    try {
        const roomId = req.body.roomId
        console.log(req.body);
        const room = await Chat.findOne({ roomId })
        if (!room) return res.status(400).send({ success: false, message: "Invalid roomid" })
        if (room.people > 2) {
            const edit = await Chat.updateOne({ roomId }, { $pull: { people: req.user._id } })
            res.send(edit)
        } else {
            const edit = await Chat.deleteOne({ roomId })
            res.send(edit)
        }
    } catch (err) {
        console.log(err);
        res.send({
            success: false,
            message: err.message,
        });
    }
}