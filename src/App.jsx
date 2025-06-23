import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ServicesPage from '@/pages/ServicesPage';
import CaseStudiesPage from '@/pages/CaseStudiesPage';
import ContactPage from '@/pages/ContactPage';
import { Toaster } from '@/components/ui/toaster';
import { Bot, Zap, Users, BrainCircuit, Mail, Package } from 'lucide-react';
import ChatbaseWidget from './components/chat/ChatbaseWidget';
import WebBotChat from './components/chat/WebBotChat';

const ProductsPage = lazy(() => import('@/pages/ProductsPage.jsx'));

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const navLinks = [
    { name: 'Inicio', path: '/', icon: <Zap size={18} /> },
    { name: 'Servicios', path: '/services', icon: <BrainCircuit size={18} /> },
    { name: 'Productos', path: '/products', icon: <Package size={18} /> },
    { name: 'Casos de Éxito', path: '/case-studies', icon: <Bot size={18} /> },
    { name: 'Sobre Nosotros', path: '/about', icon: <Users size={18} /> },
    { name: 'Contacto', path: '/contact', icon: <Mail size={18} /> },
  ];

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-sencrom-gray-dark text-foreground">
        <Header navLinks={navLinks} />
        <main className="flex-grow"> {/* Removed padding top to allow fixed header overlap */}
          <Suspense fallback={<PageLoader />}>
            <AnimatedRoutes />
          </Suspense>
        </main>
        <Footer />
        <Toaster />
        <ChatbaseWidget />
        <WebBotChat />
      </div>
    </Router>
  );
}

const PageLoader = () => (
  <div className="flex items-center justify-center h-screen bg-sencrom-gray-dark">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-16 h-16 border-4 border-t-electric-green border-r-electric-green border-b-transparent border-l-transparent rounded-full"
    />
  </div>
);

export default App;