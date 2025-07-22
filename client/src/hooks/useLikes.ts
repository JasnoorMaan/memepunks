import { useState, useEffect } from 'react';
import { memeService } from '../api/service';
import { useAuth } from './useAuth';

export const useLikes = () => {
  const [likedMemes, setLikedMemes] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserLikes();
    } else {
      setLikedMemes(new Set());
    }
  }, [isAuthenticated]);

  const fetchUserLikes = async () => {
    try {
      setLoading(true);
      const result = await memeService.getUserLikes();
      if (result && result.likedMemes) {
        setLikedMemes(new Set(result.likedMemes));
      }
    } catch (err) {
      console.error('Error fetching user likes:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = (memeId, isLiked) => {
    if (isLiked) {
      setLikedMemes(prev => {
        const newSet = new Set(prev);
        newSet.add(memeId);
        return newSet;
      });
    } else {
      setLikedMemes(prev => {
        const newSet = new Set(prev);
        newSet.delete(memeId);
        return newSet;
      });
    }
  };

  return {
    likedMemes,
    loading,
    toggleLike,
    isLiked: (memeId) => likedMemes.has(memeId)
  };
};