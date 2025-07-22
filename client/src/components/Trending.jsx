import React, { useState, useEffect } from "react";
import Card from "./Card";
import { useTrending } from "../hooks/useMemes";

const Trending = () => {
  const { trending: initialTrending, loading, error } = useTrending();
  const [trending, setTrending] = useState([]);
  useEffect(() => {
    setTrending(initialTrending);
  }, [initialTrending]);

  const handleMemeUpdate = (memeId, updates) => {
    setTrending((prevTrending) =>
      prevTrending.map((meme) =>
        meme.id === memeId ? { ...meme, ...updates } : meme
      )
    );
  };
  if (loading) {
    return (
      <section className="bg-cyberblack min-h-screen flex items-center justify-center">
        <div className="text-cyberyellow orbitron text-2xl">LOADING...</div>
      </section>
    );
  }
  if (error) {
    return (
      <section className="bg-cyberblack min-h-screen flex items-center justify-center">
        <div className="text-red-500 orbitron text-xl">
          Error: {error.message}
        </div>
      </section>
    );
  }
  return (
    <>
      <section className="bg-cyberblack min-h-screen flex flex-col items-center justify-center">
        <h1
          className="orbitron text-cyberyellow text-4xl mb-12 mt-16 p-4 text-center glitch"
          data-text="TRENDING MEMES"
        >
          TRENDING MEMES
        </h1>
        <section className="flex flex-wrap gap-4 flex-col md:flex-row justify-center items-center">
          {trending.map((meme) => (
            <Card key={meme.id} meme={meme} onMemeUpdate={handleMemeUpdate} />
          ))}
        </section>
      </section>
    </>
  );
};

export default Trending;
