import { motion } from "framer-motion";

interface SlideProps {
  location: string;
  imageUrl: string;
  direction: number;
}

export function Slide({ location, imageUrl, direction }: SlideProps) {
  return (
    <motion.div
      initial={{ y: direction * 100 + "%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: direction * -100 + "%", opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="absolute inset-0 flex items-center justify-center"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <motion.h2
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.5, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="text-6xl font-bold text-white text-center px-4 py-2 bg-black bg-opacity-50 rounded"
      >
        {location}
      </motion.h2>
    </motion.div>
  );
}

