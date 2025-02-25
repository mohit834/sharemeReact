import React from "react";
import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import logo from "../assets/logo.png";
import { categories } from "../utils/data";
// This is our side bar and the below are styles that are included in classes at bottom via ternary operators
const isNotActiveStyle =
    "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
    "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize";

    // categories to be displayed in the sidebar as navigatable options

// Entering Sidebar
const Sidebar = ({ user, closeToggle }) => {
    // to close
    function handleCloseSidebar() {
        if (closeToggle) closeToggle(false);
    }

    return (
        // main container and scroll bar is hidden
        <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
            {/* navigatable links in the sidebar */}
            <div className="flex flex-col">
                {/* Shareme link that takes us to home */}
                <Link
                    to="/"
                    className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
                    onClick={handleCloseSidebar}
                >
                    <img src={logo} alt="logo" className="w-full" />
                </Link>
                {/*  */}
                <div className="flex flex-col gap-5">
                    {/* navigation link to home page */}
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? isActiveStyle : isNotActiveStyle
                        }
                        onClick={handleCloseSidebar}
                    >
                        {/* Home icon */}
                        <RiHomeFill />
                        Home
                    </NavLink>
                    <h3 className="mt-2 px-5 text-base 2xl:text-xl">
                        Discover categories
                    </h3>
                    {/* multiple categories that have imported from danity are being displayed here using map */}
                    {categories.slice(0, categories.length).map((cat) => (
                        <NavLink
                            to={`/category/${cat.name}`}
                            className={({ isActive }) =>
                                isActive ? isActiveStyle : isNotActiveStyle
                            }
                            onClick={handleCloseSidebar}
                            key={cat.name}
                        >
                            <img className="w-8 h-8 rounded-full shadow-sm" src={cat.image} alt="category" />
                            {cat.name}
                        </NavLink>
                    ))}
                </div>
            </div>
            {/* if the user is loggde in then display his profile icon at the end */}
            {user && (
                // if clicked take to the user profile page
                <Link
                    to={`user-profile/${user?._id}`}
                    className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
                    onClick={handleCloseSidebar}
                >
                    <img
                        src={user.image}
                        className="w-10 h-10 rounded-full"
                        alt="user-profile"
                    />
                    <p>{user.userName}</p>
                </Link>
            )}
        </div>
    );
};

export default Sidebar;
