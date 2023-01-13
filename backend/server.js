const express = require("express");
require("dotenv").config({ path: "./config/config.env" });
require("./config/db").connectToDB();
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
app.use(express.json());
app.use(cors());
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const USER_SOCKET_MAP = new Map();

const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const userRoute = require("./routes/user");
const chatRoute = require("./routes/chat");
const storyRoute = require("./routes/story");
const User = require("./models/User");

app.use("/auth", authRoute);
app.use("/post", postRoute);
app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use("/story", storyRoute);

app.get("/test", (req, res) => {
  res.send("Hello from other side");
});

io.on("connect", (socket) => {
  console.log("a user connected", socket.id);
  socket.on("online", async ({ uid }) => {
    USER_SOCKET_MAP.set(socket.id, uid);
    await User.updateOne({ _id: uid }, { $set: { online: true } });
  });
  socket.on("typingon", ({ uid, roomId }) => {
    socket.broadcast.emit(`typinglistenon${roomId}`, uid);
  });
  socket.on("typingoff", ({ uid, roomId }) => {
    socket.broadcast.emit(`typinglistenoff${roomId}`, uid);
  });
  socket.on("disconnect", async () => {
    await User.updateOne(
      { _id: USER_SOCKET_MAP.get(socket.id) },
      { $set: { online: false, lastSeen: Date.now() } }
    );
    USER_SOCKET_MAP.delete(socket.id);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server running at port : ${process.env.PORT}`);
});
