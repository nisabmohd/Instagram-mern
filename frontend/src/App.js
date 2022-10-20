import { Navbar } from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { AuthContext } from "./context/Auth";
import { useState } from "react";
import { Private } from "./routers/Private";
import Redirect from "./routers/Redirect";

function App() {
  const [auth, setAuth] = useState(null);
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
            path="/"
            element={
              <Private>
                <Home />
              </Private>
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
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
