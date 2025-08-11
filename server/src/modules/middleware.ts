import jwt from 'jsonwebtoken';
import multer from "multer";
import { Request, Response, NextFunction } from 'express';

export const checkForAuth=(req: Request, res: Response, next: NextFunction)=>{
    const bearer= (req as any).headers.authorization;

    if(!bearer){
        return res.status(401).json({error:"Unauthorized"});
        return;
    }
    const [,token]=bearer.split(" ");
    if(!token){
        res.status(401).json({error:"Token not found"});
        return;
    }
    try{
        const payload=jwt.verify(token,process.env.JWT_SECRET as string) as any;
        (req as any).user=payload;
        console.log(payload);
        next();
        return;
    }catch(err){
        console.log(err);
        res.status(401).json({error:"Auth Error"});
        return;
    }
}

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, "./public/temp")
    },
    filename: function(req,file,cb){
        cb(null, file.originalname)
    }
})
export const upload = multer({storage})