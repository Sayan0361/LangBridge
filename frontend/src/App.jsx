import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import CallPage from "./pages/CallPage.jsx";
// import { useEffect } from "react";
import { Toaster,toast} from "react-hot-toast";
// import { useState} from "react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios"
// import { axiosInstance } from "./lib/axios";
import { Navigate } from "react-router";
import PageLoader from "./components/PageLoader.jsx";
// import { getAuthUser } from "./lib/api.js";
import useAuthUser from "./hooks/useAuthUser.js";
import Layout from "./components/Layout.jsx";
import { useState } from "react";
import { useThemeStore } from "./store/useThemeStore.js";
import FriendsPage from "./pages/FriendsPage.jsx";
import MessagesPage from "./pages/MessagesPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";


export default function App() {
  // Simple fetch func
  //  const [data,setData] = useState([]);
  // const [isLoading,setIsLoading] = useState(false);
  // const [error,setError] = useState(null);

  // useEffect(()=>{

  //   const getData = async () =>{
  //     setIsLoading(true);
  //     try{
  //       const data = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  //       const json = await data.json();
  //       setData(data);
  //     }catch(error){
  //       setError(error)
  //     }
  //     finally{
  //       setIsLoading(false);
  //     }
  //   };

  //   getData();
  // },[]);

  // console.log(data);
  
  const { isLoading, authUser } = useAuthUser();
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;
  const {theme} = useThemeStore();

  if(isLoading) return <PageLoader/>

  return (
    <div className="h-screen" data-theme={theme}>
      {/* <button onClick={()=>setTheme("night")}> Update theme </button> */}
      {/*  Sample Toast usage */}
      {/* <button onClick={() => toast.success("Toast created successfully")}>Create a toast</button> */}
      <Routes>
        <Route path="/" 
        element={ isAuthenticated && isOnboarded ?
                    ( <Layout showSidebar={true}>
                        <HomePage/>
                      </Layout>
                    ) // if user is Authenticated and onboarded, then he can visit the homepage
                    : // else if user is not authenticated, then navigate him to login page 
                      // elsewhere navigate the authenticated user but not onboarded user to the onboarding page
                      (<Navigate to={!isAuthenticated ? "/login" : "/onboarded"}/>)
                } />
        <Route path="/friends" 
        element={ isAuthenticated && isOnboarded ?
                    ( <Layout showSidebar={true}>
                        <FriendsPage/>
                      </Layout>
                    ) // if user is Authenticated and onboarded, then he can visit the homepage
                    : // else if user is not authenticated, then navigate him to login page 
                      // elsewhere navigate the authenticated user but not onboarded user to the onboarding page
                      (<Navigate to={!isAuthenticated ? "/login" : "/onboarded"}/>)
                } />
        <Route path="/login" element={!isAuthenticated? <LoginPage />: <Navigate to={isOnboarded?"/":"/onboarding"}/>} />
        <Route path="/signup" element={!isAuthenticated? <SignUpPage />:<Navigate to={isOnboarded?"/":"/onboarding"}/>} />
        <Route path="/onboarding" element={isAuthenticated?(
          // user is authenticated but not onboarded then navigate him to Onboarding page
          !isOnboarded ? (
            <Onboarding />
          ) : (
            // user is both onboarded and authenticated, navigate to home page
            <Navigate to="/" />
          )
        ):(
          // else he is neither authenticated nor onboarded
        <Navigate to="/login"/>
        )} />
        <Route path="/notifications" element={isAuthenticated && isOnboarded?(
          <Layout showSidebar>
            <NotificationsPage />
          </Layout>):
          <Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>
        } />
        <Route path="/chat/:id" element={isAuthenticated && isOnboarded?
          (<Layout>
            <ChatPage />
          </Layout>
          ):(<Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>)} 
        />
        <Route path="/chat" element={isAuthenticated && isOnboarded?
          (<Layout>
            <MessagesPage />
          </Layout>
          ):(<Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>)} 
        />
        <Route path="/profile" element={isAuthenticated && isOnboarded?
          (<Layout>
            <ProfilePage />
          </Layout>
          ):(<Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>)} 
        />
        <Route path="/call/:id" element={isAuthenticated && isOnboarded?    
          (<CallPage/>):
          (<Navigate to={!isAuthenticated?"/login":"/onboarding"}/>
        )} />
      </Routes>
      <Toaster/>
    </div>
  )
}