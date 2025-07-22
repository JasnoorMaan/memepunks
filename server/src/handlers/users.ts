import { Request, Response } from "express";
import prisma from "../db";
import { createToken, hashPass, comparePass } from "../modules/auth";

export const createUser=async(req: Request, res: Response)=>{
    const hash=await hashPass(req.body.password);

    const user=await prisma.user.create({
        data:{
            username:req.body.username,
            password:hash,
            email:req.body.email,
        },
    });
    const token=createToken(user);
    res.json({token});
}
export const signIn=async(req: Request, res: Response)=>{
    const user=await prisma.user.findUnique({
        where:{username:req.body.username},
    });
    
    if (!user) {
        return res.status(401).json({error:"User does not exist"});
    }
    
    const isValid= await comparePass(req.body.password,user.password);
    if(!isValid){
        res.status(401).json({error:"Invalid username or password"});
        return;
    }
    const token=createToken(user);
    res.json({token});
}

export const postMeme = async(req: Request, res: Response)=>{
    try{
        const id= (req as any).user.id;
        
        // Validate required fields
        if (!req.body.title) {
            return res.status(400).json({error: "Title is required"});
        }

        if (!req.body.startingPrice || req.body.startingPrice <= 0) {
            return res.status(400).json({error: "Valid starting price is required"});
        }
        
        // Convert comma-separated tags string to array
        const tagsArray = req.body.tags 
            ? req.body.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag.length > 0)
            : [];
        
        const meme = await prisma.meme.create({
            data:{
                title: req.body.title,
                imageUrl: req.body.imageUrl,
                tags: tagsArray,
                startingPrice: BigInt(req.body.startingPrice),
                creatorId: id,
            }
        });
        res.json({ success: true, meme });
        }
    catch(err: any){
        console.error('Error creating meme:', err);
        res.status(400).json({error: err.message || 'Failed to create meme'});
    }
}