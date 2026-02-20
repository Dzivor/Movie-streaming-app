import banner from "@/assets/banner_1.png";

const HeroSection = () => {
  return (
    <section
      className="relative h-screen w-full flex items-center px-4 md:px-16 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${banner})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl space-y-6">
        {/* categories */}
        <div className="flex gap-3 text-sm">
          <span className="px-3 py-1 bg-gray-800/60 rounded-full">Fantasy</span>
          <span className="px-3 py-1 bg-gray-800/60 rounded-full">Drama</span>
          <span className="px-3 py-1 bg-gray-800/60 rounded-full">Mystery</span>
        </div>

        {/*Tile */}
        <h2 className="text-6xl md:text-7xl font-bold tracking-wide">
          SPIDER MAN
        </h2>

        {/*subtitle */}
        <p className="text-gray-300 text-lg">
          {" "}
          S4E1 . In the multiverse of madness
        </p>
        {/*button */}
        <div className="flex gap-4 mt-4">
          <button className="bg-red-600 px-6 py-3 rounded-full hover:bg-red-700 transition">
            Watch Now
          </button>
        </div>
        <button className="border border-gray-500 px-6 py-3 rounded-full hover:bg-gray-800 transition">
          Details
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
