import React, { useState } from "react";
import { memeService, handleAPIerror } from "../api/service";
import { useAuth } from "../hooks/useAuth";
import { useLikes } from "../hooks/useLikes";
// import Lightbox from "yet-another-react-lightbox";
import BidModal from "./BidModal";

const Card = ({ meme, onMemeUpdate }) => {
  const { isAuthenticated } = useAuth();
  const { isLiked, toggleLike } = useLikes();
  const [loading, setLoading] = useState(false);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [error, setError] = useState("");
  // const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const [localMeme, setLocalMeme] = useState(meme);

  if (!localMeme) {
    return (
      <section className="bg-cyberblack flex flex-col gap-4 p-2 justify-center items-center w-80 h-96 border border-cyberyellow/30">
        <div className="text-cyberpink">No meme data</div>
      </section>
    );
  }

  const handleLike = async () => {
    if (!isAuthenticated) {
      setError("Please sign in to like memes");
      return;
    }

    try {
      setLoading(true);
      setError("");

      console.log("Calling likeMeme with memeId:", localMeme.id);

      const result = await memeService.likeMeme(localMeme.id);

      console.log("likeMeme response:", result);

      if (!result) {
        throw new Error("No response from server");
      }

      const newLikeCount = result.likeCount ?? localMeme.likeCount ?? 0;
      const isLikedNow = result.isLiked ?? true;

      setLocalMeme((prev) => ({
        ...prev,
        likeCount: newLikeCount,
      }));

      if (toggleLike) {
        toggleLike(localMeme.id, isLikedNow);
      }

      if (onMemeUpdate) {
        onMemeUpdate(localMeme.id, { likeCount: newLikeCount });
      }
    } catch (err) {
      console.error("Like error details:", err);
      const errorInfo = handleAPIerror(err);
      setError(errorInfo.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBidClick = () => {
    if (!isAuthenticated) {
      setError("Please sign in to bid on memes");
      return;
    }
    setError("");
    setIsBidModalOpen(true);
  };

  const handleBidSuccess = (memeId, bidAmount) => {
    setLocalMeme((prev) => ({
      ...prev,
      currentPrice: bidAmount,
      bidCount: (prev.bidCount || 0) + 1,
    }));
    if (onMemeUpdate) {
      onMemeUpdate(memeId, {
        currentPrice: bidAmount,
        bidCount: (localMeme.bidCount || 0) + 1,
      });
    }
  };

  const currentPrice = localMeme.currentPrice || localMeme.startingPrice;
  const userLikedThis = isLiked ? isLiked(localMeme.id) : false;

  return (
    <>
      <section className="bg-cyberblack flex flex-col gap-4 p-4 justify-center items-center w-80 h-auto border border-cyberyellow/30 hover:border-cyberpink/50 transition-colors rounded">
        <div
          className="w-full h-auto overflow-hidden"
          // onClick={() => setIsLightboxOpen(true)}
        >
          <img
            className="w-full h-full object-contain aspect-square"
            src={localMeme.imageUrl || "/dummy.jpg"}
            alt={localMeme.title || "Meme"}
            onError={(e) => {
              e.target.src = "/dummy.jpg";
            }}
          />
        </div>

        <div className="flex flex-col gap-3 w-full">
          <h2 className="orbitron text-cyberyellow text-center text-sm font-bold truncate">
            {localMeme.title || "There was an issue"}
          </h2>

          {localMeme.tags && localMeme.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 justify-center">
              {localMeme.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="text-cyberpink text-xs bg-cyberpink/10 px-2 py-1"
                >
                  {tag}
                </span>
              ))}
              {localMeme.tags.length > 3 && (
                <span className="text-cyberpink text-xs">
                  +{localMeme.tags.length - 3}
                </span>
              )}
            </div>
          )}

          <div className="flex justify-between items-center text-xs">
            <span className="text-cyberyellow font-bold">
              {currentPrice} MPD
            </span>
            <span className="text-cyberpink">
              💰 {localMeme.bidCount || 0} bids
            </span>
          </div>

          {error && (
            <div className="text-cyberpink text-xs text-center p-2 bg-cyberpink/10 border border-cyberpink/30 rounded">
              {error}
            </div>
          )}

          <div className="flex gap-2 w-full">
            <button
              onClick={handleLike}
              disabled={loading}
              className={`flex-1 flex items-center justify-center gap-1 py-2 px-3 border rounded text-xs orbitron disabled:opacity-50 transition-colors ${
                userLikedThis
                  ? "bg-cyberpink/40 border-cyberpink text-cyberpink"
                  : "bg-cyberpink/20 border-cyberpink/50 text-cyberpink hover:bg-cyberpink/30"
              }`}
            >
              {userLikedThis ? "💖" : "❤️"} {localMeme.likeCount || 0}
            </button>

            <button
              onClick={handleBidClick}
              disabled={loading}
              className="flex-1 py-2 px-3 bg-cyberyellow/20 border border-cyberyellow/50 text-cyberyellow hover:bg-cyberyellow/30 transition-colors rounded text-xs orbitron font-bold disabled:opacity-50"
            >
              🔥 BID
            </button>
          </div>
        </div>
      </section>

      <BidModal
        isOpen={isBidModalOpen}
        onClose={() => setIsBidModalOpen(false)}
        meme={localMeme}
        onBidSuccess={handleBidSuccess}
      />
      {/* <Lightbox
        open={isLightboxOpen}
        close={() => setIsLightboxOpen(false)}
        slides={[{ src: localMeme.imageUrl || "/dummy.jpg" }]}
      /> */}
    </>
  );
};

export default Card;
