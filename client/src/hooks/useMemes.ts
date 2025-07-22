import { useState, useEffect } from 'react';
import { memeService, handleAPIerror } from '../api/service';

export const useMemes = () => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{message:string,status:number} | null>(null);

  const fetchMemes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await memeService.getAllMemes();
      setMemes(data);
    } catch (err) {
      setError(handleAPIerror(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemes();
  }, []);

  return { memes, loading, error, refetch: fetchMemes };
};

export const useTrending = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{message:string,status:number} | null>(null);

  const fetchTrending = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await memeService.getTrending();
      setTrending(data);
    } catch (err) {
      setError(handleAPIerror(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  return { trending, loading, error, refetch: fetchTrending };
};