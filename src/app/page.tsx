import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Image src="/images/nextjs.png" alt="Next.js" width={200} height={200} />
    </div>
  );
}
