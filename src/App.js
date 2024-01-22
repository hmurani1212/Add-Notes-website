import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Sign from './Component/Sign';
import Login from './Component/Login';
import Notes from './Component/Notes';
import Navbar from "./Component/Navbar";
import Profile from "./Component/Profile"
import UserProfile from "./Component/UserProfile";
function App() {
  const getAuth = localStorage.getItem("Token")
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Notes />} />
            <Route path="Login" element={<Login />} />
            <Route path="Sign" element={<Sign />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="UserProfile/:id" element={<UserProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>


    </>

  );
}

export default App;
