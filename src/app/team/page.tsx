"use client"

import React, { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { FiInstagram, FiLinkedin } from "react-icons/fi";

const teamsData = {
  heads: [
    {
      id: 1,
      title: "Mr. Umang Jain",
      subheading: "General Secretary",
      image: "/team/festhead/umangjain.jpg",
      rectangleImage: "/team/festhead/umangj.jpg",
      about: "Ek scheme hai boss",
      instagram: "",
      linkedin: "umang-jain-a52264246",
      location: "Marine Drive"
    },
    {
      id: 2,
      title: "Mr.Harsh Jain",
      subheading: "General Coordinator",
      image: "/team/festhead/harshJ.jpg",
      about: "fatafat kaam karne wala banda",
      instagram: "harshjain",
      linkedin: "username1",
      location: "Colaba"
    },
  ],
  culturals: [
    {
      id: 1,
      title: "Mr. Aaradhya Bharat",
      subheading: "Cultural Secretary",
      image: "/team/cultural/aaradhya.jpg",
      about: "Leading cultural activities and events.",
      instagram: "aaradhya.17",
      linkedin: "aaradhya-bahirat-045a54311",
      location: "Juhu Beach"
    },
    {
      id: 2,
      title: "Ms. Annanya Gupta",
      subheading: "Cultural Coordinator",
      image: "/team/cultural/annanya.jpeg",
      about: "Leading cultural activities and events.",
      instagram: "ananya_anannya_",
      linkedin: "anannya-gupta-3681531a4",
      location: "Gateway of India"
    },

  ],
  offstage: [
    {
      id: 1,
      title: "Mr. Jitendra Rajde",
      subheading: "Off-Stage Secretary",
      image: "/team/offstage/jitu.jpeg",
      about: "Leading cultural activities and events.",
      instagram: "jiitzz",
      linkedin: "none",
      location: "Bandra-Worli Sea Link"
    },
    {
      id: 2,
      title: "Mr. Rahul Jana",
      subheading: "Off-Stage Coordinator",
      image: "/team/offstage/rahul.jpg",
      about: "Leading cultural activities and events.",
      instagram: "none",
      linkedin: "cultural1",
      location: "Haji Ali Dargah"
    },
    {
      id: 3,
      title: "Mr. Kaushal Patel",
      subheading: "Off-stage Coordinator",
      image: "/team/offstage/kaushal.png",
      about: "Leading cultural activities and events.",
      instagram: "kaushal_kp12",
      linkedin: "kaushal-rupesh-patel-a3bbb6246",
      location: "Sanjay Gandhi National Park"
    },
  ],
  onstage: [
    {
      id: 1,
      title: "Mr. Vinod Bhabal",
      subheading: "On-Stage Secretary",
      image: "/team/onstage/vinod.jpg",
      about: "Leading cultural activities and events.",
      instagram: "__maybe__vinod__",
      linkedin: "none",
      location: "Chhatrapati Shivaji Terminus"
    },
    {
      id: 2,
      title: "Ms. Nityaa Bhanushali",
      subheading: "On-Stage Coordinator",
      image: "/team/onstage/Nityaa Bhanushali - NITYAA PANKAJ BHANUSHALI.jpg",
      about: "Leading cultural yactivities and events.",
      instagram: "nityaa.04",
      linkedin: "nityaa-bhanushali-8489b725a",
      location: "Elephanta Caves"
    },
  ],
  socialmedia: [
    {
        id: 1,
        title: "Mr. Krish Gala",
        subheading: "Social Media Secretary",
        image: "/team/socialmedia/krishgala.jpeg",
        about: "Hakuna Matata",
        instagram: "galakrish02",
        linkedin: "krishgala2",
        location: "Marine Drive"
      },
      {
        id: 2,
        title: "Mr.Saish Dalvi",
        subheading: "Social Media Coordinator",
        image: "/team/socialmedia/saish.jpg",
        about: "Hakuna Matata",
        instagram: "saishhh04",
        linkedin: "none",
        location: "Colaba"
      },
  ],
  webapp: [
    {
      id: 1,
      title: "Mr. Ankit Das",
      subheading: "Web & App Secretary",
      image: "/team/webapp/ankit.jpg",
      about: "Leading web and app development.",
      instagram: "ankit",
      linkedin: "ankitdas",
      location: "Juhu Beach"
    },
    {
        id: 2,
        title: "Mr. Pradnesh Revadekar",
        subheading: "Web & App Coordinator",
        image: "/team/webapp/profile-2.jpeg",
        about: "Hakuna Matata",
        instagram: "pradnesh_2504",
        linkedin: "pradnesh-revadekar",
        location: "Gateway of India"
      },
  ],
  creativity: [
    {
        id: 1,
        title: "Mr. Aditya Dangat",
        subheading: "Creativity Secretary",
        image: "team/creativity/AdityaDangat - ADITYA EKNATH DANGAT.jpg",
        about: "Hakuna Matata",
        instagram: "__im_aditya.__",
        linkedin: "aditya-dangat-29a119234",
        location: "Bandra-Worli Sea Link"
      },
      {
        id: 2,
        title: "Ms. Resha Naik",
        subheading: "Creativity Coordinator",
        image: "/team/creativity/resha.jpg",
        about: "Hakuna Matata",
        instagram: "resha._.n",
        linkedin: "resha-naik-b448ab25a",
        location: "Haji Ali Dargah"
      },
  ],
 documentation: [
    {
        id: 1,
        title: "Ms. Shreya Patwardhan",
        subheading: "Documentation Secretary",
        image: "/team/documentation/shreya.jpg",
        about: "Hakuna Matata",
        instagram: "shreya_.patwardhan",
        linkedin: "none",
        location: "Sanjay Gandhi National Park"
      },
  ],
  graphics: [
    {
        id: 1,
        title: "Ms. Diya Dalui",
        subheading: "GFX and VFX Secretary",
        image: "/team/webapp/profile-1.jpg",
        about: "Hakuna Matata",
        instagram: "none",
        linkedin: "none",
        location: "Chhatrapati Shivaji Terminus"
      },
      {
        id: 2,
        title: "Mr. Danvirsinh Jadeja",
        subheading: "GFX and VFX Secretary",
        image: "/team/graphics/danvir.jpg",
        about: "Hakuna Matata",
        instagram: "none",
        linkedin: "none",
        location: "Elephanta Caves"
      },
      {
        id: 3,
        title: "Mr. Pranav Jani",
        subheading: "GFX and VFX Coordinator",
        image: "/team/graphics/pranav.jpeg",
        about: "Hakuna Matata",
        instagram: "pranav_jani0003",
        linkedin: "pranav-jani-21545325b",
        location: "Marine Drive"
    }, 
],
infra: [
    {
        id: 1,
        title: "Mr. Ayur Shah",
        subheading: "Infra and Security Secretary",
        image: "/team/infra/ayur.JPG",
        about: "Hakuna Matata",
        instagram: "ayurshah13",
        linkedin: "none",
        location: "Colaba"
      },
      {
        id: 2,
        title: "Mr. Amey Parab",
        subheading: "Infra and Security Coordinator",
        image: "/team/infra/Amey Parab - AMEY JAYESH PARAB.jpg",
        about: "Hakuna Matata",
        instagram: "ameyyyp29",
        linkedin: "amey-parab2910",
        location: "Juhu Beach"
      },
  ],
  lr: [
    {
        id: 1,
        title: "Ms. Bhakti Dhuri",
        subheading: "Ladies Representative",
        image: "/team/lr/IMG-20241003-WA0018 - BHAKTI PRADIP DHURI.jpg",
        about: "Hakuna Matata",
        instagram: "bhakti_dhurii",
        linkedin: "none",
        location: "Gateway of India"
      },
      {
        id: 2,
        title: "Ms. Moxita Shah",
        subheading: "Ladies Representative",
        image: "/team/lr/moxita.jpg",
        about: "Hakuna Matata",
        instagram: "moxitashahh",
        linkedin: "moxitashah",
        location: "Bandra-Worli Sea Link"
      },
  ],
  pap: [
    {
        id: 1,
        title: "Mr. Aniket Gursale",
        subheading: "Photography Secretary",
        image: "/team/pap/aniket.jpeg",
        about: "Hakuna Matata",
        instagram: "aniketgursale_28",
        linkedin: "aniketgursale",
        location: "Haji Ali Dargah"
      },
      {
        id: 1,
        title: "Mr. Rohan Koyande",
        subheading: "Photography Coodinator",
        image: "/team/pap/rohan.jpeg",
        about: "Hakuna Matata",
        instagram: "rohan_koyande",
        linkedin: "rohankoyande",
        location: "Sanjay Gandhi National Park"
      },
  ],
 publicity: [
    {
        id: 1,
        title: "Ms. Nida Malik",
        subheading: "Publicity Secretary",
        image: "/team/publicity/nida.jpeg",
        about: "Hakuna Matata",
        instagram: "none",
        linkedin: "nida-malik-84b220232",
        location: "Chhatrapati Shivaji Terminus"
      },
      {
        id: 1,
        title: "Mr. Siddhant Mavani",
        subheading: "Publicity Coordinator",
        image: "/team/publicity/nida.jpeg",
        about: "Hakuna Matata",
        instagram: "m._.siddh",
        linkedin: "none",
        location: "Elephanta Caves"
      },
  ],
  sponsorship: [
    {
        id: 1,
        title: "Mr. Viplav Bhujbal",
        subheading: "Sponsorship Secretary",
        image: "/team/sponsorship/viplav.jpeg",
        about: "Hakuna Matata",
        instagram: "viplaavv",
        linkedin: "viplav-bhujbal-b7411528b",
        location: "Marine Drive"
      },
      
  ],
 sports: [
    {
        id: 1,
        title: "Mr. Kartik Tandekar",
        subheading: "Sports Secretary",
        image: "/team/webapp/profile-1.jpg",
        about: "Hakuna Matata",
        instagram: "none",
        linkedin: "none",
        location: "Colaba"
      },
      {
        id: 1,
        title: "Ms. Sanika Tajane ",
        subheading: "Sports Secretary",
        image: "/team/sports/sanika.jpeg",
        about: "Hakuna Matata",
        instagram: "sanikatajane_11",
        linkedin: "sanika-tajane-7a843a247",
        location: "Juhu Beach"
      },
      {
        id: 1,
        title: "Mr. Vedant Gharat",
        subheading: "Sports Coordinator",
        image: "/team/sports/vedantgharat.jpg",
        about: "Hakuna Matata",
        instagram: "v_edant_g",
        linkedin: "none",
        location: "Gateway of India"
      },
  ],
  technical: [
    {
        id: 1,
        title: "Mr. Udit Shishodiya",
        subheading: "Technical Secretary",
        image: "/team/webapp/profile-1.jpg",
        about: "Hakuna Matata",
        instagram: "ankit",
        linkedin: "ankitdas",
        location: "Bandra-Worli Sea Link"
      },
      {
        id: 2,
        title: "Mr. Siddhart Gugaliya",
        subheading: "Technical Coordinator",
        image: "/team/webapp/profile-1.jpg",
        about: "Hakuna Matata",
        instagram: "none",
        linkedin: "none",
        location: "Haji Ali Dargah"
      },
      {
        id: 3,
        title: "Mr. Heet Ruparel",
        subheading: "Technical Coordinator",
        image: "/team/webapp/profile-1.jpg",
        about: "Hakuna Matata",
        instagram: "heet.ruparel",
        linkedin: "heet-ruparel-8299ab25a",
        location: "Sanjay Gandhi National Park"
      },
      {
        id: 4,
        title: "Mr. Yash Patel",
        subheading: "Joint Technical Coordinator",
        image: "/team/webapp/profile-1.jpg",
        about: "Hakuna Matata",
        instagram: "_.yash37._",
        linkedin: "yash-patel-871926246",
        location: "Chhatrapati Shivaji Terminus"
      },

  ],
  treasurer: [
    {
        id: 1,
        title: "Mr. Yashkumar Jain",
        subheading: "Treasurer Secretary",
        image: "/team/webapp/profile-1.jpg",
        about: "Hakuna Matata",
        instagram: "_14yash_",
        linkedin: "yash-jain-60885a205",
        location: "Elephanta Caves"
      },
      {
        id: 2,
        title: "Mr. Diya Jain",
        subheading: "Treasurer Coordinator",
        image: "/team/webapp/profile-1.jpg",
        about: "Hakuna Matata",
        instagram: "diyajain_294",
        linkedin: "diya-jain-178a9024a",
        location: "Marine Drive"
      },
  ],
  celeb: [
    {
        id: 1,
        title: "Mr. Vinit Jain",
        subheading: "Celeb & Crisis Secretary",
        image: "/team/webapp/profile-1.jpg",
        about: "Hakuna Matata",
        instagram: "none",
        linkedin: "none",
        location: "Colaba"
      },
      {
        id: 2,
        title: "Mr. Abhay Jadhav",
        subheading: "Celeb & Crisis Coordinator",
        image: "/team/webapp/profile-1.jpg",
        about: "Hakuna Matata",
        instagram: "none",
        linkedin: "none",
        location: "Juhu Beach"
      },
  ],
  marathon: [
    {
        id: 1,
        title: "Mr. Tanish Nandu",
        subheading: "Marathon Secretary",
        image: "/team/webapp/profile-1.jpg",
        about: "Hakuna Matata",
        instagram: "tanish_nandu",
        linkedin: "tanish-nandu-524345237",
        location: "Gateway of India"
      },
      {
        id: 2,
        title: "Mr. Ashish Bangari",
        subheading: "Joint Marathon Secretary",
        image: "/team/webapp/profile-1.jpg",
        about: "Hakuna Matata",
        instagram: "none",
        linkedin: "none",
        location: "Bandra-Worli Sea Link"
      },
      {
        id: 3,
        title: "Ms. Anshita Jain",
        subheading: "Joint Marathon Secretary",
        image: "/team/webapp/profile-1.jpg",
        about: "Hakuna Matata",
        instagram: "butterscotch__07__09",
        linkedin: "none",
        location: "Haji Ali Dargah"
      },
  ],

};

const HeadsSection = ({ data }: { data: any[] }) => (
  <div className="mb-16">
    <h2 className="text-4xl font-bold text-white text-center mb-10">
      Festival Heads
    </h2>
    <div className="flex justify-center gap-8">
      {data.map((card) => (
        <TiltCard key={card.id} {...card} />
      ))}
    </div>
  </div>
);

const Section = ({ title, data }: { title: string; data: any[] }) => (
  <div className="mb-16">
    <h2 className="text-4xl font-bold text-white text-center mb-10">
      {title}
    </h2>
    {data.length <= 2 ? (
      <div className="flex justify-center gap-8">
        {data.map((card) => (
          <TiltCard key={card.id} {...card} />
        ))}
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((card) => (
          <TiltCard key={card.id} {...card} />
        ))}
      </div>
    )}
  </div>
);

