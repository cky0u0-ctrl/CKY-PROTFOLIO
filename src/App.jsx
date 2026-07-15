import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GNB from './components/GNB';
import CustomCursor from './components/CustomCursor';
import SideNav from './components/SideNav';
import Home from './pages/Home';
import About from './pages/About';
import Resume from './pages/Resume';
import ProjectDetail from './pages/ProjectDetail';
import ContactBoard from './pages/ContactBoard';
import Auth from './pages/Auth';

function App() {
  return (
    <>
      <CustomCursor />
      <GNB />
      <SideNav />
      <Routes>
        <Route path="/"             element={<Home />} />
        <Route path="/about"        element={<About />} />
        <Route path="/resume"       element={<Resume />} />
        <Route path="/projects"     element={<ProjectDetail />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/contact"      element={<ContactBoard />} />
        <Route path="/auth"         element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;
