import { Request, Response } from 'express';
import { UploadOnCloudinary } from '../services/cloudinary';
import prisma from '../db';
import fs from 'fs';

interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer?: Buffer;
}

interface UploadRequestBody {
  title: string;
  tags?: string | string[];
  startingPrice: string;
}

export const createMemeWithUpload = async (req: Request & { file?: UploadedFile; body: UploadRequestBody }, res: Response) => {
  try {
    const { title, tags, startingPrice } = req.body;
    const user = (req as any).user;

    if (!title || !startingPrice) {
      return res.status(400).json({
        error: 'Title and starting price are required'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        error: 'Image file is required'
      });
    }

    const cloudinaryResponse = await UploadOnCloudinary(req.file.path);
    
    if (!cloudinaryResponse) {
      return res.status(500).json({
        error: 'Failed to upload image'
      });
    }

    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    let processedTags: string[] = [];
    if (tags) {
      if (typeof tags === 'string') {
        processedTags = tags.split(',').map((tag: string) => tag.trim());
      } else if (Array.isArray(tags)) {
        processedTags = tags.map((tag: string) => tag.trim());
      }
    }

    const meme = await prisma.meme.create({
      data: {
        title: title,
        imageUrl: cloudinaryResponse.secure_url,
        tags: processedTags,
        startingPrice: BigInt(parseFloat(startingPrice)),
        creatorId: user.id,
      },
    });

    res.json({
      success: true,
      data: {
        ...meme,
        startingPrice: meme.startingPrice.toString() // Convert BigInt to string for JSON
      }
    });

  } catch (error) {
    console.error('Create meme with upload error:', error);
    
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      error: 'Failed to create meme',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
