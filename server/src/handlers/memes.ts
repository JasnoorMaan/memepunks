import prisma from "../db";

export const getAllMemes = async (req,res)=>{
    try{
        const memes= await prisma.meme.findMany();
        res.json(memes);
    }catch(err){
        res.status(500).json({
            success:false,
            message:"Sorry, couldn't fetch memes :("
        })
        console.log(err);
    }
}

export const getTrending = async(req,res)=>{
    try{
        const trends= await prisma.meme.findMany({
            orderBy:{
                likeCount:"desc"
            }
        })
        res.json(trends);
    }catch(err){
        res.status(500).json({
            success:false,
            message:"Sorry, couldn't fetch your trending memes :("
        })
    }
}

export const likeMeme= async (req,res)=>{
    try{
        const { memeId } = req.body;
        const meme = await prisma.meme.update({
            where:{
                id:memeId
            },
            data:{
                likeCount:{
                    increment:1
                }
            }
        })
        res.json({
            success:true,
            // message:"Meme liked successfully!",
            likeCount:meme.likeCount
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Sorry, couldn't like meme :("
        })
    }
}