import { motion } from 'framer-motion';

export default function OpacityMotion({ children }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, y: -20 }} exit={{ opacity: 0, y: 0 }} transition={{ duration: 0.5 }}>
      {children}
    </motion.div>
  );
};