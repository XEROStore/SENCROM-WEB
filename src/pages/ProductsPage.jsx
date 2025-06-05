import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import { 
  CalendarDays, Mail, Settings2, MessageCircle, Mic, LifeBuoy, 
  ArrowRight, X, ShoppingBag, Cpu, Loader2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../components/ui/dialog";
import { getImageUrl } from '../lib/imageService';
import { useSearchParams } from 'react-router-dom';

const productsData = [
  {
    id: 'asistente-virtual',
    name: 'Asistente Virtual Inteligente',
    shortDescription: 'Tu asistente personal que automatiza tareas y mejora la interacción con tus clientes.',
    imageUrl: "https://zvkpayuqrgunnoqavjqo.supabase.co/storage/v1/object/public/images/ASISTENTE%20VIRTUAL.jpg",
    icon: <Cpu className="h-8 w-8 text-electric-green" />,
    longDescription: 'Nuestro Asistente Virtual es una solución integral que revoluciona la forma en que interactúas con tus clientes y gestionas tu negocio. Con capacidades avanzadas de IA, procesamiento de lenguaje natural y automatización inteligente, optimiza cada aspecto de tu operación diaria.',
    features: [
      {
        icon: <MessageCircle className="h-8 w-8 text-electric-green mb-2" />,
        title: "Interacción Natural",
        description: "Mantiene conversaciones fluidas con tus clientes, entendiendo el contexto y respondiendo de forma natural y personalizada en múltiples idiomas."
      },
      {
        icon: <Mic className="h-8 w-8 text-electric-green mb-2" />,
        title: "Procesamiento de Audio",
        description: "Recibe y procesa mensajes de voz, transcribe conversaciones en tiempo real y genera respuestas en formato de audio para una comunicación más natural."
      },
      {
        icon: <CalendarDays className="h-8 w-8 text-electric-green mb-2" />,
        title: "Gestión de Citas",
        description: "Agenda y organiza citas automáticamente, gestiona turnos, envía recordatorios y reasigna horarios según disponibilidad y prioridades."
      },
      {
        icon: <Mail className="h-8 w-8 text-electric-green mb-2" />,
        title: "Gestión de Comunicaciones",
        description: "Centraliza y responde correos electrónicos, mensajes y notificaciones, priorizando y categorizando la información según su importancia."
      },
      {
        icon: <Settings2 className="h-8 w-8 text-electric-green mb-2" />,
        title: "Automatización Inteligente",
        description: "Automatiza tareas repetitivas, genera reportes, actualiza bases de datos y sincroniza información entre diferentes plataformas."
      },
      {
        icon: <LifeBuoy className="h-8 w-8 text-electric-green mb-2" />,
        title: "Soporte 24/7",
        description: "Proporciona asistencia inmediata a clientes, resuelve consultas frecuentes y escala casos complejos al equipo humano cuando sea necesario."
      }
    ],
    cta: {
      text: "Solicitar una Demostración",
      link: "#contact-demo" 
    }
  }
];

const ProductCard = ({ product, onOpenModal }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3 }}
    className="glassmorphism rounded-xl p-6 flex flex-col justify-between h-full shadow-lg hover:shadow-electric-green/30 transition-shadow duration-300"
  >
    <div>
      <div className="flex items-center mb-4">
        <div className="p-2 bg-electric-green/10 rounded-full mr-4 animate-subtle-glow">
          {product.icon}
        </div>
        <h3 className="text-xl font-bold text-white">{product.name}</h3>
      </div>
      <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-contain bg-sencrom-gray/30" 
        />
      </div>
      <p className="text-gray-400 text-sm mb-6 flex-grow">{product.shortDescription}</p>
    </div>
    <Button onClick={() => onOpenModal(product)} className="w-full btn-secondary-animated group">
      Ver Detalles
      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
    </Button>
  </motion.div>
);

const ProductsPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [productsData, setProductsData] = useState([
    {
      id: 'asistente-virtual',
      name: 'Asistente Virtual Inteligente',
      shortDescription: 'Tu asistente personal que automatiza tareas y mejora la interacción con tus clientes.',
      imageUrl: "https://zvkpayuqrgunnoqavjqo.supabase.co/storage/v1/object/public/images/ASISTENTE%20VIRTUAL.jpg",
      icon: <Cpu className="h-8 w-8 text-electric-green" />,
      longDescription: 'Nuestro Asistente Virtual es una solución integral que revoluciona la forma en que interactúas con tus clientes y gestionas tu negocio. Con capacidades avanzadas de IA, procesamiento de lenguaje natural y automatización inteligente, optimiza cada aspecto de tu operación diaria.',
      features: [
        {
          icon: <MessageCircle className="h-8 w-8 text-electric-green mb-2" />,
          title: "Interacción Natural",
          description: "Mantiene conversaciones fluidas con tus clientes, entendiendo el contexto y respondiendo de forma natural y personalizada en múltiples idiomas."
        },
        {
          icon: <Mic className="h-8 w-8 text-electric-green mb-2" />,
          title: "Procesamiento de Audio",
          description: "Recibe y procesa mensajes de voz, transcribe conversaciones en tiempo real y genera respuestas en formato de audio para una comunicación más natural."
        },
        {
          icon: <CalendarDays className="h-8 w-8 text-electric-green mb-2" />,
          title: "Gestión de Citas",
          description: "Agenda y organiza citas automáticamente, gestiona turnos, envía recordatorios y reasigna horarios según disponibilidad y prioridades."
        },
        {
          icon: <Mail className="h-8 w-8 text-electric-green mb-2" />,
          title: "Gestión de Comunicaciones",
          description: "Centraliza y responde correos electrónicos, mensajes y notificaciones, priorizando y categorizando la información según su importancia."
        },
        {
          icon: <Settings2 className="h-8 w-8 text-electric-green mb-2" />,
          title: "Automatización Inteligente",
          description: "Automatiza tareas repetitivas, genera reportes, actualiza bases de datos y sincroniza información entre diferentes plataformas."
        },
        {
          icon: <LifeBuoy className="h-8 w-8 text-electric-green mb-2" />,
          title: "Soporte 24/7",
          description: "Proporciona asistencia inmediata a clientes, resuelve consultas frecuentes y escala casos complejos al equipo humano cuando sea necesario."
        }
      ],
      cta: {
        text: "Solicitar una Demostración",
        link: "#contact-demo" 
      }
    }
  ]);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    async function loadProductImage() {
      try {
        // Usar la URL directa de la imagen
        const imageUrl = 'https://zvkpayuqrgunnoqavjqo.supabase.co/storage/v1/object/public/images/ASISTENTE%20VIRTUAL.jpg';
        
        // Actualizar la URL de la imagen en el producto
        setProductsData(prevProducts => 
          prevProducts.map(product => 
            product.id === 'asistente-virtual'
              ? { ...product, imageUrl }
              : product
          )
        );
      } catch (error) {
        console.error('Error al cargar la imagen:', error);
      }
    }

    loadProductImage();
  }, []);

  useEffect(() => {
    const openProduct = searchParams.get('open');
    if (openProduct === 'asistente-virtual') {
      const asistenteProduct = productsData.find(p => p.id === 'asistente-virtual');
      if (asistenteProduct) {
        setSelectedProduct(asistenteProduct);
        setIsOpen(true);
      }
    }
  }, [searchParams]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setSelectedProduct(null);
    }, 200);
  };

  return (
    <div className="bg-sencrom-gray-dark text-white min-h-screen">
      <AnimatedSection className="pt-16 pb-8 md:pt-24 md:pb-12 bg-gradient-to-b from-sencrom-gray via-sencrom-gray-dark to-sencrom-gray-dark">
        <div className="container-custom text-center">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ShoppingBag className="w-10 h-10 md:w-12 md:h-12 mr-4 text-electric-green" />
            Nuestros <span className="gradient-text ml-3">Productos</span>
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Soluciones innovadoras diseñadas para potenciar tu eficiencia y transformar tu negocio.
          </motion.p>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding">
        <div className="container-custom">
          <AnimatePresence>
            <motion.div 
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {productsData.map((product) => (
                <ProductCard key={product.id} product={product} onOpenModal={openModal} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </AnimatedSection>

      <AnimatePresence>
        <Dialog open={isOpen} onOpenChange={closeModal}>
          {selectedProduct && (
            <DialogContent className="bg-sencrom-gray-light text-white p-0 max-w-3xl w-[90vw] md:w-full rounded-xl shadow-2xl shadow-electric-green/30 border-electric-green/20 max-h-[90vh] flex flex-col">
              <DialogHeader className="p-6 pb-4 border-b border-sencrom-gray/50">
                <div className="flex items-center mb-2">
                  <div className="p-2 bg-electric-green/10 rounded-full mr-3">
                    {selectedProduct.icon}
                  </div>
                  <DialogTitle className="text-2xl font-bold text-electric-green">{selectedProduct.name}</DialogTitle>
                </div>
                <DialogDescription className="text-gray-400 text-sm">{selectedProduct.shortDescription}</DialogDescription>
              </DialogHeader>
              
              <div className="p-6 overflow-y-auto flex-grow">
                <div className="w-full h-[500px] mb-6 rounded-lg overflow-hidden bg-sencrom-gray/30">
                  <img 
                    src={selectedProduct.imageUrl} 
                    alt={selectedProduct.name} 
                    className="w-full h-full object-contain p-4" 
                  />
                </div>
                
                <h4 className="text-xl font-semibold mb-4 text-white">Características Principales:</h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {selectedProduct.features?.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="bg-sencrom-gray/30 p-4 rounded-lg flex flex-col items-center text-center h-full"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <div className="mb-2">
                        {feature.icon}
                      </div>
                      <h5 className="text-md font-semibold mb-1 text-electric-green">{feature.title}</h5>
                      <p className="text-xs text-gray-400 flex-grow">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <DialogFooter className="p-6 pt-4 border-t border-sencrom-gray/50">
                <Button className="btn-primary-animated group">
                  {selectedProduct.cta.text}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </AnimatePresence>

      <AnimatedSection className="section-padding text-center bg-gradient-to-r from-dark-green via-sencrom-gray-dark to-dark-green">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            ¿Interesado en <span className="neon-text">optimizar</span> tus procesos?
          </h2>
          <p className="text-lg text-gray-300 max-w-xl mx-auto mb-10">
            Descubre cómo nuestras soluciones pueden ayudarte a alcanzar nuevos niveles de eficiencia.
          </p>
          <Button size="lg" className="btn-primary-animated text-lg px-8 py-6 group">
            Contacta con un Experto
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default ProductsPage;