import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export const createToken= (user: any)=>{
    const token = jwt.sign({
        id:user.id, username:user.username
    },process.env.JWT_SECRET as string);
    return token;
}
export const comparePass=(password: string, hash: string)=>{
    return bcrypt.compare(password, hash);
}
export const hashPass=(password: string)=>{
    return bcrypt.hash(password,5);
}