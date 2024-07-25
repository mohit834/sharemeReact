// Essential imports
import React, { useEffect, useRef, useState } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";
import { Sidebar, UserProfile } from "../components";
import { client } from "../client";
import logo from "../assets/logo.png";
import Pins from "./Pins";
import { userQuery } from "../utils/data";
import { fetchUser } from "../utils/fetchUser";

// THis is Home component the home page and ill try to exaplain every code snippet
const Home = () => {
    // TO navigate to different pages
    // To toggle the sidebar
    const [toggleSidebar, setToggleSidebar] = useState(false);
    // to set a user
    const [user, setUser] = useState(null);
    // React hook used to create a reference for a component or element in dom to engage with it
    const scrollRef = useRef(null);

    // getting the userinfo from local storage but first the useEffect hooks will run
    // so lets take a look at
    const userInfo = fetchUser();

    // this is querying the sanity site for the userdata that has been stored in database
    useEffect(() => {
        // we have created a userQuery in util folder and it has been said that all kinds of queries are better of in util if they are going to be used by multiple components or multiple times.
        // it will first see if there is a asaved user in local storage from above code and then gets the data about him from sanity
        const query = userQuery(userInfo?.sub);
        // the returned data is then stored into user
        client.fetch(query).then((data) => {
            setUser(data[0]);
        });
    }, []);

    // scroll to top
    useEffect(() => {
        scrollRef.current.scrollTo(0, 0);
    }, []);

    return (
        // Main container that holds entire home component
        <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
            {/* sidebar for larger screens hidden md:flex means hiddens on small and display:flex for medium and large */}
            <div className="hidden md:flex h-screen flex-initial">
                {/* Sidebar component visible on medium and larger screens */}
                <Sidebar user={user && user} />
            </div>

            {/* top bar for smaller screens */}
            <div className="flex md:hidden flex-row">
                {/* flex row and the top bar consits of these himenu-3lines logo and the google user pri=ofile logo */}
                <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
                    {/* clicking on this sets togglebar to true and we can see the toggle bar */}
                    <HiMenu
                        fontSize={40}
                        className="cursor-pointer"
                        onClick={() => setToggleSidebar(true)}
                    />
                    {/* link on logo to home */}
                    <Link to="/">
                        <img src={logo} alt="logo" className="w-28" />
                    </Link>
                    {/* link on the profile image to user profile */}
                    <Link to={`user-profile/${user?._id}`} className="w-28">
                        <img src={user?.image} alt="logo" className="w-28" />
                    </Link>
                </div>
                {/* this ends the top bar for smaller screens */}
                {/* This is the side bar for smaller screens and when you click on the himenu this opens */}
                {/* 4/5 width, overflow-y-auto, animation of sliding in full-svreen height fixed position */}
                {toggleSidebar && (
                    <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
                        {/* this is the react icon close button to close the sidebar */}
                        <div className="absolute w-full flex justify-end items-center p-2">
                            <AiFillCloseCircle
                                fontSize={30}
                                className="cursor-pointer"
                                onClick={() => setToggleSidebar(false)}
                            />
                        </div>
                        {/* we are loaing the sidebar component for the smaller screens */}
                        <Sidebar
                            user={user && user}
                            closeToggle={setToggleSidebar}
                        />
                    </div>
                )}
            </div>
            {/* Here ends the top and side bar for smaller screens */}
            {/* Main area and contains different routes */}
            {/* scrollref has been set for this element */}
            {/* flex-1 helps to fill the remaining space of the parent element */}
            <div
                className="pb-2 flex-1 h-screen overflow-y-scroll"
                ref={scrollRef}
            >
                {/* we have two routes here */}
                <Routes>
                    <Route
                        path="user-profile/:userId"
                        element={<UserProfile />}
                    />
                    {/* if the path is nothing we will render Pins component */}
                    <Route path="/*" element={<Pins user={user && user} />} />
                </Routes>
            </div>
        </div>
    );
};

export default Home;
