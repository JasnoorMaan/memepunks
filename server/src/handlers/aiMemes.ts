import { Request, Response } from 'express';
import { AIService } from '../services/aiService';
import { UploadOnCloudinary } from '../services/cloudinary';
import prisma from '../db';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

export const generateMemeWithAI = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({
        error: 'Prompt is required and must be a non-empty string'
      });
    }

    if (prompt.length > 500) {
      return res.status(400).json({
        error: 'Prompt must be less than 500 characters'
      });
    }

    const result = await AIService.generateMemeContent(prompt.trim());
    
    res.json({
      success: true,
      data: {
        title: result.title,
        tags: result.tags,
        imageUrl: result.imageUrl,
        originalPrompt: prompt.trim()
      }
    });

  } catch (error) {
    console.error('Generate meme error:', error);
    res.status(500).json({
      error: 'Failed to generate meme content. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const createMemeFromAI = async (req: Request, res: Response) => {
  try {
    const { title, tags, imageUrl, startingPrice } = req.body;
    const user = (req as any).user;

    if (!title || !imageUrl || !startingPrice) {
      return res.status(400).json({
        error: 'Title, image URL, and starting price are required'
      });
    }

    // Download image from URL and upload to Cloudinary for consistency
    let finalImageUrl = imageUrl;
    
    try {
      // Download the image temporarily
      const response = await axios.get(imageUrl, { responseType: 'stream' });
      const tempDir = path.join(process.cwd(), 'temp');
      
      // Create temp directory if it doesn't exist
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }
      
      const tempPath = path.join(tempDir, `ai-meme-${Date.now()}.jpg`);
      const writer = fs.createWriteStream(tempPath);
      
      response.data.pipe(writer);
      
      await new Promise<void>((resolve, reject) => {
        writer.on('finish', () => resolve());
        writer.on('error', reject);
      });

      // Upload to Cloudinary
      const cloudinaryResponse = await UploadOnCloudinary(tempPath);
      
      if (cloudinaryResponse) {
        finalImageUrl = cloudinaryResponse.secure_url;
      }

      // Clean up temp file
      if (fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath);
      }
    } catch (uploadError) {
      console.log('Failed to re-upload to Cloudinary, using original URL:', uploadError);
      // Continue with original URL if Cloudinary upload fails
    }

    // Create meme in database
    const meme = await prisma.meme.create({
      data: {
        title: title,
        imageUrl: finalImageUrl,
        tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map((tag: string) => tag.trim()) : []),
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
    console.error('Create AI meme error:', error);
    res.status(500).json({
      error: 'Failed to create meme',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
