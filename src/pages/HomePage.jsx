import React from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import AnimatedSection from '@/components/AnimatedSection';
    import { ArrowRight, Zap, CheckCircle, Users, BrainCircuit, MessageSquare, Settings, LifeBuoy, Eye } from 'lucide-react';
    import { Link } from 'react-router-dom';

    const HomePage = () => {
      const sencromLogoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/4ff44e50-168e-43a1-9e05-9ef5897712ea/7cec7ac4a163d4e087e5076cde4eb704.png";
      const featuredServiceImageUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/4ff44e50-168e-43a1-9e05-9ef5897712ea/c17032a66d72f4fd233cc77112bf149f.jpg";

      const summarizedServices = [
        {
          icon: <Zap className="h-8 w-8 text-electric-green" />,
          title: "Automatización RPA",
          description: "Optimizamos flujos de trabajo, reducimos errores y liberamos a tu equipo.",
          link: "/services#rpa" 
        },
        {
          icon: <MessageSquare className="h-8 w-8 text-electric-green" />,
          title: "Chatbots Inteligentes",
          description: "Mejoramos la atención al cliente y automatizamos la comunicación 24/7.",
          link: "/services#chatbots"
        },
        {
          icon: <Settings className="h-8 w-8 text-electric-green" />,
          title: "Integración de Sistemas",
          description: "Conectamos tus herramientas (CRM, ERP) para un flujo de datos cohesivo.",
          link: "/services#integration"
        },
        {
          icon: <LifeBuoy className="h-8 w-8 text-electric-green" />,
          title: "Soporte y Mantenimiento",
          description: "Garantizamos el óptimo funcionamiento de tus soluciones de automatización.",
          link: "/services#support"
        }
      ];

      return (
        <div className="bg-sencrom-gray-dark text-white">
          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img 
                className="absolute inset-0 w-full h-full object-cover opacity-40"
                alt="Mano interactuando con una interfaz digital futurista de automatización"
               src="https://zvkpayuqrgunnoqavjqo.supabase.co/storage/v1/object/public/images//fondo%20bot.png" />
              <div className="absolute inset-0 bg-gradient-to-b from-sencrom-gray-dark/30 via-sencrom-gray-dark to-sencrom-gray-dark"></div>
            </div>
            
            <motion.div 
              className="relative z-10 container-custom text-center flex flex-col items-center pt-24 md:pt-28"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.img
                src={sencromLogoUrl}
                alt="Logo SENCROM Automatizaciones"
                className="w-64 h-auto md:w-96 mb-2" 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2"
                initial={{ opacity: 0, y:20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration:0.8, delay: 0.4}}
              >
                <span className="block">Potencia tu negocio con</span>
                <span className="gradient-text block mt-0.5 sm:mt-0">automatización inteligente</span>
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-4"
                initial={{ opacity: 0, y:20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration:0.8, delay: 0.6}}
              >
                En SENCROM, transformamos procesos y mejoramos la eficiencia con soluciones de IA y chatbots a la medida de tu empresa.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Link to="/products">
                  <Button size="lg" className="btn-primary-animated text-lg px-8 py-6 group">
                    Solicita una Demo
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
             <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </motion.div>
          </section>

          {/* Summarized Services Section */}
          <AnimatedSection className="section-padding container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestras <span className="gradient-text">Soluciones Clave</span></h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Un vistazo rápido a cómo podemos transformar tu negocio con automatización.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {summarizedServices.map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-sencrom-gray p-6 rounded-xl shadow-lg hover:shadow-electric-green/30 transition-all duration-300 flex flex-col items-center text-center transform hover:-translate-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="p-3 bg-electric-green/10 rounded-full mb-4 inline-block animate-subtle-glow">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{service.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 flex-grow">{service.description}</p>
                  <Link to={service.link}>
                    <Button variant="link" className="text-electric-green hover:text-lime-green group">
                      Ver más <Eye className="ml-2 h-4 w-4 group-hover:opacity-75 transition-opacity" />
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
             <div className="text-center mt-12">
                <Link to="/services">
                    <Button size="lg" variant="outline" className="border-electric-green text-electric-green hover:bg-electric-green hover:text-sencrom-gray-dark group">
                        Explorar Todos los Servicios
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </Link>
            </div>
          </AnimatedSection>


          {/* Why Sencrom Section */}
          <AnimatedSection className="section-padding container-custom bg-sencrom-gray rounded-xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Por qué <span className="gradient-text">SENCROM</span>?</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Combinamos tecnología de punta con un enfoque centrado en el cliente para ofrecer resultados excepcionales.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: <Zap className="h-10 w-10 text-electric-green mb-4" />, title: "Innovación Constante", description: "Nos mantenemos a la vanguardia de la IA y la automatización para ofrecerte las soluciones más avanzadas." },
                { icon: <CheckCircle className="h-10 w-10 text-electric-green mb-4" />, title: "Resultados Medibles", description: "Nuestras implementaciones están diseñadas para generar un impacto real y cuantificable en tu negocio." },
                { icon: <Users className="h-10 w-10 text-electric-green mb-4" />, title: "Soporte Dedicado", description: "Te acompañamos en cada paso, desde la consultoría inicial hasta el soporte post-implementación." },
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="glassmorphism p-8 rounded-lg text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-electric-green/20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {item.icon}
                  <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* Featured Service Section */}
          <AnimatedSection className="section-padding bg-sencrom-gray-dark"> 
            <div className="container-custom">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative w-full h-auto md:h-[400px] flex items-center justify-center overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-electric-green/20 blur-3xl animate-pulse"></div>
                  <img 
                    className="relative z-10 rounded-lg w-full h-full object-contain" 
                    alt="Chatbot interface on a futuristic display"
                    src="https://zvkpayuqrgunnoqavjqo.supabase.co/storage/v1/object/public/images//CHATBOT%201.jpg" 
                  />
                </div>
                <div>
                  <span className="text-sm font-semibold text-electric-green uppercase tracking-wider">Producto Destacado</span>
                  <h2 className="text-3xl md:text-4xl font-bold my-4">Chatbots Inteligentes para Atención al Cliente</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    Revoluciona tu servicio al cliente con chatbots que entienden, responden y resuelven consultas 24/7. Libera a tu equipo humano para tareas de mayor valor.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center"><CheckCircle className="h-5 w-5 text-lime-green mr-3" /> Disponibilidad continua y respuestas instantáneas.</li>
                    <li className="flex items-center"><CheckCircle className="h-5 w-5 text-lime-green mr-3" /> Reducción de costos operativos.</li>
                    <li className="flex items-center"><CheckCircle className="h-5 w-5 text-lime-green mr-3" /> Mejora de la satisfacción del cliente.</li>
                  </ul>
                  <Link to="/products?open=asistente-virtual">
                    <Button variant="outline" className="border-electric-green text-electric-green hover:bg-electric-green hover:text-sencrom-gray-dark group">
                      Conocer Más <BrainCircuit className="ml-2 h-5 w-5 group-hover:animate-pulse" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* CTA Section */}
          <AnimatedSection className="section-padding text-center relative bg-[url('https://zvkpayuqrgunnoqavjqo.supabase.co/storage/v1/object/public/images//fondo.png')] bg-cover bg-center">
             {/* Overlay to make text readable */}
             <div className="absolute inset-0 bg-sencrom-gray-dark opacity-80"></div>
             <div className="container-custom relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                ¿Listo para llevar tu negocio al <span className="neon-text">siguiente nivel</span>?
                </h2>
                <p className="text-lg text-gray-300 max-w-xl mx-auto mb-10">
                Hablemos de la implementacion de automatizaciones que necesitas para mejorar tu empresa.
                </p>
                <Button 
                  size="lg" 
                  className="btn-primary-animated text-lg px-8 py-6 group"
                  onClick={() => {
                    // Abrir el widget de Chatbase
                    if (window.chatbase) {
                      window.chatbase('open');
                    }
                  }}
                >
                    Contacta con un Experto
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
             </div>
          </AnimatedSection>
        </div>
      );
    };

    export default HomePage;