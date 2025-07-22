import {Router} from "express";
import { getAllMemes, getTrending , likeMeme, getUserLikes} from "./handlers/memes";  // Add getUserLikes
import { createUser, postMeme, signIn } from "./handlers/users";
import {makeBid} from "./handlers/bids";
import {body,validationResult} from "express-validator";
import { checkForAuth } from "./modules/middleware";

const router=Router();

router.post("/create", postMeme);
router.post("/like/", likeMeme);
router.post("/bid/", makeBid);
router.get("/user-likes", getUserLikes);  

export default router;