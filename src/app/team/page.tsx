"use client"

import React, { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { FiInstagram, FiLinkedin } from "react-icons/fi";


interface TeamMember {
  id: number;
  title: string;
  subheading: string;
  image: string;
  about: string;
  instagram: string;
  linkedin: string;
  location: string;
}

const teamsData = {
  heads: [
    {
      id: 1,
      title: "Mr. Umang Jain",
      subheading: "General Secretary",
      image: "/team/festhead/umangjain.webp",
      rectangleImage: "/team/festhead/umangj.webp",
      about: "Ek scheme hai boss",
      instagram: "",
      linkedin: "umang-jain-a52264246",
      location: "Marine Drive"
    },
    {
      id: 2,
      title: "Mr. Harsh Jain",
      subheading: "General Coordinator",
      image: "/team/festhead/harshJ.webp",
      about: "My life begins with 5...6... and ends with 7...8... dancing through my tech, chaos, and passion.",
      instagram: "harshjain",
      linkedin: "no data",
      location: "Colaba"
    },
  ],
  culturals: [
    {
      id: 1,
      title: "Mr. Aaradhya Bharat",
      subheading: "Cultural Secretary",
      image: "/team/cultural/aaradhya.webp",
      about: "A sports junkie by day, a guitar-strumming rockstar by night, and your Cultural Secretary 24/7 , keeping the vibe alive and the energy higher. ",
      instagram: "aaradhya.17",
      linkedin: "aaradhya-bahirat-045a54311",
      location: "Juhu Beach"
    },
    {
      id: 2,
      title: "Ms. Annanya Gupta",
      subheading: "Cultural Coordinator",
      image: "/team/cultural/annanya.webp",
      about: "A curious mind with a passion for exploring stories, flavors, and places around the world.",
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
      image: "/team/offstage/jitu.webp",
      about: "Moj masti rukni nai chaiye ",
      instagram: "jiitzz",
      linkedin: "none",
      location: "Bandra-Worli Sea Link"
    },
    {
      id: 2,
      title: "Mr. Rahul Jana",
      subheading: "Off-Stage Coordinator",
      image: "/team/offstage/rahul.webp",
      about: "Come let's climb some mountains.",
      instagram: "rahul_jana_0905",
      linkedin: "rahul-jana-585534236",
      location: "Fort, Colaba"
    },
    {
      id: 3,
      title: "Mr. Kaushal Patel",
      subheading: "Off-stage Coordinator",
      image: "/team/offstage/kaushal.webp",
      about: "Forged by challenges, driven by purpose, and unstoppable in the pursuit of success.",
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
      image: "/team/onstage/vinod.webp",
      about: "Brooklyn 99 S:4 Ep:13",
      instagram: "__maybe__vinod__",
      linkedin: "none",
      location: "Chhatrapati Shivaji Terminus"
    },
    {
      id: 2,
      title: "Ms. Nityaa Bhanushali",
      subheading: "On-Stage Coordinator",
      image: "/team/onstage/nitya.webp",
      about: "I am a very fun loving and lively soul who finds joy in dance, solace in books, and peace in nature.",
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
        image: "/team/socialmedia/krishgala.webp",
        about: "Who needs her, when likes and comments flood your notifications, at least they don’t break your heart!”",
        instagram: "galakrish02",
        linkedin: "krishgala2",
        location: "Marine Drive"
      },
      {
        id: 2,
        title: "Mr.Saish Dalvi",
        subheading: "Social Media Coordinator",
        image: "/team/socialmedia/saish.webp",
        about: "The technical team is notifying me—good conditions are coming to Instagram! Time to upload a reel!",
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
      image: "/team/webapp/ankit.webp",
      about: "Leading web and app development.",
      instagram: "ankit",
      linkedin: "ankitdas",
      location: "Juhu Beach"
    },
    {
        id: 2,
        title: "Mr. Pradnesh Revadekar",
        subheading: "Web & App Coordinator",
        image: "/team/webapp/profile-2.webp",
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
        image: "/team/creativity/aditya.webp",
        about: "A tech-savvy artist shaping creative excellence at every opportunity.",
        instagram: "__im_aditya.__",
        linkedin: "aditya-dangat-29a119234",
        location: "Bandra-Worli Sea Link"
      },
      {
        id: 2,
        title: "Ms. Resha Naik",
        subheading: "Creativity Coordinator",
        image: "/team/creativity/resha.webp",
        about: "Turning stress into steps and deadlines into designs!",
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
        image: "/team/documentation/shreya.webp",
        about: "Everything you do comes back to you💫",
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
        image: "/team/graphics/diya.webp",
        about: "just a slay queen doing her thing in SC-25 💅",
        instagram: "none",
        linkedin: "none",
        location: "Cuffe parade"
      },
      {
        id: 2,
        title: "Mr. Danvirsinh Jadeja",
        subheading: "GFX and VFX Secretary",
        image: "/team/graphics/danvir.webp",
        about: "no data",
        instagram: "none",
        linkedin: "none",
        location: "Elephanta Caves"
      },
      {
        id: 3,
        title: "Mr. Pranav Jani",
        subheading: "GFX and VFX Coordinator",
        image: "/team/graphics/pranav.webp",
        about: "Exploring new dimensions through immersive AR experiences and interactive technology.",
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
        image: "/team/infra/ayur.webp",
        about: "If you can't convince then confuse",
        instagram: "ayurshah13",
        linkedin: "none",
        location: "Colaba"
      },
      {
        id: 2,
        title: "Mr. Amey Parab",
        subheading: "Infra and Security Coordinator",
        image: "/team/infra/Amey Parab - AMEY JAYESH PARAB.webp",
        about: "Improving day-by-day even if it is little as 1%",
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
        image: "/team/lr/IMG-20241003-WA0018 - BHAKTI PRADIP DHURI.webp",
        about: "Chaos coordinator with a talent for making life an unpredictable adventure, fueled by caffeine and curiosity! ",
        instagram: "bhakti_dhurii",
        linkedin: "none",
        location: "Gateway of India"
      },
      {
        id: 2,
        title: "Ms. Moxita Shah",
        subheading: "Ladies Representative",
        image: "/team/lr/moxita.webp",
        about: "Walking the fine line between elegance and rebellion, I lead with heart, grit, and vision.",
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
        image: "/team/pap/aniket.webp",
        about: "Turning moments into memories ",
        instagram: "aniketgursale_28",
        linkedin: "aniketgursale",
        location: "Haji Ali Dargah"
      },
      {
        id: 1,
        title: "Mr. Rohan Koyande",
        subheading: "Photography Coodinator",
        image: "/team/pap/rohan.webp",
        about: "I do photography. ",
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
        image: "/team/publicity/nida.webp",
        about: "An ambitious fellow with a way with people and words. ",
        instagram: "none",
        linkedin: "nida-malik-84b220232",
        location: "Chhatrapati Shivaji Terminus"
      },
      {
        id: 2,
        title: "Mr. Siddhant Mavani",
        subheading: "Publicity Coordinator",
        image: "/team/publicity/sid.webp",
        about: "An ambitious, detail-oriented innovator and problem-solver, constantly striving to achieve impactful results.",
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
        about: "Trailblazing second-year Sponsorship Secretary, securing partnerships, inspiring peers, and leaving a lasting legacy.",
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
        image: "/team/sports/kartik.webp",
        about: "Nyctophilia",
        instagram: "kartik.tandekar",
        linkedin: "none",
        location: "carter"
      },
      {
        id: 2,
        title: "Ms. Sanika Tajane ",
        subheading: "Sports Secretary",
        image: "/team/sports/sanika.jpeg",
        about: "I'm a  volleyball player who spikes on the court and panics off it. A topper who’s always late but somehow always on point. Chaos might follow me, but I still ace it every time!",
        instagram: "sanikatajane_11",
        linkedin: "sanika-tajane-7a843a247",
        location: "Juhu Beach"
      },
      {
        id: 3,
        title: "Mr. Vedant Gharat",
        subheading: "Sports Coordinator",
        image: "/team/sports/vedantgharat.jpg",
        about: "Fueled by sports, led by passion, and inspired to make a difference.",
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
        image: "/team/technical/udit.webp",
        about: "Waqt ke saath badalta nahi, balki waqt ko apne saath badalne ka hunar rakhta hoon.",
        instagram: "ankit",
        linkedin: "ankitdas",
        location: "Bandra-Worli Sea Link"
      },
      {
        id: 2,
        title: "Mr. Siddhart Gugaliya",
        subheading: "Technical Coordinator",
        image: "/team/technical/sidhart.webp",
        about: "Hakuna Matata",
        instagram: "none",
        linkedin: "none",
        location: "Haji Ali Dargah"
      },
      {
        id: 3,
        title: "Mr. Heet Ruparel",
        subheading: "Technical Coordinator",
        image: "/team/technical/heet.webp",
        about: "A dedicated Technical Coordinator ensuring efficient workflows, team collaboration, and successful project outcomes.",
        instagram: "heet.ruparel",
        linkedin: "heet-ruparel-8299ab25a",
        location: "Sanjay Gandhi National Park"
      },
      {
        id: 4,
        title: "Mr. Yash Patel",
        subheading: "Joint Technical Coordinator",
        image: "/team/technical/yashpatel.webp",
        about: "Running the show, breaking the rules, and redefining what’s possible.",
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
        image: "/team/treasurer/yashjain.webp",
        about: "Managing the budget is a challenge, especially with everyone treating money as if it's just paper growing on trees.",
        instagram: "_14yash_",
        linkedin: "yash-jain-60885a205",
        location: "Elephanta Caves"
      },
      {
        id: 2,
        title: "Mr. Diya Jain",
        subheading: "Treasurer Coordinator",
        image: "/team/treasurer/diya.webp",
        about: "Beautiful chaos wrapped in curiosity.",
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
        image: "/team/webapp/profile-1.webp",
        about: "Hakuna Matata",
        instagram: "none",
        linkedin: "none",
        location: "Colaba"
      },
      {
        id: 2,
        title: "Mr. Abhay Jadhav",
        subheading: "Celeb & Crisis Coordinator",
        image: "/team/webapp/profile-1.webp",
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
        image: "/team/marathon/tanish.webp",
        about: "I am just a Chill guy who owns the race!!",
        instagram: "tanish_nandu",
        linkedin: "tanish-nandu-524345237",
        location: "Gateway of India"
      },
      {
        id: 2,
        title: "Mr. Ashish Bangari",
        subheading: "Joint Marathon Secretary",
        image: "/team/webapp/profile-1.webp",
        about: "Hakuna Matata",
        instagram: "none",
        linkedin: "none",
        location: "Bandra-Worli Sea Link"
      },
      {
        id: 3,
        title: "Ms. Anshita Jain",
        subheading: "Joint Marathon Secretary",
        image: "/team/marathon/anshita.webp",
        about: "Unfiltered? Yes Sorry? No",
        instagram: "butterscotch__07__09",
        linkedin: "none",
        location: "Haji Ali Dargah"
      },
  ],
  extended: [
    {
        id: 1,
        title: "Mr. Yash Tupat",
        subheading: "Extended Council",
        image: "/team/technical/Yash Tupat - YASH KISHOR TUPAT.webp",
        about: "Light Camera Action ",
        instagram: "misox_30",
        linkedin: "yash-kishor-tupat-34711b232",
        location: "Dadar"
      },
      {
        id: 2,
        title: "Mr. Aarush Palsamkar",
        subheading: "Extended Council",
        image: "/team/webapp/profile-1.webp",
        about: "I never wish to be easily defined  ",
        instagram: "_.aaru5h",
        linkedin: "aarush-palsamkar-62631028b",
        location: "Jehangir Art gallery"
      },
  ]
};

const HeadsSection = ({ data }: { data: TeamMember[] }) => (
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

const Section = ({ title, data }: { title: string; data: TeamMember[] }) => (
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
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden px-4 py-24">
      {/* Sparks effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[200px] h-[200px] bg-white opacity-10 rounded-full blur-3xl top-10 left-10 animate-pulse" />
        <div className="absolute w-[300px] h-[300px] bg-purple-700 opacity-20 rounded-full blur-3xl bottom-10 right-20 animate-pulse" />
        <div className="absolute w-[150px] h-[150px] bg-blue-500 opacity-20 rounded-full blur-3xl bottom-20 left-20 animate-pulse" />
      </div>
      <div className="max-w-6xl mx-auto pt-8 relative z-10">
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
  const [isLoading, setIsLoading] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

  const transform = useMotionTemplate`perspective(1000px) rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

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
      className="relative h-[24rem] w-[20rem] group"
      style={{ perspective: "1000px" }}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={toggleFlip}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : transform,
        }}
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 50,
          duration: 0.8,
        }}
        className="w-full h-full"
      >
        {/* Front of card */}
        <motion.div
          className="absolute w-full h-full rounded-6xl bg-gradient-to-br from-purple-500 via-purple-600 to-purple-800 shadow-lg overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            border: "8px solid",
            borderImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1%, transparent 1%) 1",
            borderImageSlice: "1",
            backgroundClip: "border-box",
            boxShadow: "0 0 8px rgba(255,255,255,0.5)",
          }}
        >
          {/* Small Dots Animation */}
          {isLoading && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 1, scale: 1 }}
              animate={{
                opacity: [1, 0.5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
              }}
              onAnimationComplete={() => setIsLoading(false)}
              style={{
                background: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.3) 1px, transparent 0)`,
                backgroundSize: "16px 16px",
              }}
            />
          )}
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${image}')` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoading ? 0 : 1 }}
            transition={{ duration: 0.5 }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 flex flex-col items-start justify-end p-4 text-white"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2))",
            }}
          >
            <h2 className="text-2xl font-bold truncate">{title}</h2>
            <p className="text-xs opacity-90 truncate">{subheading}</p>
          </div>
        </motion.div>

