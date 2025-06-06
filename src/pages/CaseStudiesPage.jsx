import React, { useState } from 'react';
import AnimatedSection from '@/components/AnimatedSection';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { TrendingUp, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const SencromIsologo = "https://storage.googleapis.com/hostinger-horizons-assets-prod/4ff44e50-168e-43a1-9e05-9ef5897712ea/e433dea4a306326fa0c8cbb272b1f615.png";

const caseStudiesData = [
  {
    id: 1,
    title: "Optimización de Soporte al Cliente para E-commerce Global",
    clientLogoKey: "logo-ecommerce-global",
    clientName: "ShopSphere Inc.",
    challenge: "Manejar un alto volumen de consultas de clientes en múltiples idiomas y zonas horarias, manteniendo una alta satisfacción.",
    solution: "Implementación de un chatbot multilingüe con IA, integrado con su CRM y sistema de tickets. El chatbot maneja el 80% de las consultas frecuentes y escala casos complejos a agentes humanos.",
    results: [
      "Reducción del 60% en tiempos de respuesta.",
      "Aumento del 25% en la satisfacción del cliente.",
      "Disminución del 40% en costos operativos de soporte.",
    ],
    imageKey: "case-study-ecommerce",
    category: "Chatbots"
  },
  {
    id: 2,
    title: "Automatización de Procesos Financieros para Fintech",
    clientLogoKey: "logo-fintech-innovators",
    clientName: "FinNext Solutions",
    challenge: "Procesos manuales lentos y propensos a errores en la conciliación de cuentas y generación de informes regulatorios.",
    solution: "Desarrollo de bots RPA para automatizar la extracción de datos, validación, conciliación y generación de informes, asegurando cumplimiento y precisión.",
    results: [
      "95% de reducción en el tiempo de procesamiento de conciliaciones.",
      "Eliminación de errores manuales.",
      "Cumplimiento regulatorio mejorado y auditorías más rápidas.",
    ],
    imageKey: "case-study-fintech",
    category: "Automatización RPA"
  },
  {
    id: 3,
    title: "Mejora de Captación de Leads para Startup Tecnológica",
    clientLogoKey: "logo-tech-startup",
    clientName: "Innovatech Ltd.",
    challenge: "Baja tasa de conversión de visitantes web a leads cualificados y un proceso de seguimiento manual ineficiente.",
    solution: "Implementación de un chatbot proactivo en el sitio web para interactuar con visitantes, calificar leads y agendar demos automáticamente en el calendario de los SDRs.",
    results: [
      "Aumento del 150% en la generación de leads cualificados.",
      "Reducción del ciclo de ventas en un 30%.",
      "Mejora de la productividad del equipo de ventas.",
    ],
    imageKey: "case-study-startup",
    category: "Chatbots"
  },
];

const testimonialsData = [
    { id: 1, quote: "SENCROM transformó nuestra atención al cliente. Sus chatbots son increíblemente eficientes.", author: "CEO de ShopSphere Inc.", companyLogoKey: "logo-ecommerce-global-sm" },
    { id: 2, quote: "La automatización de nuestros procesos financieros nos ha ahorrado incontables horas y mejorado nuestra precisión.", author: "CFO de FinNext Solutions", companyLogoKey: "logo-fintech-innovators-sm" },
    { id: 3, quote: "Hemos visto un aumento drástico en leads cualificados desde que implementamos los chatbots de SENCROM.", author: "VP de Marketing, Innovatech Ltd.", companyLogoKey: "logo-tech-startup-sm" },
];

const CaseStudiesPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev === caseStudiesData.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? caseStudiesData.length - 1 : prev - 1));

  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));


  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-sencrom-gray-dark text-white pt-8 md:pt-12"
    >
      {/* Hero Section */}
      <div className="bg-sencrom-gray-dark text-white">
        <AnimatedSection className="pt-32 pb-8 md:pt-40 md:pb-12 bg-gradient-to-b from-sencrom-gray via-sencrom-gray-dark to-sencrom-gray-dark">
          <div className="container-custom text-center">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <TrendingUp className="w-10 h-10 md:w-12 md:h-12 mr-4 text-electric-green" />
              Casos de <span className="gradient-text ml-3">Éxito</span>
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Descubre cómo hemos ayudado a empresas a transformar sus operaciones y alcanzar nuevos niveles de eficiencia.
            </motion.p>
          </div>
        </AnimatedSection>
      </div>

      {/* Case Studies Slider */}
      <AnimatedSection className="section-padding container-custom relative overflow-hidden">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Nuestros <span className="gradient-text">Proyectos Destacados</span></h2>
        <AnimatePresence initial={false} custom={currentSlide}>
          <motion.div
            key={currentSlide}
            custom={currentSlide}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 }}}
            className="glassmorphism p-8 rounded-lg shadow-xl grid md:grid-cols-2 gap-8 items-center"
          >
            <div>
              <img 
                className="rounded-lg shadow-lg w-full h-auto object-cover aspect-video mb-6 md:mb-0"
                alt={`Visual representation for ${caseStudiesData[currentSlide].title}`}
               src="https://images.unsplash.com/photo-1545029013-53df3fe020e8" />
            </div>
            <div>
              <span className="inline-block px-3 py-1 text-xs font-semibold text-electric-green bg-electric-green/20 rounded-full mb-2">{caseStudiesData[currentSlide].category}</span>
              <h3 className="text-2xl font-bold mb-3 text-white">{caseStudiesData[currentSlide].title}</h3>
              <p className="text-sm text-gray-400 mb-1"><span className="font-semibold text-gray-300">Cliente:</span> {caseStudiesData[currentSlide].clientName}</p>
              <p className="text-sm text-gray-400 mb-4"><span className="font-semibold text-gray-300">Desafío:</span> {caseStudiesData[currentSlide].challenge}</p>
              <p className="text-sm text-gray-300 mb-4"><span className="font-semibold text-lime-green">Solución SENCROM:</span> {caseStudiesData[currentSlide].solution}</p>
              <div className="mt-4">
                <p className="font-semibold text-electric-green mb-2">Resultados Clave:</p>
                <ul className="space-y-1 text-sm text-gray-300 list-inside">
                  {caseStudiesData[currentSlide].results.map((result, i) => (
                    <li key={i} className="flex items-start">
                      <TrendingUp className="h-4 w-4 text-lime-green mr-2 mt-0.5 shrink-0" />{result}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <Button onClick={prevSlide} variant="outline" size="icon" className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 z-10 bg-sencrom-gray-light/50 hover:bg-electric-green border-electric-green text-electric-green hover:text-sencrom-gray-dark">
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button onClick={nextSlide} variant="outline" size="icon" className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 z-10 bg-sencrom-gray-light/50 hover:bg-electric-green border-electric-green text-electric-green hover:text-sencrom-gray-dark">
          <ChevronRight className="h-6 w-6" />
        </Button>
        <div className="flex justify-center mt-8 space-x-2">
            {caseStudiesData.map((_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-electric-green scale-125' : 'bg-sencrom-gray-light hover:bg-electric-green/50'}`}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
        </div>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection className="section-padding bg-sencrom-gray relative overflow-hidden">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Lo que <span className="gradient-text">Nuestros Clientes</span> Dicen</h2>
          <AnimatePresence initial={false} custom={currentTestimonial}>
            <motion.div
              key={currentTestimonial}
              custom={currentTestimonial}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 }}}
              className="glassmorphism p-8 md:p-12 rounded-lg shadow-xl max-w-3xl mx-auto text-center"
            >
              <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-yellow-400 fill-yellow-400/50'}`} />)}
              </div>
              <p className="text-xl md:text-2xl italic text-gray-200 mb-6">"{testimonialsData[currentTestimonial].quote}"</p>
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-sencrom-gray-light flex items-center justify-center mr-4">
                    <img src={SencromIsologo} alt="SENCROM Isologo Mini" className="h-8 w-8 md:h-10 md:w-10" />
                </div>
                <p className="font-semibold text-white">{testimonialsData[currentTestimonial].author}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          <Button onClick={prevTestimonial} variant="ghost" size="icon" className="absolute top-1/2 left-2 md:left-16 transform -translate-y-1/2 z-10 text-electric-green hover:bg-electric-green/20">
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button onClick={nextTestimonial} variant="ghost" size="icon" className="absolute top-1/2 right-2 md:right-16 transform -translate-y-1/2 z-10 text-electric-green hover:bg-electric-green/20">
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>
      </AnimatedSection>

      {/* Client Logos Section */}
        <AnimatedSection className="py-16 container-custom">
            <h2 className="text-2xl font-semibold text-center text-gray-400 mb-10">Empresas que <span className="text-gray-200">Confían</span> en Nosotros</h2>
            <div className="flex flex-wrap justify-center items-center gap-x-20 gap-y-12 md:gap-x-24 md:gap-y-16">
                {["LogoEmpresaA", "LogoEmpresaB", "LogoEmpresaC", "LogoEmpresaD", "LogoEmpresaE"].map((logo, index) => (
                     <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center h-20 md:h-24 w-auto"
                    >
                        <img src={SencromIsologo} alt={`Placeholder ${logo}`} className="h-full max-h-20 md:max-h-24 object-contain" />
                    </motion.div>
                ))}
            </div>
        </AnimatedSection>
    </motion.div>
  );
};

export default CaseStudiesPage;