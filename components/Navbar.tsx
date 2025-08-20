
import React, { useState } from 'react';
import { AppView } from '../types';
import { SunIcon, MoonIcon } from './icons/ThemeIcons';
import { HamburgerIcon, CloseIcon } from './icons/MenuIcons';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  currentView: AppView;
  setView: (view: AppView) => void;
}

const NavItem: React.FC<{
  viewName: AppView;
  currentView: AppView;
  setView: (view: AppView) => void;
  children: React.ReactNode;
  isMobile?: boolean;
}> = ({ viewName, currentView, setView, children, isMobile }) => {
  const isActive = currentView === viewName;
  const baseClasses = `relative font-rajdhani font-bold transition-colors duration-300`;
  const mobileClasses = isMobile ? `text-3xl py-4 w-full text-center` : 'px-3 py-2 text-lg';
  const stateClasses = `
    text-cyber-text-dark hover:text-cyber-primary
    ${isActive ? 'text-cyber-primary' : ''}
  `;
  
  return (
    <button onClick={() => setView(viewName)} className={`${baseClasses} ${mobileClasses} ${stateClasses}`}>
      {children}
      {isActive && !isMobile && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-0.5 bg-cyber-primary shadow-neon-primary rounded-full"></span>}
    </button>
  );
};

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme, currentView, setView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSetView = (view: AppView) => {
    setView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="w-full max-w-5xl z-20 flex justify-between items-center p-4 bg-cyber-surface/30 backdrop-blur-sm border-b border-cyber-primary/20 rounded-lg">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl md:text-4xl font-orbitron font-bold text-cyber-primary tracking-widest animate-fadeIn">
            TypeX <span className="text-cyber-secondary">2025</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <nav className="flex items-center gap-2">
              <NavItem viewName="levelSelector" currentView={currentView} setView={handleSetView}>Practice</NavItem>
              <NavItem viewName="worldwideStats" currentView={currentView} setView={handleSetView}>Worldwide Stats</NavItem>
              <NavItem viewName="tutorial" currentView={currentView} setView={handleSetView}>Guide</NavItem>
            </nav>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-cyber-primary/20 text-cyber-primary hover:bg-cyber-primary/40 hover:shadow-neon-primary transition-all duration-300"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <button 
            className="p-2 rounded-full md:hidden bg-cyber-primary/20 text-cyber-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <CloseIcon className="w-6 h-6"/> : <HamburgerIcon className="w-6 h-6"/>}
          </button>
        </div>
      </header>
      
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-cyber-bg/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center p-8 animate-fadeIn">
            <div className="absolute top-6 right-6">
                 <button 
                    className="p-2 rounded-full bg-cyber-primary/20 text-cyber-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close mobile menu"
                >
                    <CloseIcon className="w-6 h-6"/>
                </button>
            </div>
          <nav className="flex flex-col items-center gap-6 w-full">
            <NavItem viewName="levelSelector" currentView={currentView} setView={handleSetView} isMobile>Practice</NavItem>
            <NavItem viewName="worldwideStats" currentView={currentView} setView={handleSetView} isMobile>Worldwide Stats</NavItem>
            <NavItem viewName="tutorial" currentView={currentView} setView={handleSetView} isMobile>Guide</NavItem>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
