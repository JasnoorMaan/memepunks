import React from "react";

interface AIMemeResult {
  title: string;
  tags: string[];
  imageUrl: string;
  originalPrompt: string;
}

interface AIMemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: AIMemeResult | null;
  onRegenerate: () => void;
  onCreate: (memeData: {
    title: string;
    tags: string;
    imageUrl: string;
    startingPrice: number;
  }) => void;
  isRegenerating: boolean;
  isCreating?: boolean;
}

const AIMemeModal: React.FC<AIMemeModalProps> = ({
  isOpen,
  onClose,
  result,
  onRegenerate,
  onCreate,
  isRegenerating,
  isCreating = false,
}) => {
  const [startingPrice, setStartingPrice] = React.useState(10);
  if (!isOpen || !result) return null;

  const handleCreate = () => {
    onCreate({
      title: result.title,
      tags: result.tags.join(", "),
      imageUrl: result.imageUrl,
      startingPrice: startingPrice,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-cyberblack border-2 border-cyberyellow rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-cyberyellow orbitron">
              AI GENERATED MEME
            </h2>
            <button
              onClick={onClose}
              disabled={isCreating}
              className={`text-cyberpink hover:text-cyberyellow text-2xl font-bold ${
                isCreating ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              ×
            </button>
          </div>

          {/* Meme Preview */}
          <div className="mb-6">
            <div className="bg-black/50 border-2 border-cyberpink/30 rounded-lg p-4">
              <img
                src={result.imageUrl}
                alt={result.title}
                className="w-full max-w-md mx-auto rounded-lg border-2 border-cyberyellow/30"
                onError={(e) => {
                  e.currentTarget.src = `https://picsum.photos/400/400?random=${Date.now()}`;
                }}
              />
            </div>
          </div>

          {/* Meme Details */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-cyberpink mb-2 orbitron text-sm">
                TITLE
              </label>
              <div className="bg-black/50 border-2 border-cyberyellow/30 rounded px-3 py-2 text-white">
                {result.title}
              </div>
            </div>

            <div>
              <label className="block text-cyberpink mb-2 orbitron text-sm">
                TAGS
              </label>
              <div className="bg-black/50 border-2 border-cyberyellow/30 rounded px-3 py-2 text-white">
                {result.tags.join(", ")}
              </div>
            </div>

            <div>
              <label className="block text-cyberpink mb-2 orbitron text-sm">
                ORIGINAL PROMPT
              </label>
              <div className="bg-black/50 border-2 border-cyberyellow/30 rounded px-3 py-2 text-white text-sm">
                {result.originalPrompt}
              </div>
            </div>

            <div>
              <label className="block text-cyberpink mb-2 orbitron text-sm">
                STARTING PRICE (MPD)
              </label>
              <input
                type="number"
                min="1"
                step="1"
                value={startingPrice}
                onChange={(e) =>
                  setStartingPrice(parseInt(e.target.value) || 1)
                }
                className="w-full px-3 py-2 bg-black/50 border-2 border-cyberyellow/30 text-white rounded focus:border-cyberyellow focus:outline-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onRegenerate}
              disabled={isRegenerating || isCreating}
              className={`flex-1 py-3 bg-cyberpink text-black font-bold orbitron rounded hover:opacity-80 transition-opacity ${
                isRegenerating || isCreating
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {isRegenerating ? "REGENERATING..." : "REGENERATE"}
            </button>

            <button
              onClick={handleCreate}
              disabled={isCreating || isRegenerating}
              className={`flex-1 py-3 bg-gradient-to-r from-cyberpink to-cyberyellow text-black font-bold orbitron rounded hover:opacity-80 transition-opacity ${
                isCreating || isRegenerating
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {isCreating ? "CREATING..." : "CREATE MEME"}
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={onClose}
              disabled={isCreating}
              className={`text-cyberpink hover:text-cyberyellow underline orbitron text-sm ${
                isCreating ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMemeModal;
