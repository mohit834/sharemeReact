import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { client } from "../client";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";

const Login = () => {
    const navigate = useNavigate();

    const responseGoogle = (credentialResponse) => {
        const decode = jwtDecode(credentialResponse.credential);
        localStorage.setItem("user", JSON.stringify(decode));
        const { name, picture, sub } = decode;
        const doc = {
            _id: sub,
            _type: "user",
            userName: name,
            image: picture,
        };
        client
            .createIfNotExists(doc)
            .then(() => {
                navigate("/", { replace: true });
            })
            .catch((error) => {
                console.error("Sanity client error:", error);
            });
    };

    const handleError = () => {
        console.log("Login Failed");
    };

    return (
        <div className="flex justify-center items-center flex-col h-screen">
            <div className="relative w-full h-full">
                <video
                    src={shareVideo}
                    type="video/mp4"
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className="w-full h-full object-cover"
                />
                <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
                    <div className="p-5">
                        <img src={logo} alt="logo0" width="130px" />
                    </div>
                    <div className="shadow-2x1">
                        <GoogleLogin
                            onSuccess={responseGoogle}
                            onError={responseGoogle}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
