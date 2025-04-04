import React from 'react'
import './TopContent.css'
import { FaBars } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { FaBell } from "react-icons/fa";

const TopConten = ({isSidebarOpen,setIsSidebarOpen}) => {
    // const { toggleSidebar } = useContext(SidebarContext);
    return (
      <div className="main-content-top">
          <div className="content-top-left">
            <FaBars className="sidebar-toggler" onClick={() => setIsSidebarOpen(!isSidebarOpen)}/>
              {/* <button type="button" >
                  <img src="" alt="threebars" />
              </button>
              <h3 className="content-top-title">Home</h3> */}
          </div>
          <div className="content-top-btns">
            <FaSearch className="sidebar-toggler"/>
              {/* <button type="button" >
                  <img src="" alt="search" />
              </button> */}
              <FaBell className="sidebar-toggler"/>
              {/* <button >
                  <img src="" alt='bell' />
                  <span className="notification-btn-dot"></span>
              </button> */}
          </div>
      </div>
    )
}

export default TopConten