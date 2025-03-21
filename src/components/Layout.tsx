
import React from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="w-full py-4 border-b border-border backdrop-blur-sm bg-background/80 fixed top-0 z-10">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link 
            to="/" 
            className="text-xl font-semibold tracking-tight group transition-all duration-300"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">
              Product
            </span>
            <span>Finder</span>
            <span className="block h-0.5 max-w-0 bg-primary transition-all duration-500 group-hover:max-w-full"></span>
          </Link>
        </div>
      </header>
      <main className="flex-1 w-full pt-20 pb-12">
        <div className="container mx-auto px-4 md:px-6 transition-all duration-300 animate-fade-in">
          {children}
        </div>
      </main>
      <footer className="w-full py-4 border-t border-border backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 md:px-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ProductFinder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
