"use client";

const Info = () => {
  return (
    <>
      <section className="bg-cyberblack min-h-screen py-16 px-4 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* heading */}
          <div className="text-center mb-16 md:mb-24">
            <h1
              className="text-glitch cyber-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-cyberyellow mb-6 font-black tracking-wider"
              data-text="YOUR MEME MARKETPLACE"
            >
              YOUR MEME MARKETPLACE
            </h1>
            <div className="h-1 bg-gradient-to-r from-transparent via-cyberpink to-transparent animate-pulse"></div>
            <p className="cyber-body text-white/80 mt-6 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              Welcome to the{" "}
              <span className="text-cyberpink font-bold">
                ultimate digital arena
              </span>{" "}
              where creativity meets chaos. Generate, trade, and dominate the
              meme economy in our cyberpunk marketplace.
            </p>
          </div>

          {/* Three cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyberpink/20 to-cyberyellow/10 rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
              <div className="relative bg-cyberblack border border-cyberpink/50 hover:border-cyberpink transition-all duration-300 rounded-lg p-6 h-full">
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyberyellow"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyberyellow"></div>

                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-cyberpink/20 border border-cyberpink rounded-lg flex items-center justify-center text-2xl">
                    🎨
                  </div>
                </div>

                <h2 className="cyber-subtitle text-xl md:text-2xl text-cyberpink text-center mb-4 font-bold">
                  CREATE OR GENERATE
                </h2>
                <p className="cyber-body text-white/90 text-center leading-relaxed">
                  Unleash your creativity or let our{" "}
                  <span className="text-cyberyellow font-bold">
                    AI overlords
                  </span>{" "}
                  generate memes for you! From dank to legendary, we've got the
                  tools for digital domination.
                </p>
                <div className="flex justify-center mt-6">
                  <div className="flex items-center gap-2 text-xs text-cyberyellow">
                    <div className="w-2 h-2 bg-cyberyellow rounded-full animate-pulse"></div>
                    NEURAL NET ACTIVE
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyberyellow/20 to-cyberpink/10 rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
              <div className="relative bg-cyberblack border border-cyberyellow/50 hover:border-cyberyellow transition-all duration-300 rounded-lg p-6 h-full">
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyberpink"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyberpink"></div>

                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-cyberyellow/20 border border-cyberyellow rounded-lg flex items-center justify-center text-2xl">
                    🔥
                  </div>
                </div>

                <h2 className="cyber-subtitle text-xl md:text-2xl text-cyberyellow text-center mb-4 font-bold">
                  VIRAL TRENDING ZONE
                </h2>
                <p className="cyber-body text-white/90 text-center leading-relaxed">
                  Rise through the ranks and claim your spot in the{" "}
                  <span className="text-cyberpink font-bold">
                    trending algorithm
                  </span>
                  . Community likes fuel the chaos engine that determines meme
                  royalty.
                </p>

                <div className="flex justify-center mt-6">
                  <div className="flex items-center gap-2 text-xs text-cyberpink">
                    <div className="w-2 h-2 bg-cyberpink rounded-full animate-pulse"></div>
                    VIRAL PROTOCOL ACTIVE
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative md:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-cyberyellow/10 to-cyberpink/20 rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
              <div className="relative bg-cyberblack border border-white/30 hover:border-white/50 transition-all duration-300 rounded-lg p-6 h-full">
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyberyellow"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyberpink"></div>

                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-white/10 border border-white/30 rounded-lg flex items-center justify-center text-2xl">
                    💰
                  </div>
                </div>

                <h2 className="cyber-subtitle text-xl md:text-2xl text-white text-center mb-4 font-bold">
                  DIGITAL AUCTION HOUSE
                </h2>
                <p className="cyber-body text-white/90 text-center leading-relaxed">
                  Watch the{" "}
                  <span className="text-cyberyellow font-bold">
                    cyber credits
                  </span>{" "}
                  flow as the community battles for your legendary content. Your
                  creativity has{" "}
                  <span className="text-cyberpink font-bold">real worth</span>{" "}
                  in the neon marketplace.
                </p>

                <div className="flex justify-center mt-6">
                  <div className="flex items-center gap-2 text-xs text-white">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    MARKET EXCHANGE ONLINE
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="mt-16 md:mt-24">
            <div className="h-px bg-gradient-to-r from-transparent via-cyberpink to-transparent"></div>
            <div className="text-center mt-6">
              <p className="cyber-caption text-white/60 text-sm">
                &gt; ENTER THE MATRIX OF MEMES &lt;
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Info;
