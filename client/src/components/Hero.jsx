import { useState, useEffect } from "react";
import SplineScene from "./Spline";
import { Link } from "react-router";

const textSequence = [
  "AI-POWERED MEMES",
  "REAL-TIME BIDDING",
  "CYBER CREDITS",
  "LEGENDARY CONTENT",
  "GEMINI AI CAPTIONS",
  "NEON MARKETPLACE",
];

const Hero = () => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typeIndex, setTypeIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const current = textSequence[typeIndex];

        if (!isDeleting) {
          setCurrentText(current.substring(0, currentIndex + 1));
          setCurrentIndex((prev) => prev + 1);

          if (currentIndex + 1 === current.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setCurrentText(current.substring(0, currentIndex - 1));
          setCurrentIndex((prev) => prev - 1);

          if (currentIndex === 0) {
            setIsDeleting(false);
            setTypeIndex((prev) => (prev + 1) % textSequence.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, typeIndex]);

  return (
    <>
      <section className="relative h-screen w-full overflow-hidden">
        <SplineScene />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40 z-10"></div>
        {/* Ticker */}
        <div className="absolute inset-0 z-20 p-8">
          <div className="absolute bottom-20 md:bottom-32 left-2">
            <div className="cyber-subtitle text-lg md:text-2xl text-white flex items-center mb-4">
              <span className="mr-2 text-cyberyellow">&gt;</span>
              <span className="text-cyberpink">{currentText}</span>
              <span className="text-cyberyellow animate-pulse">|</span>
            </div>
          </div>

          {/* faaltu stats */}
          <div className="absolute bottom-85 right-12 md:bottom-32 md:right-8 flex gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-cyberyellow">420+</div>
              <div className="text-xs text-white/80 uppercase tracking-wider">
                CYBER MEMES
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-cyberpink">69K</div>
              <div className="text-xs text-white/80 uppercase tracking-wider">
                DAILY TRADES
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">∞</div>
              <div className="text-xs text-white/80 uppercase tracking-wider">
                CHAOS LEVEL
              </div>
            </div>
          </div>
          {/* Buttons */}
          <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 flex flex-col sm:flex-row gap-6 items-center">
            <Link to="/create">
              <button
                // onClick={() => onNavigate("create")}
                className="svg-button"
              >
                CREATE MEME
              </button>
            </Link>
            <Link to="market">
              <button className="px-6 py-3 border-2 border-cyberyellow text-cyberyellow hover:bg-cyberyellow hover:text-black transition-all duration-300 orbitron font-bold uppercase tracking-wider">
                VIEW MARKETPLACE
              </button>
            </Link>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-15">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyberpink/30 to-transparent animate-pulse"></div>
          <div className="absolute top-2/4 right-0 w-full h-px bg-gradient-to-r from-transparent via-cyberyellow/30 to-transparent animate-pulse"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyberpink/30 to-transparent animate-pulse"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 overflow-hidden pointer-events-none z-15">
          <div className="text-cyberyellow/30 text-xs font-mono whitespace-nowrap animate-scroll">
            01001000 01000001 01000011 01001011 00100000 01010100 01001000
            01000101 00100000 01001101 01000101 01001101 01000101 00100000
            01001101 01000001 01010100 01010010 01001001 01011000
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
