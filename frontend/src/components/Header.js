import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Search, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="glass-header fixed top-0 w-full z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src="/logo-chiaro.png" 
              alt="Trinacria Hub" 
              className="w-10 h-10 transform transition-transform duration-300 group-hover:scale-110 bg-white rounded-full p-1"
            />
            <div>
              <h1 className="font-heading text-2xl font-light text-foreground tracking-wide">
                TRINACRIA
              </h1>
              <p className="text-xs text-muted-foreground tracking-widest uppercase">Hub</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium tracking-wide transition-colors ${
                isActive('/') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/catalog" 
              className={`text-sm font-medium tracking-wide transition-colors ${
                isActive('/catalog') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
              data-testid="catalog-link"
            >
              Catalogo
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/admin/dashboard" 
                  className="text-sm font-medium tracking-wide text-foreground hover:text-primary transition-colors"
                  data-testid="admin-dashboard-link"
                >
                  Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/admin/login" 
                className="text-sm font-medium tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                data-testid="admin-login-link"
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            data-testid="mobile-menu-button"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  isActive('/') ? 'text-primary' : 'text-foreground hover:text-primary'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/catalog" 
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  isActive('/catalog') ? 'text-primary' : 'text-foreground hover:text-primary'
                }`}
              >
                Catalogo
              </Link>
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/admin/dashboard" 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-sm font-medium tracking-wide text-foreground hover:text-primary"
                  >
                    Admin Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-medium tracking-wide text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  to="/admin/login" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-medium tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                >
                  Admin Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
