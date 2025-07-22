import React, { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { memeService, handleAPIerror } from "../api/service";

const Create = () => {
  const { isAuthenticated } = useAuth();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [meme, setMeme] = useState({
    imageUrl: "",
    title: "",
    tags: "",
    startingPrice: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const imageUrl =
        meme.imageUrl ||
        "https://via.placeholder.com/400x400?text=Your+Meme+Here";
      const memeData = {
        title: meme.title,
        imageUrl: imageUrl,
        tags: meme.tags,
        startingPrice: parseFloat(meme.startingPrice),
      };
      await memeService.createMeme(memeData);
      setSuccess("Meme deployed to the Matrix successfully! 🚀");
      // Reset form
      setMeme({
        imageUrl: "",
        title: "",
        tags: "",
        startingPrice: 1,
      });
    } catch (err) {
      const errorInfo = handleAPIerror(err);
      setError(errorInfo.message);
    } finally {
      setLoading(false);
    }
  };
  if (!isAuthenticated) {
    return (
      <section className="min-h-screen bg-cyberblack flex items-center justify-center p-8 pt-24">
        <div className="w-full max-w-2xl">
          <h1 className="text-cyberyellow orbitron text-4xl text-center">
            ACCESS DENIED
          </h1>
          <p className="text-cyberpink orbitron text-lg text-center">
            Please sign in to create memes
          </p>
          <div className="flex justify-center">
            <Link
              to="/signin"
              className="svg-button-sm bg-cyberpink text-black hover:bg-cyberyellow transition-colors"
            >
              SIGN IN
            </Link>
          </div>
        </div>
      </section>
    );
  }
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
          {success && (
            <div className="mb-6 p-4 bg-green-500/20 border-2 border-green-500/50 rounded text-green-400 text-center">
              {success}
            </div>
          )}
          {error && (
            <div className="mb-6 p-4 bg-cyberpink/20 border-2 border-cyberpink/50 rounded text-cyberpink text-center">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-cyberpink mb-2 orbitron">
                MEME TITLE *
              </label>
              <input
                type="text"
                value={meme.title}
                onChange={(e) => setMeme({ ...meme, title: e.target.value })}
                className="w-full px-6 py-3 bg-black/50 border-2 border-cyberyellow/30 text-white rounded focus:border-cyberyellow focus:outline-none transition-colors"
                placeholder="Enter your epic meme title..."
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-cyberpink mb-2 orbitron">
                IMAGE URL *
              </label>
              <input
                type="url"
                value={meme.imageUrl}
                onChange={(e) => setMeme({ ...meme, imageUrl: e.target.value })}
                className="w-full px-4 py-3 bg-black/50 border-2 border-cyberyellow/30 text-white rounded focus:border-cyberyellow focus:outline-none transition-colors"
                placeholder="https://example.com/meme.jpg (leave empty for random)"
                required
                disabled={loading}
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
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-cyberpink mb-2 orbitron">
                STARTING PRICE in MPD (MemePunk Dollars) *
              </label>
              <input
                type="number"
                step="1"
                min="1"
                value={meme.startingPrice}
                onChange={(e) =>
                  setMeme({ ...meme, startingPrice: e.target.value })
                }
                className="w-full px-4 py-3 bg-black/50 border-2 border-cyberyellow/30 text-white rounded focus:border-cyberyellow focus:outline-none transition-colors"
                placeholder="10"
                required
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-cyberpink to-cyberyellow text-black font-bold text-lg orbitron rounded hover:opacity-80 transition-opacity disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "UPLOADING TO MATRIX..." : "DEPLOY MEME"}{" "}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Create;
