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
        const userId= (req as any).user.id;

        if(!memeId){
            return res.status(400).json({
                success:false,
                message:"Meme ID is required"
            });
        }
        const existingLike= await prisma.like.findUnique({
            where:{
                userId_memeId:{
                    userId: userId,
                    memeId: memeId
                }
            }
        });

        if(existingLike){
            await prisma.$transaction(async (prisma)=>{
                await prisma.like.delete({
                    where:{
                        id:existingLike.id
                    }
                });
                await prisma.meme.update({
                    where:{ id:memeId},
                    data:{
                        likeCount:{
                            decrement:1
                        }
                    }
                });
            });
            const updatedMeme = await prisma.meme.findUnique({
                where:{id:memeId}
            });
            return res.json({
                success:true,
                message: "Meme unliked successfully!",
                likeCount: updatedMeme?.likeCount || 0,
                isLiked: false
            });
        }else{
                await prisma.$transaction(async (prisma)=>{
                    await prisma.like.create({
                        data:{
                            userId:userId,
                            memeId:memeId
                        }
                    });
                    await prisma.meme.update({
                        where:{id:memeId},
                        data:{
                            likeCount:{
                                increment:1
                            }
                        }
                    });
                });
                const updatedMeme= await prisma.meme.findUnique({
                    where: {id:memeId}
                });
                return res.json({
                    success: true,
                message: "Meme liked successfully!",
                likeCount: updatedMeme?.likeCount || 0,
                isLiked: true
                });
            }
        }catch(err:any){
            console.error('Error liking meme:', err);
            res.status(500).json({
            success: false,
            message: "Sorry, couldn't like meme"
        });
    }
}

export const getUserLikes = async (req,res)=>{
    try {
        const userId = (req as any).user.id;
        
        const userLikes = await prisma.like.findMany({
            where: { userId: userId },
            select: { memeId: true }
        });

        const likedMemeIds = userLikes.map(like => like.memeId);
        
        res.json({
            success: true,
            likedMemes: likedMemeIds
        });
    } catch (err) {
        console.error('Error fetching user likes:', err);
        res.status(500).json({
            success: false,
            message: "Couldn't fetch user likes"
        });
    }
};
