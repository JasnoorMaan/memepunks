import React, { useState, useEffect } from "react";
import Card from "./Card";
import { useMemes } from "../hooks/useMemes";

const Market = () => {
  const { memes: initialMemes, loading, error } = useMemes();
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    setMemes(initialMemes);
  }, [initialMemes]);

  const handleMemeUpdate = (memeId, updates) => {
    setMemes((prevMemes) =>
      prevMemes.map((meme) =>
        meme.id === memeId ? { ...meme, ...updates } : meme
      )
    );
  };
  if (loading) {
    return (
      <section className="bg-cyberblack min-h-screen flex items-center justify-center">
        <div className="text-cyberyellow orbitron text-2xl">
          LOADING MARKETPLACE...
        </div>
      </section>
    );
  }
  if (error) {
    <section className="bg-cyberblack min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-cyberpink orbitron text-xl mb-4">
          Error loading marketplace
        </div>
        <div className="text-cyberyellow text-lg">{error.message}</div>
      </div>
    </section>;
  }

  return (
    <>
      <section className="bg-cyberblack min-h-screen flex flex-col items-center justify-center">
        <h1
          className="orbitron text-cyberyellow text-4xl mb-12 mt-16 p-4 text-center glitch"
          data-text="MEME MARKETPLACE"
        >
          MEME MARKETPLACE
        </h1>

        {memes.length === 0 ? (
          <div className="text-center">
            <div className="text-cyberpink orbitron text-xl mb-4">
              No memes found in the Matrix
            </div>
            <div className="text-cyberyellow text-lg">
              Be the first to deploy a meme!
            </div>
          </div>
        ) : (
          <section className="flex flex-wrap gap-4 flex-col md:flex-row justify-center items-center">
            {memes.map((meme) => (
              <Card key={meme.id} meme={meme} onMemeUpdate={handleMemeUpdate} />
            ))}
          </section>
        )}
      </section>
    </>
  );
};

export default Market;
