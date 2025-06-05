import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Facebook } from 'lucide-react';

const SencromLogoFull = "https://storage.googleapis.com/hostinger-horizons-assets-prod/4ff44e50-168e-43a1-9e05-9ef5897712ea/7cec7ac4a163d4e087e5076cde4eb704.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { icon: <Linkedin size={20} />, href: "#", label: "LinkedIn" },
    { icon: <Twitter size={20} />, href: "#", label: "Twitter" },
    { icon: <Facebook size={20} />, href: "#", label: "Facebook" },
  ];

  return (
    <footer className="bg-sencrom-gray-dark border-t border-sencrom-gray-light/50 section-padding">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <img src={SencromLogoFull} alt="SENCROM Automatizaciones Logo" className="h-24" />
            </Link>
            <p className="text-gray-400 text-sm">
              Potenciando negocios con automatización inteligente y chatbots de vanguardia.
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-200 mb-4">Enlaces Rápidos</p>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-gray-400 hover:text-electric-green text-sm transition-colors">Servicios</Link></li>
              <li><Link to="/case-studies" className="text-gray-400 hover:text-electric-green text-sm transition-colors">Casos de Éxito</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-electric-green text-sm transition-colors">Sobre Nosotros</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-electric-green text-sm transition-colors">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-gray-200 mb-4">Conéctate</p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-electric-green transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Email: <a href="mailto:Admin@sencrom.info" className="hover:text-electric-green">Admin@sencrom.info</a>
            </p>
             <p className="text-gray-400 text-sm mt-2">
              Teléfono: <a href="tel:8294121019" className="hover:text-electric-green">829-412-1019</a>
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-sencrom-gray-light/50 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} SENCROM Automatizaciones. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
  