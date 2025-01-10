import { motion } from "framer-motion";

interface MorphSlideProps {
  location: string;
  imageUrl: string;
  isActive: boolean;
}

export function MorphSlide({ location, imageUrl, isActive }: MorphSlideProps) {
  return (
    <motion.div
      initial={{ clipPath: "circle(0% at 50% 50%)" }}
      animate={{ 
        clipPath: isActive ? "circle(150% at 50% 50%)" : "circle(0% at 50% 50%)",
        transition: { duration: 1, ease: [0.4, 0, 0.2, 1] }
      }}
      exit={{ clipPath: "circle(0% at 50% 50%)" }}
      className="absolute inset-0"
    >
      <div 
        className="w-full h-full"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <motion.div 
          className="w-full h-full flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isActive ? 1 : 0,
            scale: isActive ? 1 : 0.8,
            transition: { delay: 0.2, duration: 0.5 }
          }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <h2 className="text-6xl font-bold text-white text-center px-4 py-2 bg-black bg-opacity-50 rounded">
            {location}
          </h2>
        </motion.div>
      </div>
    </motion.div>
  );
}