const Example = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-indigo-500 to-violet-500 px-4 py-24">
      <div className="max-w-6xl mx-auto pt-8">
        <HeadsSection data={teamsData.heads} />
        <Section title="Cultural Team" data={teamsData.culturals} />
        <Section title="Off Stage Team" data={teamsData.offstage} />
        <Section title="On Stage Team" data={teamsData.onstage} />
        <Section title="Web & App Team" data={teamsData.webapp} />
        <Section title="Social Media Team" data={teamsData.socialmedia} />
        <Section title="Creativity Team" data={teamsData.creativity} />
        <Section title="Documentation Team" data={teamsData.documentation} />
        <Section title="Graphics Team" data={teamsData.graphics} />
        <Section title="Infrastructure Team" data={teamsData.infra} />
        <Section title="Ladies Representatives" data={teamsData.lr} />
        <Section title="Photography Team" data={teamsData.pap} />
        <Section title="Publicity Team" data={teamsData.publicity} />
        <Section title="Sponsorship Team" data={teamsData.sponsorship} />
        <Section title="Sports Team" data={teamsData.sports} />
        <Section title="Technical Team" data={teamsData.technical} />
        <Section title="Treasury Team" data={teamsData.treasurer} />
        <Section title="Celebrity & Crisis Team" data={teamsData.celeb} />
        <Section title="Marathon Team" data={teamsData.marathon} />
      </div>
    </div>
  );
};

