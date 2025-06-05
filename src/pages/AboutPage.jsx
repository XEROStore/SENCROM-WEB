import React from 'react';
import AnimatedSection from '@/components/AnimatedSection';
import { motion } from 'framer-motion';
import { Target, Users, Award, Building, Lightbulb, KeyRound as UsersRound, Linkedin, Briefcase } from 'lucide-react';

const SencromIsologo = "https://storage.googleapis.com/hostinger-horizons-assets-prod/4ff44e50-168e-43a1-9e05-9ef5897712ea/e433dea4a306326fa0c8cbb272b1f615.png";

const AboutPage = () => {
  const teamMembers = [
    { 
      name: "Alexander Ant. Perez", 
      role: "Co-Fundador y Director Administrativo", 
      imgKey: "team-member-alexander", 
      description: "Visionario en la gestión empresarial con amplia experiencia en la dirección y optimización de operaciones. Alexander co-fundó SENCROM con la visión de transformar la manera en que las empresas gestionan sus procesos.",
      bio: "Alexander es un líder estratégico con una sólida trayectoria en la gestión administrativa y operativa. Su experiencia abarca desde la implementación de sistemas de gestión eficientes hasta la optimización de procesos empresariales. Es un apasionado por la innovación y la excelencia operativa, buscando constantemente nuevas formas de mejorar la eficiencia y el rendimiento organizacional.",
      icon: <UsersRound className="h-12 w-12 text-electric-green" /> 
    },
    { 
      name: "Eurys E. Cruz", 
      role: "Co-Fundador y Director de Publicidad", 
      imgKey: "team-member-eurys", 
      description: "Con amplia trayectoria en el desarrollo, implementación y supervisión de campañas publicitarias creativas, estratégicas y orientadas a resultados.",
      bio: "Experto en posicionamiento de marca, gestión de imagen corporativa y comunicación integral en medios tradicionales y digitales. Cuenta con una sólida capacidad para liderar equipos creativos y multidisciplinarios, gestionando proyectos desde la conceptualización hasta la ejecución. Su enfoque combina análisis de mercado, innovación, storytelling y uso eficiente de recursos, permitiéndole conectar con diferentes públicos y generar un impacto medible en términos de notoriedad y retorno de inversión.",
      icon: <img src="https://zvkpayuqrgunnoqavjqo.supabase.co/storage/v1/object/public/images//icono%20eurys%202.png" alt="Eurys E. Cruz" className="w-32 h-32 md:w-40 md:h-40 rounded-full" />
    },
    { 
      name: "Darwin Yakir Diaz", 
      role: "Co-Fundador y Director de Proyectos", 
      imgKey: "team-member-darwin", 
      description: "Experto en gestión y dirección de proyectos tecnológicos, con un enfoque en la implementación de soluciones innovadoras que transforman los procesos empresariales.",
      bio: "Con una sólida formación en gestión de proyectos y tecnología, Darwin lidera la implementación de soluciones de automatización y transformación digital. Su experiencia abarca desde la planificación estratégica hasta la ejecución de proyectos complejos, asegurando la entrega de resultados de alta calidad y el cumplimiento de objetivos empresariales. Su visión estratégica y metodología ágil han sido clave en el éxito de numerosos proyectos de transformación digital en diversos sectores empresariales.",
      icon: <Lightbulb className="h-12 w-12 text-electric-green" />
    },
  ];

  const timelineEvents = [
    { year: "2020", title: "Nacimiento de SENCROM", description: "Fundada con la misión de democratizar la automatización inteligente para empresas de todos los tamaños." },
    { year: "2021", title: "Primeros Clientes", description: "Implementación exitosa de un sistema de chatbot (Asistente Virtual) para pequeñas y medianas empresas mejorando su atención al cliente en un 40%." },
    { year: "2022", title: "Expansión de Servicios", description: "Ampliamos nuestra oferta para incluir automatización de procesos robóticos (RPA) e integración avanzada con CRMs." },
    { year: "2023-2024", title: "Implementaciones de nuevas Automatizaciones", description: "Desarrollamos nuevas automatizaciones para diferentes sectores empresariales como: Salud, Educación, Gastronomía, Logística, y Atención al Cliente." },
    { year: "Hoy", title: "Líderes en Automatización", description: "Continuamos creciendo y ayudando a más empresas a alcanzar su máximo potencial a través de la tecnología." },
  ];

  const companyValues = [
    { icon: <Lightbulb className="h-8 w-8 text-electric-green" />, name: "Innovación", description: "Buscamos constantemente nuevas y mejores formas de aplicar la tecnología." },
    { icon: <Users className="h-8 w-8 text-electric-green" />, name: "Centrados en el Cliente", description: "El éxito de nuestros clientes es nuestro principal objetivo." },
    { icon: <Award className="h-8 w-8 text-electric-green" />, name: "Excelencia", description: "Nos esforzamos por la más alta calidad en todo lo que hacemos." },
    { icon: <Building className="h-8 w-8 text-electric-green" />, name: "Integridad", description: "Actuamos con honestidad y transparencia en todas nuestras interacciones." },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-sencrom-gray-dark text-white pt-8 md:pt-12" 
    >
      {/* Hero Section */}
      <AnimatedSection className="pt-16 pb-8 md:pt-24 md:pb-12 bg-gradient-to-b from-sencrom-gray via-sencrom-gray-dark to-sencrom-gray-dark">
        <div className="container-custom text-center">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Users className="w-10 h-10 md:w-12 md:h-12 mr-4 text-electric-green" />
            Sobre <span className="gradient-text ml-3">Nosotros</span>
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Somos una empresa enfocada en la transformación digital, dedicados a impulsar la eficiencia y el crecimiento de los negocios a través de la automatización inteligente y soluciones de chatbot personalizados.
          </motion.p>
        </div>
      </AnimatedSection>

      {/* Company Info Section */}
      <AnimatedSection className="section-padding container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Building className="h-16 w-16 text-electric-green mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Nuestra <span className="gradient-text">Esencia</span></h2>
            <p className="text-gray-300 mb-4 text-lg">
              En SENCROM, no solo construimos software; construimos el futuro de los negocios. Creemos que la tecnología de automatización tiene el poder de liberar el potencial humano, permitiendo a las empresas centrarse en la innovación y el crecimiento estratégico.
            </p>
            <p className="text-gray-300 mb-6 text-lg">
              Nuestra cultura se basa en la colaboración, la curiosidad insaciable y un compromiso inquebrantable con el éxito de nuestros clientes. Cada solución que desarrollamos está impregnada de nuestra pasión por la excelencia técnica y nuestra visión de un mundo empresarial más eficiente e inteligente.
            </p>
          </div>
          <div>
            <img  
              className="rounded-lg shadow-2xl shadow-electric-green/40 w-full h-auto object-cover aspect-[4/3]"
              alt="Equipo de SENCROM colaborando en un proyecto de automatización en una oficina moderna y luminosa"
              src="https://zvkpayuqrgunnoqavjqo.supabase.co/storage/v1/object/public/images//AI.jpg" />
          </div>
        </div>
      </AnimatedSection>

      {/* Values Section */}
      <AnimatedSection className="section-padding bg-sencrom-gray">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Nuestros <span className="gradient-text">Valores Fundamentales</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <motion.div
                key={value.name}
                className="glassmorphism p-6 rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{value.name}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Our Story / Timeline */}
      <AnimatedSection className="section-padding container-custom">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Nuestra <span className="gradient-text">Trayectoria</span></h2>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-electric-green/30 h-full hidden md:block"></div>
          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              className={`mb-12 flex md:items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <div className="hidden md:block md:w-1/2"></div>
              <div className="hidden md:block relative md:w-1/12">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-electric-green rounded-full border-4 border-sencrom-gray-dark animate-subtle-glow flex items-center justify-center">
                   <img src={SencromIsologo} alt="SENCROM Isologo Mini" className="h-6 w-6" />
                </div>
              </div>
              <div className="w-full md:w-5/12 glassmorphism p-6 rounded-lg shadow-lg">
                <p className="text-electric-green font-semibold text-xl mb-1">{event.year}</p>
                <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-400 text-sm">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
      
      {/* Mission & Vision */}
      <AnimatedSection className="section-padding bg-sencrom-gray">
        <div className="container-custom grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Target className="h-12 w-12 text-electric-green mb-4" />
            <h2 className="text-3xl font-bold mb-4">Nuestra Misión</h2>
            <p className="text-gray-300 mb-6 text-lg">
              Empoderar a las empresas con soluciones de automatización innovadoras y accesibles que impulsen la eficiencia, mejoren la experiencia del cliente y fomenten el crecimiento sostenible.
            </p>
            <Award className="h-12 w-12 text-electric-green mb-4 mt-8" />
            <h2 className="text-3xl font-bold mb-4">Nuestra Visión</h2>
            <p className="text-gray-300 text-lg">
              Ser el socio tecnológico líder a nivel global en automatización inteligente, reconocido por nuestra excelencia, innovación y el impacto transformador que generamos en los negocios de nuestros clientes, y eliminar la brecha del desconocimiento de estas nuevas herramientas.
            </p>
          </div>
          <div>
            <img  
              className="rounded-lg shadow-2xl shadow-electric-green/30 w-full h-auto object-cover aspect-square"
              alt="Representación visual de la misión y visión de SENCROM"
              src="https://zvkpayuqrgunnoqavjqo.supabase.co/storage/v1/object/public/images//mision%20y%20vision.jpg" />
          </div>
        </div>
      </AnimatedSection>

      {/* Team Section - Enhanced */}
      <AnimatedSection className="section-padding container-custom">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Conoce a Nuestro <span className="gradient-text">Equipo Directivo</span></h2>
        <div className="space-y-12">
          {teamMembers.map((member, index) => (
            <motion.div 
              key={member.name}
              className="glassmorphism p-8 rounded-lg shadow-xl flex flex-col md:flex-row items-center gap-8 transform transition-all duration-300 hover:scale-102 hover:shadow-2xl hover:shadow-electric-green/25"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
               <div className="flex-shrink-0 text-center">
                 {member.name === "Eurys E. Cruz" ? (
                   <img 
                     src="https://zvkpayuqrgunnoqavjqo.supabase.co/storage/v1/object/public/images//icono%20eurys%202.png" 
                     alt="Eurys E. Cruz" 
                     className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-4" 
                   />
                 ) : (
                   <div className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-4 bg-sencrom-gray-light flex items-center justify-center border-4 border-electric-green/50 shadow-lg">
                     {member.icon}
                   </div>
                 )}
                 <h3 className="text-2xl font-semibold text-white">{member.name}</h3>
                 <p className="text-electric-green text-md mb-2">{member.role}</p>
               </div>
               <div className="md:pl-8 border-t md:border-t-0 md:border-l border-sencrom-gray-light/50 pt-6 md:pt-0">
                  <p className="text-gray-300 mb-3 text-md italic">"{member.description}"</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
               </div>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
    </motion.div>
  );
};

export default AboutPage;