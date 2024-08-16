import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../App.css';

interface HeaderProps {
  title: string;
  tabs: string[];
  activeTab: string;
}

function Header({ title, tabs, activeTab }: HeaderProps): React.ReactElement {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = (): void => {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <header>
      <div className="header-left">
        <h1 className="header-title">{title}</h1>
      </div>

      <div className="header-right">
        <nav className={`header-nav ${isMobile && menuOpen ? 'expanded' : ''}`}>
          <ul>
            {tabs.map((tab, index) => (
              <li key={index}>
                <Link to={tab === 'Home' ? '/' : `/${tab.toLowerCase()}`}
                   className={`${activeTab === tab ? 'active-tab' : ''}`}
                >
                  {tab}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className='header-right'>
        {isMobile && (
          <button className='burger-menu' onClick={toggleMenu}>☰</button>
        )}
      </div>
    </header>
  );
}

export default Header;
