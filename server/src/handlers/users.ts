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
        const meme = await prisma.meme.create({
            data:{
                title:req.body.title,
                imageUrl:req.body.imageUrl,
                tags:req.body.tags,
                startingPrice:req.body.startingPrice,
                creatorId:id,
            }
        });
        res.json({meme});
        }
    catch(err){
        res.status(400).json({error:err.message});
    }
        
}