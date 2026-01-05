import { Routes, Route, Navigate } from "react-router";

import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import OnBoardingPage from "./pages/OnBoardingPage.jsx";

import { Toaster } from "react-hot-toast";
import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";
import Layout from "./components/Layout.jsx";


const App = () => {
  
  // we use useQuery when we want to perform "get" request or simply when we want to fetch some data
  // and mutation is used when we want perform "post, put, delete" request, basically when we want to perform any change.

  const {isLoading, authUser, error} = useAuthUser();
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;


  if(isLoading) return <PageLoader/>;


  return (
    <div>
      <Routes>
        
        <Route path="/" element={isAuthenticated && isOnboarded ? ( <Layout showSidebar={true}> <HomePage/> </Layout> ) : (
          <Navigate to={!isAuthenticated ? "/login" : "/onboard"} />
        )} />

        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboard" }/> } />

        <Route path="/signup" element={!isAuthenticated ? <SignUpPage /> : <Navigate to={isOnboarded ? "/" : "/onboard" }/> } />

        <Route path="/call/:id" element={isAuthenticated && isOnboarded ? (<CallPage />) : (
          <Navigate to={!isAuthenticated ? "/login" : "/onboard"} />
        )} />

        <Route path="/chat/:id" element={isAuthenticated && isOnboarded ?( <Layout> <ChatPage />  </Layout> ) : (
          <Navigate to={!isAuthenticated ? "/login" : "/onboard"} />
        )}  />

        <Route path="/notifications" element={isAuthenticated && isOnboarded ?(  <Layout showSidebar={true}> <NotificationsPage />  </Layout> ) : (
          <Navigate to={!isAuthenticated ? "/login" : "/onboard"} />
        )} />

        <Route path="/onboard" element={isAuthenticated ? (
          !isOnboarded ? ( <OnBoardingPage /> ) : ( <Navigate to={"/"}/> )
        ) : ( <Navigate to={"/login"}/> )} />

      </Routes>

      <Toaster />
    </div>
  )
}

export default App