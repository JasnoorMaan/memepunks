import prisma from "../db";

export const makeBid= async(req,res)=>{
    try{
        const {memeId, amount}=req.body;
        const userId=req.user.id;
        const meme = await prisma.meme.update({
            where:{
                id:memeId
            },
            data:{
                currentPrice:amount,
                currentBidderId:userId
            }
        })
        res.json({
            success:true,
            message:"Bid placed successfully!",
            currentPrice:meme.currentPrice,
            currentBidderId:meme.currentBidderId
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Sorry, couldn't place bid :("
        })
    }
}