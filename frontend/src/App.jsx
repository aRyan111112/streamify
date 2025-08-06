import { Routes, Route, Navigate } from "react-router";

import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import OnBoardingPage from "./pages/OnBoardingPage.jsx";

import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios.js";

const App = () => {
  
  // we use useQuery when we want to perform "get" request or simply when we want to fetch some data
  // and mutation is used when we want perform "post, put, delete" request, basically when we want to perform any change

  const { data: authData, isLoading, error} = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    },
    retry: false // axios sends request three more times in case of failure, to avoid that because if user is unauthorized it will make no sense in this case,
  });

  const authUser = authData?.user;

  return (
    <div>
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to={"/login"}/> } />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"}/> } />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"}/>} />
        <Route path="/call" element={authUser ? <CallPage /> : <Navigate to={"/login"}/>} />
        <Route path="/chat" element={authUser ? <ChatPage /> : <Navigate to={"/login"}/>} />
        <Route path="/notifications" element={authUser ? <NotificationsPage /> : <Navigate to={"/login"}/>} />
        <Route path="/onboard" element={authUser ? <OnBoardingPage /> : <Navigate to={"/login"}/>} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App