interface TiltCardProps {
  title: string;
  subheading: string;
  image: string;
  about: string;
  instagram: string;
  linkedin: string;
  location: string;
}

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const TiltCard = ({ title, subheading, image, about, instagram, linkedin, location }: TiltCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${y}deg)`;
  const mouseTransform = useMotionTemplate`perspective(1000px) rotateX(${xSpring}deg) rotateY(${ySpring}deg) scale(1.05)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || isFlipped) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    if (!isFlipped) {
      x.set(0);
      y.set(0);
    }
  };

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      className="relative h-96 w-72 group" 
      style={{ perspective: "1000px" }}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        onClick={toggleFlip}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transform: isFlipped ? undefined : mouseTransform,
        }}
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 40,
          mass: 1,
        }}
        className="w-full h-full"
      >
        {/* Front of card */}
        <motion.div
          className="absolute w-full h-full rounded-3xl bg-gradient-to-br from-indigo-300 to-violet-300 shadow-xl"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div className="absolute inset-4 rounded-3xl overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${image}')` }}
            />
            <div 
              className="absolute bottom-0 left-0 right-0 flex flex-col items-start justify-end p-6 text-white"
              style={{
                background: "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2))",
              }}
            >
              <h2 className="text-3xl font-bold mb-1">{title}</h2>
              <p className="text-sm opacity-90">{subheading}</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity rounded-3xl" />
        </motion.div>

