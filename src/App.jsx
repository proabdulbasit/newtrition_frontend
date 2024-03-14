import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Notfound from "./components/Notfound";
import Tracking from "./components/Tracking";
import Diet from "./components/Diet";

import { UserContext } from "./contexts/UserContext";
import { useState } from "react";
import Private from "./components/Private";

function App() {
  const [loggedUser, setLoggedUser] = useState(
    JSON.parse(localStorage.getItem("newtrition-user"))
  );
  console.log("Initial loggedUser:", loggedUser);

  return (
    <>
      <div>
        <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/tracking"
                element={<Private Component={Tracking} />}
              />
              <Route path="/diet" element={<Private Component={Diet} />} />
              <Route path="*" element={<Notfound />} />
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </div>
    </>
  );
}

export default App;