{/* Back of card */}
<motion.div
          className="absolute w-full h-full rounded-2xl bg-gradient-to-br from-purple-700 via-purple-800 to-purple-900 shadow-lg"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            border: "8px solid",
            borderImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1%, transparent 1%) 1",
            borderImageSlice: "1",
            backgroundClip: "border-box",
            boxShadow: "0 0 8px rgba(255,255,255,0.5)",
          }}
        >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] [background-size:16px_16px]" />
          <div className="relative h-full p-4 flex flex-col">
            <div className="flex-1 rounded-md bg-white/10 backdrop-blur-md p-4 shadow-lg border border-white/20">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white drop-shadow-md">About</h3>
                <p className="text-white/90 text-sm leading-relaxed backdrop-blur-sm bg-white/10 rounded-lg p-2 shadow-inner overflow-hidden">
                  {about}
                </p>
                <div className="mt-4">
                  <h3 className="text-lg font-bold text-white drop-shadow-md">♥ 🗺 in Mumbai</h3>
                  <p className="text-white/90 text-sm leading-relaxed backdrop-blur-sm bg-white/10 rounded-lg p-2 shadow-inner mt-2 overflow-hidden">
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
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-white py-2 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
                >
                  <FiInstagram className="text-lg" />
                  Instagram
                </motion.a>
                <motion.a
                  href={`https://linkedin.com/in/${linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-2.5 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
                >
                  <FiLinkedin className="text-lg" />
                  LinkedIn
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Example;