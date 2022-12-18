const express = require('express')
require('dotenv').config({ path: './config/config.env' })
require('./config/db').connectToDB()
const cors = require('cors')

const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')
const userRoute = require('./routes/user')
const chatRoute = require('./routes/chat')
const storyRoute = require('./routes/story')

const app = express();
app.use(express.json())
app.use(cors())

app.use('/auth', authRoute)
app.use('/post', postRoute)
app.use('/user', userRoute)
app.use('/chat', chatRoute)
app.use('/story', storyRoute)

app.get('/test', (req, res) => {
    res.send("Hello from other side")
})

app.listen(process.env.PORT, () => {
    console.log(`Server running at port : ${process.env.PORT}`);
})