"use client";

import Image from "next/image";

const GroupPhotoSection = ({ title, photoSrc }: { title: string; photoSrc: string }) => {
  return (
    <div className="mb-16 text-center">
      <h2 className="text-4xl font-bold text-white mb-6 drop-shadow-md">{title}</h2>
      <div className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
        <Image
          src={photoSrc}
          alt={`${title} Group Photo`}
          layout="responsive"
          width={1600}
          height={900}
          className="object-cover"
        />
      </div>
    </div>
  );
};

const teams = [
  { title: "Web & App Team", photoSrc: "/team/extended/web-app.webp" },
  { title: "Design Team", photoSrc: "/team/design-group-photo.webp" },
  { title: "Marketing Team", photoSrc: "/team/marketing-group-photo.webp" },
  { title: "Operations Team", photoSrc: "/team/operations-group-photo.webp" },
  { title: "Logistics Team", photoSrc: "/team/logistics-group-photo.webp" },
];

const Example = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden px-4 py-12 sm:py-24">
      <div className="max-w-7xl mx-auto pt-8 relative z-10">
        {teams.map((team, index) => (
          <GroupPhotoSection key={index} title={team.title} photoSrc={team.photoSrc} />
        ))}
      </div>
    </div>
  );
};

export default Example;
