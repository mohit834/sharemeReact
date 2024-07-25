import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar, Feed, CreatePin, PinDetail, Search } from "../components";

const Pins = ({ user }) => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
      // in each pin we have category, pin-detail, create-pin, search in the navbar
        <div className="px-2 md:px-5">
            <div className="bg-gray-50">
              {/* the nav bar is given searchterm as props */}
                <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user} />
                <div className="h-full">
                    <Routes>
                        <Route path="/" element={<Feed />} />
                        <Route
                            path="/category/:categoryId"
                            element={<Feed />}
                        />
                        <Route
                            path="/pin-detail/:pinId"
                            element={<PinDetail user={user} />}
                        />
                        <Route
                            path="/create-pin"
                            element={<CreatePin user={user} />}
                        />
                        <Route
                            path="/search"
                            element={
                                <Search
                                    searchTerm={searchTerm}
                                    setSearchTerm={setSearchTerm}
                                />
                            }
                        />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Pins;
