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

function App() {
  const [auth, setAuth] = useState();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
    setAuth(user);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {auth && <Navbar />}
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
          <Route
            path="/forgot"
            element={
              <Redirect>
                <Forgot />
              </Redirect>
            }
          />
          <Route
            path="/explore"
            element={
              <Private>
                <Explore />
              </Private>
            }
          />
          <Route
            path="/chats"
            element={
              <Private>
                <></>
              </Private>
            }
          />
          <Route
            exact
            path="/"
            element={
              <Private>
                <Home />
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
          <Route
            path="/saved/:username"
            element={
              <Private>
                <Profile post={false} />
              </Private>
            }
          />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
