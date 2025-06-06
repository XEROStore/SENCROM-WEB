import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, Zap, Users, BrainCircuit, Package, Bot, Mail } from 'lucide-react';

const SencromLogoFull = "https://storage.googleapis.com/hostinger-horizons-assets-prod/4ff44e50-168e-43a1-9e05-9ef5897712ea/7cec7ac4a163d4e087e5076cde4eb704.png";

const Header = ({ navLinks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false); 
  }, [location.pathname]);


  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  };

  const menuItemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || isOpen ? 'bg-sencrom-gray-dark/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container-custom flex items-center justify-between h-32 md:h-40">
        <Link to="/" className="flex items-center flex-shrink-0">
          <img src={SencromLogoFull} alt="SENCROM Automatizaciones Logo" className="h-36 md:h-44 mr-auto" />
        </Link>

        <nav className="hidden md:flex items-center justify-center flex-grow">
          <div className="flex items-center rounded-full glassmorphism border border-electric-green/20 shadow-lg shadow-electric-green/30 px-1 lg:px-2">
            {navLinks.map((link, index) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-medium transition-colors hover:text-electric-green flex items-center space-x-2 ${
                    isActive ? 'text-electric-green bg-sencrom-gray-light/30' : 'text-gray-300'
                  } ${index < navLinks.length - 1 ? 'border-r border-electric-green/10 mr-1' : ''}`
                }
              >
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="hidden md:flex items-center flex-shrink-0 ml-auto">
          <Link to="/products">
            <Button variant="outline" className="border-electric-green text-electric-green hover:bg-electric-green hover:text-sencrom-gray-dark transition-all duration-300 ease-in-out transform hover:scale-105">
              Solicita una Demo
            </Button>
          </Link>
        </div>

        <div className="md:hidden">
          <Button onClick={toggleMenu} variant="ghost" size="icon" className="text-gray-300 hover:text-electric-green">
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden absolute top-32 md:top-40 left-0 w-full bg-sencrom-gray-dark/95 backdrop-blur-md shadow-lg pb-4"
          >
            <ul className="flex flex-col items-center space-y-2 px-4">
              {navLinks.map((link) => (
                <motion.li key={link.name} variants={menuItemVariants} className="w-full">
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `block w-full px-4 py-3 text-center rounded-md font-medium transition-colors hover:text-electric-green hover:bg-sencrom-gray-light flex items-center justify-center space-x-2 ${
                        isActive ? 'text-electric-green bg-sencrom-gray-light' : 'text-gray-300'
                      }`
                    }
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </NavLink>
                </motion.li>
              ))}
              <motion.li variants={menuItemVariants} className="w-full pt-2">
                <Link to="/products">
                  <Button variant="outline" className="w-full border-electric-green text-electric-green hover:bg-electric-green hover:text-sencrom-gray-dark">
                    Solicita una Demo
                  </Button>
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
  