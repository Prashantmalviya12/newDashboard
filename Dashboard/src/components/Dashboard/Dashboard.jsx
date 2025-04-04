import React, { useState } from "react";
import "./Dashboard.css";
import Sidebar from "./Sidebar/Sidebar";
import Content from "./content/Content";
import TopConten from "./Topcontent/TopConten";
import { Route, Routes } from "react-router-dom";
import Profile from "./Profile/Profile";

const Dashboard = () => {
  const [isSidebarOpen,setIsSidebarOpen] = useState(false)

  return (
    <>
      <div className="dashboard">
        <Sidebar isSidebarOpen={isSidebarOpen}/>
        <div className="maincontent">
          <TopConten isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
          <Routes>
            <Route path="" element={<Content />} /> {/* Default Home */}
            <Route path="profile" element={<Profile />} /> {/* Profile Page */}
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
