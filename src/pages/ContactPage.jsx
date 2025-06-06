import React, { useState } from 'react';
import AnimatedSection from '@/components/AnimatedSection';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            company: formData.company, 
            service_interest: formData.service, 
            message: formData.message 
          }
        ]);

      if (error) {
        throw error;
      }

      toast({
        title: "¡Mensaje Enviado!",
        description: "Gracias por contactarnos. Nos pondremos en contacto contigo pronto.",
        variant: "default",
      });
      setFormData({ name: '', email: '', company: '', service: '', message: '' });

    } catch (error) {
      console.error('Error sending message to Supabase:', error);
      toast({
        title: "Error al Enviar",
        description: "Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const inputFieldVariants = {
    focus: { borderColor: "hsl(var(--primary))", boxShadow: "0 0 0 2px hsl(var(--primary) / 0.4)" },
    blur: { borderColor: "hsl(var(--input))", boxShadow: "none" },
  };

  const contactEmail = "Admin@sencrom.info";
  const contactPhone = "829-412-1019";
  const contactAddress = "C/marginal, Vista Bella, santo domingo norte";
  const mapLat = "18.553409";
  const mapLon = "-69.902964";
  const mapEmbedSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(mapLon)-0.01}%2C${parseFloat(mapLat)-0.01}%2C${parseFloat(mapLon)+0.01}%2C${parseFloat(mapLat)+0.01}&layer=mapnik&marker=${mapLat}%2C${mapLon}`;


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-sencrom-gray-dark text-white"
    >
      <AnimatedSection className="section-padding bg-sencrom-gray pt-80 md:pt-96">
        <div className="container-custom text-center">
          <div className="flex items-center justify-center mb-6">
            <Mail className="h-16 w-16 text-electric-green mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">Ponte en <span className="gradient-text">Contacto</span></h1>
          </div>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            ¿Tienes un proyecto en mente o quieres saber más sobre nuestros servicios? Estamos aquí para ayudarte a potenciar tu negocio.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding container-custom">
        <div className="pt-6 md:pt-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div 
              className="glassmorphism p-8 rounded-lg shadow-xl"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-semibold mb-6 text-white">Envíanos un Mensaje</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Nombre Completo</label>
                  <motion.input variants={inputFieldVariants} whileFocus="focus" whileBlur="blur" type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} required className="w-full" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Correo Electrónico</label>
                  <motion.input variants={inputFieldVariants} whileFocus="focus" whileBlur="blur" type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} required className="w-full" />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">Empresa (Opcional)</label>
                  <motion.input variants={inputFieldVariants} whileFocus="focus" whileBlur="blur" type="text" name="company" id="company" value={formData.company} onChange={handleInputChange} className="w-full" />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-1">Servicio de Interés</label>
                  <motion.select name="service" id="service" value={formData.service} onChange={handleInputChange} className="w-full bg-sencrom-gray-light border border-lime-green/30 focus:border-lime-green focus:ring-lime-green rounded-md p-3 text-foreground">
                    <option value="">Selecciona un servicio...</option>
                    <option value="automatizacion_procesos">Automatización de Procesos (RPA)</option>
                    <option value="chatbots">Implementación de Chatbots</option>
                    <option value="integracion_crm">Integración con CRM y Sistemas</option>
                    <option value="soporte_mantenimiento">Soporte y Mantenimiento</option>
                    <option value="consultoria">Consultoría General</option>
                  </motion.select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Tu Mensaje</label>
                  <motion.textarea variants={inputFieldVariants} whileFocus="focus" whileBlur="blur" name="message" id="message" rows="4" value={formData.message} onChange={handleInputChange} required className="w-full"></motion.textarea>
                </div>
                <div>
                  <Button type="submit" className="w-full btn-primary-animated group" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar Mensaje <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay:0.2 }}
            >
              <div className="glassmorphism p-8 rounded-lg shadow-xl mb-8">
                <h2 className="text-2xl font-semibold mb-6 text-white">Información de Contacto</h2>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <Mail className="h-6 w-6 text-electric-green mr-3 mt-1 shrink-0" />
                    <div>
                      <span className="font-semibold block text-gray-200">Correo Electrónico</span>
                      <a href={`mailto:${contactEmail}`} className="hover:text-electric-green transition-colors">{contactEmail}</a>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Phone className="h-6 w-6 text-electric-green mr-3 mt-1 shrink-0" />
                    <div>
                      <span className="font-semibold block text-gray-200">Teléfono</span>
                      <a href={`tel:${contactPhone.replace(/-/g, '')}`} className="hover:text-electric-green transition-colors">{contactPhone}</a>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="h-6 w-6 text-electric-green mr-3 mt-1 shrink-0" />
                    <div>
                      <span className="font-semibold block text-gray-200">Oficina Principal</span>
                      <p>{contactAddress}</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="glassmorphism rounded-lg shadow-xl overflow-hidden aspect-video">
                <iframe
                  title="SENCROM Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30257.487354838147!2d-69.92198738390564!3d18.56565498232638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf88d6ed0655eb%3A0x578f0137486189a3!2sVilla%20Mella!5e0!3m2!1ses-419!2sdo!4v1749076871973!5m2!1ses-419!2sdo"
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>
    </motion.div>
  );
};

export default ContactPage;
  