{/* Back of card */}
<motion.div
          className="absolute w-full h-full rounded-xl overflow-hidden shadow-xl"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            rotateY: "180deg",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-200 via-red-300 to-red-400">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:16px_16px]" />
          </div>

          <div className="relative h-full p-6 flex flex-col">
            <div className="flex-1 rounded-xl bg-white/20 backdrop-blur-sm p-5 shadow-lg border border-white/30">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-red-900 drop-shadow-md">About</h3>
                <p className="text-red-900/90 text-xs leading-relaxed backdrop-blur-sm bg-white/10 rounded-lg p-3 shadow-inner">
                  {about}
                </p>
                <div className="mt-4">
                  <h3 className="text-xl font-bold text-red-900 drop-shadow-md">♥ 🗺 in Mumbai</h3>
                  <p className="text-red-900/90 text-xs leading-relaxed backdrop-blur-sm bg-white/10 rounded-lg p-3 shadow-inner mt-2">
                    {location}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 mt-4">
              <div className="grid grid-cols-2 gap-3">
                <motion.a 
                  href={`https://instagram.com/${instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-white py-2.5 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
                >
                  <FiInstagram className="text-lg" />
                  Instagram
                </motion.a>
                <motion.a 
                  href={`https://linkedin.com/in/${linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-2.5 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
                >
                  <FiLinkedin className="text-lg" />
                  LinkedIn
                </motion.a>
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                className="w-full bg-red-300/20 backdrop-blur-sm text-red-900 border border-red-300/30 py-2.5 rounded-lg hover:bg-red-300/30 transition-colors shadow-lg font-medium"
              >
                Flip Back
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Example;