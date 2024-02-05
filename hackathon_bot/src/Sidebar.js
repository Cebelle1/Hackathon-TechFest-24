import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { FaCode} from "react-icons/fa";
import { FaLanguage } from "react-icons/fa6";
import { FaLaptopCode } from "react-icons/fa";
import { SiGrammarly } from "react-icons/si";
import { AiFillFileText } from "react-icons/ai";


const Sidebar = ({ isSidebarCollapsed, setIsSidebarCollapsed }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
 
      <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`} style={{ width: isCollapsed ? '60px' : '200px' }}>
      <button className="toggle-button" onClick={handleToggle}>
        {isCollapsed ? <span>&#9776;</span> : <span>&times;</span>}
      </button>
      <style>
        {`
          .sidebar {
            width: 60px;
            background: #fff;
      
            padding: 0.5rem;
            position: fixed;
            top: 0;
            left: 0;
            height: 100%;
            border-right: 3px solid #000;
            transition: all 0.3s ease-in-out;
            transform: translateX(0);
          }

          .sidebar.collapsed {
            transform: translateX(-270%);
          }

          .sidebar h2 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: #446688;
          }

          .sidebar ul {
            list-style: none;
            margin: 0;
            padding: 0;
          }

          .sidebar li {
            margin-bottom: 0.5rem;
            
          }

          .sidebar a {
            color: #333;
            text-decoration: none;
          }

          .sidebar a:hover {
            text-decoration: underline;
          }

          .sidebar.collapsed.toggle-button {
            transform: translateX(0);
            top: 100px;
            right: -10px;

          }

          .sidebar.toggle-button {
            position: relative;
            top: 0;
            right: 0;
            transform: translateX(10);
            background-color: #f4f4f4;
            border: none;
            padding: 1rem 1rem;
            cursor: pointer;
            font-size: 3rem;
            display: flex;
            align-items: top-right;
          }

          .sidebar.toggle-button span {
            font-size: 1.5rem;
            right: 10px;
           
          }

          .navigation-bar {
            position: top;
            margin-top: -50px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0px;
            color: #000;
            font-size: 1.7rem;
            
          }
          
          .navigation-title {
            position: top;
            top: 1px;
            transform: translateX(-50%);
            font-size: 24px;
            font-weight: bold;
            color: #ffs;
            
          }
          
         
          
          .navigation-bar li {
            margin: 15px 1px;
            font-weight: bold;
          }
          
          .navigation-bar a {
            color: #000;
            text-decoration: none;
            font-size: 20px;
            margin: 10px;
          }
          
          .navigation-bar a:hover {
            color: #45a049;
          }
        `}
      </style>
    
          
      {isCollapsed ? null : (
      <nav className="navigation-bar">
        
        <meta name='viewport' content='width=device-width, initial-scale=1'></meta>
      < script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
      <ul>
        <img src="./buzzlogo.png" alt="Logo" class="logo" />
        <li>
          <AiFillFileText />
          <Link to="/summarizer"> Summarizer</Link>
        </li>
        <li>
          <FaLaptopCode />
          <Link to="/codesuggestion"> Code Generator</Link>
        </li>
        <li>
          <SiGrammarly />
          <Link to="/grammarfixer"> Grammar Fixer</Link>
        </li>
        <li>
        <FaLanguage />
          <Link to="/translator"> Text Translator</Link>
        </li>
      </ul>
     
    </nav>
)}
    </div>
   
    
  );
};

export default Sidebar;