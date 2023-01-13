import { Navbar } from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { AuthContext } from "./context/Auth";
import { useEffect, useState } from "react";
import { Private } from "./routers/Private";
import Redirect from "./routers/Redirect";
import { Forgot } from "./pages/Forgot";
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";
import toast, { Toaster } from "react-hot-toast";
import { Chat } from "./pages/Chat";
import Story from "./pages/Story";
import { api } from "./Interceptor/apiCall";
import { url } from "./baseUrl";
import io from "socket.io-client";
import { Password } from "./pages/Password";
import AuthRedirect from "./pages/AuthRedirect";

export const socket = io(url);

function App() {
  socket.on("connection", function (data) {
    console.log(data);
  });
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("user")));
  const [active, setActive] = useState("home");
  const [stories, setStories] = useState([]);

  const throwErr = (err) => {
    toast.error(err, {
      style: {
        fontFamily: "Poppins",
        fontSize: "12.5px",
      },
    });
  };
  const throwSuccess = (msg) => {
    toast.success(msg, {
      style: {
        fontFamily: "Poppins",
        fontSize: "12.5px",
      },
    });
  };

  useEffect(() => {
    if (!auth) return;
    api
      .get(`${url}/story/home`)
      .then((res) => {
        setStories(res.data);
      })
      .catch((err) => console.log(err));
  }, [auth]);

  useEffect(() => {
    socket.on("connect");
    if (auth) socket.emit("online", { uid: auth._id });
    return () => {
      socket.off("connect");
    };
  }, [auth]);

  function handleActive(page) {
    setActive(page);
  }

  const findStory = (id) => {
    console.log(id);
    const flatArr = [];
    stories.forEach((item) => {
      flatArr.push(...item);
    });
    const currentIndex = flatArr.findIndex((item) => item.id === id);
    console.log(currentIndex);
    if (currentIndex === -1) {
      return {
        prev: undefined,
        current: undefined,
        next: undefined,
      };
    }
    return {
      prev: currentIndex - 1 >= 0 ? flatArr[currentIndex - 1] : undefined,
      current: flatArr[currentIndex],
      next:
        currentIndex + 1 < flatArr.length
          ? flatArr[currentIndex + 1]
          : undefined,
    };
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, throwErr, throwSuccess, handleActive, findStory }}
    >
      <Toaster />
      {auth && <Navbar active={active} />}
      <div className="width60">
        <Routes>
          <Route
            path="/login"
            element={
              <Redirect>
                <Login />
              </Redirect>
            }
          />
          <Route
            path="/signup"
            element={
              <Redirect>
                <Signup />
              </Redirect>
            }
          />
          <Route path="/forgot" element={<Forgot />} />
          <Route
            path="/explore"
            element={
              <Private>
                <Explore />
              </Private>
            }
          />
          <Route
            path="/:username"
            element={
              <Private>
                <Profile />
              </Private>
            }
          />
          <Route path="/oauth/redirect" element={<AuthRedirect />} />
          <Route
            path="/chats/:id"
            element={
              <Private>
                <Chat />
              </Private>
            }
          />
          <Route
            path="/story/:userId"
            element={
              <Private>
                <Story />
              </Private>
            }
          />
          <Route
            exact
            path="/"
            element={
              <Private>
                <Home stories={stories} />
              </Private>
            }
          />

          <Route
            path="/saved/:username"
            element={
              <Private>
                <Profile post={false} />
              </Private>
            }
          />
          <Route path="/reset/:token" element={<Password />} />
          <Route
            path="/accounts/:params"
            element={
              <Private>
                <Settings />
              </Private>
            }
          />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
