import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./components/Login";
import Home from "./container/Home";
import "./App.css";
import { fetchUser } from "./utils/fetchUser";

function App() {

const navigate = useNavigate();

    useEffect(() => {
        const user = fetchUser();

        if(!user) navigate('/login');
    }, [])

    return (
        <GoogleOAuthProvider clientId="763082340189-lmj0sqpus837clm0n3mjinoke7ehgccq.apps.googleusercontent.com">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/*" element={<Home />} />
            </Routes>
        </GoogleOAuthProvider>
    );
}

export default App;
