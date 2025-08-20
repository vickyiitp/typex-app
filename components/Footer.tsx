import React from 'react';
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from './icons/SocialIcons';

const Footer: React.FC = () => {
  return (
    <footer className="w-full max-w-5xl text-center py-4 text-cyber-text-dark text-sm z-10">
      <div className="flex justify-center gap-6 mb-4">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="text-cyber-text-dark hover:text-cyber-primary transition-colors duration-300">
          <GithubIcon />
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="text-cyber-text-dark hover:text-cyber-primary transition-colors duration-300">
          <LinkedinIcon />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter Profile" className="text-cyber-text-dark hover:text-cyber-primary transition-colors duration-300">
          <TwitterIcon />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile" className="text-cyber-text-dark hover:text-cyber-primary transition-colors duration-300">
          <InstagramIcon />
        </a>
      </div>
      <p>&copy; {new Date().getFullYear()} TypeX 2025. All Rights Reserved. The Future of Typing is Now.</p>
    </footer>
  );
};

export default Footer;