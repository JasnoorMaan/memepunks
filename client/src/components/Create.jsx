import React, { useState } from "react";

const Create = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [meme, setMeme] = useState({
    url: "",
    title: "",
    tags: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  };
  return (
    <>
      <section className="min-h-screen bg-cyberblack flex items-center justify-center p-8 pt-24">
        <div className="w-full max-w-2xl">
          <h1
            className="text-4xl text-cyberyellow orbitron mb-8 text-center text-glitch"
            data-text="CREATE MEME"
          >
            Create a Meme
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-cyberpink mb-2 orbitron">
              MEME TITLE
            </label>
            <input
              type="text"
              value={meme.title}
              onChange={(e) => setMeme({ ...meme, title: e.target.value })}
              className="w-full px-6 py-3 bg-black/50 border-2 border-cyberyellow/30 text-white rounded focus:border-cyberyellow focus:outline-none transition-colors"
              placeholder="Enter your epic meme title..."
              required
            />
          </div>

          <div>
            <label className="block text-cyberpink mb-2 orbitron">
              IMAGE URL (optional)
            </label>
            <input
              type="url"
              value={meme.url}
              onChange={(e) => setMeme({ ...meme, url: e.target.value })}
              className="w-full px-4 py-3 bg-black/50 border-2 border-cyberyellow/30 text-white rounded focus:border-cyberyellow focus:outline-none transition-colors"
              placeholder="https://example.com/meme.jpg (leave empty for random)"
            />
          </div>
          <div>
            <label className="block text-cyberpink mb-2 orbitron">TAGS</label>
            <input
              type="text"
              value={meme.tags}
              onChange={(e) => setMeme({ ...meme, tags: e.target.value })}
              className="w-full px-4 py-3 bg-black/50 border-2 border-cyberyellow/30 text-white rounded focus:border-cyberyellow focus:outline-none transition-colors"
              placeholder="crypto, funny, stonks (comma separated)"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-cyberpink to-cyberyellow text-black font-bold text-lg orbitron rounded hover:opacity-80 transition-opacity disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "UPLOADING TO MATRIX..." : "DEPLOY MEME"}{" "}
          </button>
        </form>
      </section>
    </>
  );
};

export default Create;
