import Marquee from "react-fast-marquee";

// 1. Create the local JSON data
const COMPANY_DATA = {
  total: 50,
  company_logos: [
    { id: 1, logo: "/wr1.jpeg" },
    { id: 2, logo: "/wr2.jpeg" },
    { id: 3, logo: "/wr3.jpeg" },
    { id: 4, logo: "/wr1.jpeg" },
    { id: 5, logo: "/wr2.jpeg" },
    { id: 6, logo: "/wr3.jpeg" },
    { id: 7, logo: "/wr1.jpeg" },
    { id: 8, logo: "/wr2.jpeg" },
    { id: 9, logo: "/wr3.jpeg" },
    { id: 10, logo: "/wr1.jpeg" },
    { id: 11, logo: "/wr2.jpeg" },
    { id: 12, logo: "/wr3.jpeg" },
  ],
};

export default function MarqueeSection() {
  return (
    <div className="py-6  bottom-0 w-full overflow-hidden bg-[#fafafa]">
      <div className="w-full h-full flex items-center justify-center flex-col relative">
        {/* Trusted By Badge */}

        {/* <h2 className="text-5xl md:text-6xl font-black text-title-2nd mb-6 tracking-tight">
          Brands who work with us
        </h2> */}
        <div className="relative w-full h-full group">
          {/* Left Fade Gradient */}
          <div className="w-20 md:w-48 h-full absolute top-0 left-0 bg-linear-to-r from-[#ffffff] to-transparent z-10"></div>

          <Marquee pauseOnHover={true} gradient={false} speed={60}>
            {COMPANY_DATA.company_logos.map((item) => (
              <img
                key={item.id}
                src={item.logo}
                alt={`company-logo-${item.id}`}
                className="h-10 md:h-14 mx-10 object-contain opacity-70 hover:opacity-100 transition-all duration-300"
              />
            ))}
          </Marquee>

          {/* Right Fade Gradient */}
          <div className="w-20 md:w-48 h-full absolute top-0 right-0 bg-linear-to-l from-[#ffffff] to-transparent z-10"></div>
        </div>
        <div
          className="w-fit h-fit px-6 py-2  rounded-full bg-main/80 border border-main mt-5"
          style={{
            boxShadow: "0 0px 30px rgba(255, 105, 180, 0.2)",
          }}
        >
          <p className="text-white font-semibold text-sm">
            Trusted By {COMPANY_DATA.total}+ Companies
          </p>
        </div>
      </div>
    </div>
  );
}
