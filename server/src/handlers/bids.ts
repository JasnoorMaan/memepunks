import prisma from "../db";

export const makeBid= async(req,res)=>{
    try{
        const {memeId, amount}=req.body;
        const userId=req.user.id;
        if (!memeId || !amount) {
            return res.status(400).json({
                success: false,
                message: "Meme ID and bid amount are required"
            });
        }

        const bidAmount = parseFloat(amount);
        if (isNaN(bidAmount) || bidAmount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Valid bid amount is required"
            });
        }
        const currentMeme = await prisma.meme.findUnique({
            where: { id: memeId }
        });

        if (!currentMeme) {
            return res.status(404).json({
                success: false,
                message: "Meme not found"
            });
        }

        const currentPrice = Number(currentMeme.currentPrice || currentMeme.startingPrice);
        
        if (bidAmount <= currentPrice) {
            return res.status(400).json({
                success: false,
                message: `Bid must be higher than current price (${currentPrice})`
            });
        }
        const result = await prisma.$transaction(async (prisma) => {
            const bid = await prisma.bid.create({
                data: {
                    amount: BigInt(Math.round(bidAmount * 100)),
                    bidderId: userId,
                    memeId: memeId
                }
            });


            const updatedMeme = await prisma.meme.update({
                where: { id: memeId },
                data: {
                    currentPrice: BigInt(Math.round(bidAmount * 100)),
                    currentBidderId: userId,
                    bidCount: {
                        increment: 1
                    }
                }
            });
            return { bid, updatedMeme };
        });

        res.json({
            success: true,
            message: "Bid placed successfully!",
            currentPrice: Number(result.updatedMeme.currentPrice) / 100,
            currentBidderId: result.updatedMeme.currentBidderId,
            bidCount: result.updatedMeme.bidCount
        });

    } catch (err: any) {
        console.error('Error placing bid:', err);
        res.status(500).json({
            success: false,
            message: "Sorry, couldn't place bid"
        });
    }
};