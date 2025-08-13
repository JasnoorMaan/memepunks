import React, { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { memeService, handleAPIerror } from "../api/service";
import AIMemeModal from "./AIMemeModal";

const Create = () => {
  const { isAuthenticated } = useAuth();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [aiResult, setAiResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [meme, setMeme] = useState({
    title: "",
    tags: "",
    startingPrice: 10,
  });

  const handleAISubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError("Please enter a meme description");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await memeService.generateMemeWithAI(prompt);
      setAiResult(response.data);
      setShowModal(true);
    } catch (err) {
      const errorInfo = handleAPIerror(err);
      setError(errorInfo.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (!prompt.trim()) return;

    setIsRegenerating(true);
    setError("");

    try {
      const response = await memeService.generateMemeWithAI(prompt);
      setAiResult(response.data);
    } catch (err) {
      const errorInfo = handleAPIerror(err);
      setError(errorInfo.message);
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleCreateFromAI = async (memeData) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await memeService.createMemeFromAI(memeData);
      setSuccess("Meme deployed to the Matrix successfully! 🚀");
      setShowModal(false);
      setAiResult(null);
      setPrompt("");
    } catch (err) {
      const errorInfo = handleAPIerror(err);
      setError(errorInfo.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }
      setSelectedFile(file);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!selectedFile) {
        setError("Please select an image file");
        return;
      }

      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("title", meme.title);
      formData.append("tags", meme.tags);
      formData.append("startingPrice", meme.startingPrice.toString());

      await memeService.createMemeWithUpload(formData);
      setSuccess("Meme deployed to the Matrix successfully! 🚀");

      // Reset form
      setMeme({
        title: "",
        tags: "",
        startingPrice: 10,
      });
      setSelectedFile(null);
      // Reset file input
      const fileInput = document.getElementById("imageFile");
      if (fileInput) fileInput.value = "";
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
          <div className="text-center">
            <h1
              className="text-4xl text-cyberyellow orbitron mb-8 text-center text-glitch"
              data-text="CREATE MEME"
            >
              Create a Meme
            </h1>
          </div>
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

          {/* AI Generation Section */}
          <div className="mb-8 p-6 bg-black/30 border-2 border-cyberpink/50 rounded">
            <h2 className="text-2xl text-cyberpink orbitron mb-4 text-center">
              GEN AI MEMES
            </h2>
            <form onSubmit={handleAISubmit} className="space-y-4">
              <div>
                <label className="block text-cyberpink mb-2 orbitron">
                  DESCRIBE YOUR MEME
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border-2 border-cyberyellow/30 text-white rounded focus:border-cyberyellow focus:outline-none transition-colors resize-none"
                  placeholder="e.g., A cat wearing sunglasses saying 'Deal with it' in a cyberpunk setting..."
                  rows={3}
                  maxLength={500}
                  required
                  disabled={loading}
                />
                <div className="text-right text-cyberpink/70 text-sm mt-1">
                  {prompt.length}/500
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-cyberpink to-purple-500 text-black font-bold text-lg orbitron rounded hover:opacity-80 transition-opacity disabled:opacity-50"
                disabled={loading || !prompt.trim()}
              >
                {loading ? "🤖 GENERATING..." : "GENERATE WITH AI"}
              </button>
            </form>
          </div>

          {/* Manual Creation Section */}
          <div className="p-6 bg-black/30 border-2 border-cyberyellow/50 rounded">
            <h2 className="text-2xl text-cyberyellow orbitron mb-4 text-center">
              CREATE YOUR MEME
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  UPLOAD IMAGE *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="imageFile"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 bg-black/50 border-2 border-cyberyellow/30 text-white rounded focus:border-cyberyellow focus:outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-cyberpink file:text-black hover:file:bg-cyberyellow"
                    required
                    disabled={loading}
                  />
                  {selectedFile && (
                    <div className="mt-2 text-cyberpink text-sm">
                      Selected: {selectedFile.name} (
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-cyberpink mb-2 orbitron">
                  TAGS
                </label>
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
                    setMeme({
                      ...meme,
                      startingPrice: parseInt(e.target.value) || 1,
                    })
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
                disabled={loading || !selectedFile}
              >
                {loading ? "UPLOADING TO MATRIX..." : "DEPLOY MEME"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* AI Meme Modal */}
      <AIMemeModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        result={aiResult}
        onRegenerate={handleRegenerate}
        onCreate={handleCreateFromAI}
        isRegenerating={isRegenerating}
        isCreating={loading}
      />
    </>
  );
};

export default Create;
