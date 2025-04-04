import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import Dashboard from '../Dashboard';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = ({isSidebarOpen}) => {
  const [activeLinkIdx, setActiveLinkIdx] = useState(1);
  const [sidebarClass, setSidebarClass] = useState(''); 
  const navigate = useNavigate()


  const navigationLinks = [
    { id: 1, title: 'Home', path:"/dashboard" },
    { id: 2, title: 'Profile', path:"/dashboard/profile" },
  ];

  useEffect(() => {
    if(isSidebarOpen){
      setSidebarClass('sidebar-change');
    } else {
      setSidebarClass('');
    }
  }, [isSidebarOpen]);

  const handleToLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem("userId")
    navigate('/')
  }

  return (
    <div className={`sidebar ${sidebarClass}`}>
      <h4 className='info-name'>Dashboard</h4>

      <nav className="navigation">
        <ul className="nav-list">
          {navigationLinks.map((navigationLink) => (
            <li className="nav-item" key={navigationLink.id}>
              <NavLink
                to={navigationLink.path}
                className={`nav-link ${navigationLink.id === activeLinkIdx ? 'active' : ''}`}
                onClick={() => setActiveLinkIdx(navigationLink.id)}
              >
                <span className="nav-link-text">{navigationLink.title}</span>
              </NavLink>
            </li>
            
          ))}
           <button className='logout-btn' onClick={handleToLogout}>Log Out</button>
        </ul>
        
      </nav>
    </div>
  );
};

export default Sidebar;
