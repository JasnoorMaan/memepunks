import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes";
import morgan from "morgan";
import {checkForAuth} from "./modules/middleware";
import {createUser,signIn} from "./handlers/users";
import {body,validationResult} from "express-validator";
import { getAllMemes, getTrending } from "./handlers/memes";

// Fix BigInt serialization issue
(BigInt.prototype as any).toJSON = function() { return this.toString() }
dotenv.config();
const PORT= process.env.PORT || 3000;

const app=express();
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      process.env.FRONTEND_URL,
      process.env.FRONTEND_PREVIEW_URL,
    ].filter(Boolean);

    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// health check
app.get('/', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.post('/signup',body('username').isLength({min:3,max:20}).withMessage("Username must be between 3 and 20 characters"),body('email').isEmail().withMessage("Invalid email"),body('password').isLength({min:8,max:20}).withMessage("Password must be between 8 and 20 characters"),createUser);
app.post('/signin',body('username').isLength({min:3,max:20}).withMessage("Username must be between 3 and 20 characters"),body('password').isLength({min:8,max:20}).withMessage("Password must be between 8 and 20 characters"),signIn);
router.get("/market", getAllMemes);
router.get("/trending", getTrending);
app.use('/api',checkForAuth, router);

app.listen(PORT,()=>{
    console.log(`Server on at ${PORT}`);
})