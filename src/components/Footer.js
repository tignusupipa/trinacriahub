import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-foreground rounded-sm relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-background rounded-sm"></div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-heading text-2xl font-light tracking-wide">
                  TRINACRIA
                </h3>
                <p className="text-xs opacity-80 tracking-widest uppercase">Hub</p>
              </div>
            </div>
            <p className="text-sm opacity-90 leading-relaxed max-w-md">
              Eleganza siciliana nel mondo della moda. Scopri la nostra esclusiva selezione di abbigliamento e scarpe dei migliori brand internazionali.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="w-10 h-10 bg-background bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-background bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-background bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-medium mb-6">Link Rapidi</h4>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                  Home
                </a>
              </li>
              <li>
                <a href="/catalog" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                  Catalogo
                </a>
              </li>
              <li>
                <a href="#scarpe" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                  Scarpe
                </a>
              </li>
              <li>
                <a href="#abbigliamento" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                  Abbigliamento
                </a>
              </li>
              <li>
                <a href="#accessori" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                  Accessori
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-medium mb-6">Contatti</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 opacity-80" />
                <a href="mailto:info@trinacriahub.com" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                  info@trinacriahub.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 opacity-80" />
                <a href="tel:+393331234567" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                  +39 333 123 4567
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 opacity-80" />
                <span className="text-sm opacity-90">
                  Via Roma 123, 90100 Palermo
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background border-opacity-20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm opacity-80">
              © {currentYear} Trinacria Hub. Tutti i diritti riservati.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                Privacy Policy
              </a>
              <a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                Termini di Servizio
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
