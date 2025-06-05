import React, { useRef } from 'react';
    import { motion, useInView } from 'framer-motion';

    const AnimatedSection = ({ children, className, delay = 0, once = true }) => {
      const ref = useRef(null);
      const isInView = useInView(ref, { once: once, amount: 0.2 });

      const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
      };

      return (
        <motion.section
          ref={ref}
          className={className}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={variants}
        >
          {children}
        </motion.section>
      );
    };

    export default AnimatedSection;