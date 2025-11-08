import Navbar from "./Navbar";

export default function Hero() {
  return (
    <div className="bg-[url('/heroBg.svg')] w-full h-screen bg-no-repeat bg-cover">
      <Navbar />
    </div>
  );
}
