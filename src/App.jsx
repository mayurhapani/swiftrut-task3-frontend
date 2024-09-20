import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthProvider";
import axios from "axios";

import Header from "./components/Header";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import Logout from "./components/Logout";
import OtherUserProfile from "./pages/OtherUserProfile";

import { requestPermission } from "./js/firebase.js";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");

    const getToken = async () => {
      const fcmToken = await requestPermission();
      if (fcmToken) {
        console.log("FCM token:", fcmToken);
        try {
          await axios.patch(
            "/api/v1/users/update-fcm-token",
            { fcmToken },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("FCM token updated successfully");
        } catch (error) {
          console.error("Error updating FCM token:", error);
        }
      }
    };

    getToken();
  }, []);

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/addTask" element={<AddTask />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/otherUserProfile/:id" element={<OtherUserProfile />} />
          </Routes>
          <ToastContainer />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
