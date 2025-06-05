import React, { useState } from 'react';
import AnimatedSection from '@/components/AnimatedSection';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Zap, MessageSquare, Settings, LifeBuoy, BrainCircuit, ArrowRight, Code, CheckCircle, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

const ServiceCard = ({ icon, title, description, features, delay, onOpenModal, detailedInfo }) => (
  <motion.div
    className="glassmorphism p-8 rounded-lg flex flex-col h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-electric-green/20"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="flex items-center mb-4">
      <div className="p-3 bg-electric-green/20 rounded-full mr-4 animate-subtle-glow">
        {React.cloneElement(icon, { className: "h-8 w-8 text-electric-green" })}
      </div>
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
    </div>
    <p className="text-gray-300 mb-6 flex-grow">{description}</p>
    {features && (
      <ul className="space-y-2 mb-6 text-sm text-gray-400">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start">
            <CheckCircle className="h-4 w-4 text-lime-green mr-2 mt-0.5 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    )}
    <Button 
      variant="outline" 
      className="mt-auto border-electric-green text-electric-green hover:bg-electric-green hover:text-sencrom-gray-dark group self-start"
      onClick={() => onOpenModal({ icon, title, description, features, detailedInfo })}
    >
      Más Información <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
    </Button>
  </motion.div>
);

const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const services = [
    {
      icon: <Zap />,
      title: "Automatización de Procesos (RPA)",
      description: "Optimizamos tus flujos de trabajo mediante la automatización robótica de procesos, reduciendo errores manuales y liberando a tu equipo para tareas estratégicas.",
      features: [
        "Análisis y rediseño de procesos.",
        "Desarrollo de robots de software (bots).",
        "Integración con sistemas existentes.",
        "Monitoreo y optimización continua.",
      ],
      detailedInfo: {
        examples: [
          {
            title: "Automatización de Facturación",
            description: "Implementamos un bot que procesa automáticamente facturas entrantes, extrae datos relevantes y los ingresa en el sistema contable, reduciendo el tiempo de procesamiento en un 85%."
          },
          {
            title: "Gestión de Inventario",
            description: "Desarrollamos un sistema RPA que monitorea niveles de inventario, genera órdenes de compra automáticamente y actualiza registros en tiempo real."
          }
        ],
        benefits: [
          "Reducción de errores humanos en un 99%",
          "Ahorro de tiempo en procesos repetitivos",
          "Mayor precisión en el procesamiento de datos",
          "Escalabilidad de operaciones"
        ]
      }
    },
    {
      icon: <MessageSquare />,
      title: "Implementación de Chatbots",
      description: "Creamos chatbots inteligentes y personalizados para mejorar la atención al cliente, generar leads y automatizar la comunicación en múltiples canales.",
      features: [
        "Chatbots para atención al cliente 24/7.",
        "Bots de ventas y captación de leads.",
        "Integración con WhatsApp, Messenger, Web.",
        "Análisis de conversaciones y mejora continua.",
      ],
      detailedInfo: {
        examples: [
          {
            title: "Asistente Virtual de Ventas",
            description: "Chatbot que guía a los clientes en el proceso de compra, responde preguntas sobre productos y agenda citas con el equipo de ventas."
          },
          {
            title: "Soporte Técnico Automatizado",
            description: "Bot que resuelve consultas técnicas comunes, proporciona guías paso a paso y escala casos complejos al equipo humano."
          }
        ],
        benefits: [
          "Atención al cliente 24/7",
          "Reducción de tiempos de respuesta",
          "Mayor satisfacción del cliente",
          "Generación de leads cualificados"
        ]
      }
    },
    {
      icon: <Settings />,
      title: "Integración con CRM y Sistemas",
      description: "Conectamos tus herramientas y plataformas (CRM, ERP, etc.) para asegurar un flujo de datos cohesivo y una visión 360° de tus operaciones y clientes.",
      features: [
        "Sincronización de datos en tiempo real.",
        "Automatización de flujos entre sistemas.",
        "APIs personalizadas y conectores.",
        "Mejora de la eficiencia operativa.",
      ],
      detailedInfo: {
        examples: [
          {
            title: "Integración Salesforce-SAP",
            description: "Conectamos sistemas de CRM y ERP para sincronizar datos de clientes, pedidos y facturación en tiempo real."
          },
          {
            title: "Automatización de Marketing",
            description: "Sistema que integra herramientas de marketing con CRM para automatizar campañas y seguimiento de leads."
          }
        ],
        benefits: [
          "Visión unificada de datos",
          "Eliminación de silos de información",
          "Procesos más eficientes",
          "Mejor toma de decisiones"
        ]
      }
    },
    {
      icon: <LifeBuoy />,
      title: "Soporte y Mantenimiento Técnico",
      description: "Ofrecemos soporte técnico especializado y planes de mantenimiento proactivo para garantizar el óptimo funcionamiento de tus soluciones de automatización.",
      features: [
        "Soporte técnico multicanal.",
        "Mantenimiento preventivo y correctivo.",
        "Actualizaciones y mejoras de software.",
        "Capacitación para tu equipo.",
      ],
      detailedInfo: {
        examples: [
          {
            title: "Soporte Proactivo",
            description: "Monitoreo continuo de sistemas con alertas tempranas y resolución preventiva de problemas."
          },
          {
            title: "Plan de Mantenimiento",
            description: "Programa de actualizaciones y optimizaciones periódicas para mantener el rendimiento óptimo."
          }
        ],
        benefits: [
          "Tiempo de actividad garantizado",
          "Respuesta rápida a incidencias",
          "Actualizaciones regulares",
          "Soporte técnico especializado"
        ]
      }
    },
  ];

  const openModal = (service) => {
    console.log('Opening modal with service:', service); // Debug log
    setSelectedService(service);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setSelectedService(null);
    }, 200);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-sencrom-gray-dark text-white"
    >
      {/* Hero Section */}
      <AnimatedSection className="section-padding bg-sencrom-gray">
        <div className="container-custom text-center">
          <BrainCircuit className="h-16 w-16 text-electric-green mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nuestros <span className="gradient-text">Servicios</span></h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Soluciones de automatización a medida diseñadas para impulsar la eficiencia, la innovación y el crecimiento de tu negocio en la era digital.
          </p>
        </div>
      </AnimatedSection>

      {/* Services Grid */}
      <AnimatedSection className="section-padding container-custom">
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.title} 
              {...service} 
              delay={index * 0.1} 
              onOpenModal={openModal}
            />
          ))}
        </div>
      </AnimatedSection>

      {/* Modal de Detalles */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {selectedService && (
          <DialogContent className="bg-sencrom-gray-dark border border-electric-green/30 max-w-4xl">
            <DialogHeader>
              <div className="flex items-center mb-4">
                <div className="p-3 bg-electric-green/20 rounded-full mr-4">
                  {React.cloneElement(selectedService.icon, { className: "h-8 w-8 text-electric-green" })}
                </div>
                <DialogTitle className="text-2xl font-bold text-white">{selectedService.title}</DialogTitle>
              </div>
              <DialogDescription className="text-gray-300">
                {selectedService.description}
              </DialogDescription>
            </DialogHeader>

            <div className="p-6 overflow-y-auto">
              {/* Ejemplos Prácticos */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-electric-green">Ejemplos Prácticos</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedService.detailedInfo?.examples?.map((example, index) => (
                    <div key={index} className="bg-sencrom-gray/30 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold mb-2 text-white">{example.title}</h4>
                      <p className="text-gray-400">{example.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Beneficios */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-electric-green">Beneficios Clave</h3>
                <ul className="grid md:grid-cols-2 gap-4">
                  {selectedService.detailedInfo?.benefits?.map((benefit, index) => (
                    <li key={index} className="flex items-start bg-sencrom-gray/30 p-4 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-lime-green mr-2 mt-0.5 shrink-0" />
                      <span className="text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <DialogFooter className="p-6 pt-4 border-t border-sencrom-gray/50">
              <Button className="btn-primary-animated group">
                Solicitar Información
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </motion.div>
  );
};

export default ServicesPage;