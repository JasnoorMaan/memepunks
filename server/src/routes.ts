import {Router} from "express";
import { getAllMemes, getTrending , likeMeme, getUserLikes} from "./handlers/memes";  // Add getUserLikes
import { createUser, postMeme, signIn } from "./handlers/users";
import {makeBid} from "./handlers/bids";
import { generateMemeWithAI, createMemeFromAI } from "./handlers/aiMemes";
import { createMemeWithUpload } from "./handlers/upload";
import {body,validationResult} from "express-validator";
import { checkForAuth } from "./modules/middleware";
import { upload } from "./modules/middleware";

const router=Router();

router.post("/create", postMeme);
router.post("/create-with-upload", upload.single('image'), createMemeWithUpload);
router.post("/generate-meme", generateMemeWithAI);
router.post("/create-ai-meme", createMemeFromAI);
router.post("/like/", likeMeme);
router.post("/bid/", makeBid);
router.get("/user-likes", getUserLikes);  

export default router;