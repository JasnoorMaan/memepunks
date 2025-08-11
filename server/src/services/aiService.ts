import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI, Modality } from "@google/genai";
import * as fs from "node:fs";
import path from "path";
import axios from "axios";
import { UploadOnCloudinary } from "./cloudinary";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const imageAI = new GoogleGenAI({});

interface MemeGenerationResult {
  title: string;
  tags: string[];
  imageUrl: string;
}

export class AIService {
  static async generateMemeContent(prompt: string): Promise<MemeGenerationResult> {
    try {
      // Generate title and tags with Gemini
      const textResult = await this.generateTextContent(prompt);
      
      // Generate image with available method
      const imageUrl = await this.generateImage(prompt);
      
      return {
        title: textResult.title,
        tags: textResult.tags,
        imageUrl: imageUrl
      };
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Failed to generate meme content');
    }
  }

  private static async generateTextContent(prompt: string): Promise<{title: string, tags: string[]}> {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const aiPrompt = `
    Based on this meme description: "${prompt}"
    
    Generate:
    1. A catchy, funny meme title (max 20 characters)
    2. 2-5 relevant tags for this meme
    
    Respond in this exact JSON format:
    {
      "title": "Your meme title here",
      "tags": ["tag1", "tag2", "tag3"]
    }
    `;

    const result = await model.generateContent(aiPrompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      // Extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        title: parsed.title || "AI Generated Meme",
        tags: Array.isArray(parsed.tags) ? parsed.tags : ["meme", "ai", "generated"]
      };
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      return {
        title: "AI Generated Meme",
        tags: ["meme", "ai", "generated"]
      };
    }
  }

  private static async generateImage(prompt: string): Promise<string> {
    // First try Imagen if available
    const imagenUrl = await this.tryImagenGeneration(prompt);
    if (imagenUrl) return imagenUrl;

    // Fallback to other services
    console.log('Imagen not available, using fallback image generation');
    return await this.getFallbackImage(prompt);
  }

  private static async tryImagenGeneration(prompt: string): Promise<string | null> {
    try {
      console.log('Attempting Imagen generation for:', prompt);
      
      const modelNames = [
        "gemini-2.0-flash-preview-image-generation"
      ];
      
      for (const modelName of modelNames) {
        try {
          console.log(`Trying Imagen model: ${modelName}`);
          
          const imagePrompt = `Create a meme-style image: ${prompt}. Make it funny and engaging.`;
          
          const response = await imageAI.models.generateContent({
            model: modelName,
            contents: imagePrompt,
            config: {
              responseModalities: [Modality.TEXT, Modality.IMAGE],
            },
          });

          if (response.candidates && response.candidates[0] && response.candidates[0].content.parts) {
            for (const part of response.candidates[0].content.parts) {
              if (part.inlineData) {
                const imageData = part.inlineData.data;
                const buffer = Buffer.from(imageData, "base64");
                
                const tempDir = path.join(process.cwd(), 'temp');
                if (!fs.existsSync(tempDir)) {
                  fs.mkdirSync(tempDir, { recursive: true });
                }
                
                const tempPath = path.join(tempDir, `ai-generated-${Date.now()}.png`);
                fs.writeFileSync(tempPath, buffer);
                console.log(`✅ Imagen successful with ${modelName}!`);
                
                // Try to upload to Cloudinary
                const cloudinaryResponse = await UploadOnCloudinary(tempPath);
                
                if (cloudinaryResponse) {
                  // Clean up temp file if cloudinary upload succeeded
                  if (fs.existsSync(tempPath)) {
                    fs.unlinkSync(tempPath);
                  }
                  console.log('✅ Uploaded to Cloudinary:', cloudinaryResponse.secure_url);
                  return cloudinaryResponse.secure_url;
                } else {
                  // Cloudinary failed, but we still have the AI-generated image
                  // For now, let's serve it from a local endpoint
                  console.log('⚠️ Cloudinary failed, but AI image was generated successfully');
                  const localImageUrl = `http://localhost:3000/temp-images/${path.basename(tempPath)}`;
                  console.log('📷 Using local image URL:', localImageUrl);
                  return localImageUrl;
                }
              }
            }
          }
        } catch (modelError) {
          console.log(`❌ Model ${modelName} failed:`, modelError.message);
          continue;
        }
      }
      
      return null;
    } catch (error) {
      console.log('❌ Imagen generation completely failed:', error.message);
      return null;
    }
  }

  private static async getFallbackImage(prompt: string): Promise<string> {
    try {
      // Try to get a contextual image from Unsplash
      if (process.env.UNSPLASH_ACCESS_KEY) {
        const searchTerms = prompt.split(' ').slice(0, 3).join(' ');
        const unsplashResponse = await axios.get(`https://api.unsplash.com/search/photos`, {
          params: {
            query: searchTerms,
            per_page: 1,
            orientation: 'squarish'
          },
          headers: {
            'Authorization': `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
          },
          timeout: 5000
        });
        
        if (unsplashResponse.data.results.length > 0) {
          console.log('✅ Using Unsplash image');
          return unsplashResponse.data.results[0].urls.regular;
        }
      }
    } catch (error) {
      console.log('❌ Unsplash failed:', error.message);
    }

    // Final fallback to a reliable random image service
    console.log('🎲 Using random image fallback');
    return `https://picsum.photos/512/512?random=${Date.now()}`;
  }
}
