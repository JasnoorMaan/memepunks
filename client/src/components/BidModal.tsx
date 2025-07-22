import React, { useState } from "react";
import { memeService, handleAPIerror } from "../api/service";

const BidModal = ({ isOpen, onClose, meme, onBidSuccess }) => {
  const [bidAmount, setBidAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const currPrice = Number(meme?.currentPrice || meme?.startingPrice || 0);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const bidVal = parseFloat(bidAmount);

    if (!bidAmount || isNaN(bidVal)) {
      setError("Please enter a valid bid amount");
      return;
    }
    if (bidVal <= currPrice) {
      setError("Bid must be greater than the current one!!");
      return;
    }
    try {
      setLoading(true);
      const bidData = {
        memeId: meme.id,
        amount: bidVal,
      };
      await memeService.makeBid(bidData);
      onBidSuccess(meme.id, bidVal);
      setBidAmount("");
      onClose();
    } catch (err) {
      const errorInfo = handleAPIerror(err);
      setError(errorInfo.message);
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    setBidAmount("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-cyberblack border-2 border-cyberyellow/50 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-cyberyellow orbitron text-xl font-bold">
            PLACE BID
          </h2>
          <button
            onClick={handleClose}
            className="text-cyberpink hover:text-cyberyellow transition-colors text-2xl"
            disabled={loading}
          >
            ×
          </button>
        </div>
        <div className="mb-4">
          <h3 className="text-cyberpink text-lg font-semibold mb-2">
            {meme?.title}
          </h3>
          <p className="text-cyberyellow text-sm">
            Current Price: <span className="font-bold">{currPrice} MPD</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-cyberpink text-sm p-2 bg-cyberpink/10 border border-cyberpink/30 rounded">
              {error}
            </div>
          )}
          <div>
            <label className="block text-cyberpink mb-2 orbitron text-sm">
              YOUR BID (MPD)
            </label>
            <input
              type="number"
              step="1"
              min={currPrice + 1}
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="w-full px-4 py-3 bg-black/50 border-2 border-cyberyellow/30 text-white rounded focus:border-cyberyellow focus:outline-none transition-colors"
              placeholder={`Min: ${currPrice + 1}`}
              disabled={loading}
              required
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors orbitron"
              disabled={loading}
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-cyberpink to-cyberyellow text-black font-bold rounded hover:opacity-80 transition-opacity disabled:opacity-50 orbitron"
              disabled={loading}
            >
              {loading ? "PLACING BID..." : "PLACE BID"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BidModal;
