import banner from "../../assets/banner_4.png";

const MovieHeroSection = () => {
  return (
    <section className="relative h-[70vh] w-full">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

      

      <div className="relative z-10 flex h-full items-center px-12">
        <div className="max-w-xl space-y-4">
          <h1 className="text-5xl font-bold">Spider Man</h1>

          <p className="text-gray-300">In the multiverse</p>

          <div className="flex gap-4">
            <button className="bg-red-600 px-6 py-2 rounded hover:bg-red-700">
              ▶ Play
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieHeroSection;
