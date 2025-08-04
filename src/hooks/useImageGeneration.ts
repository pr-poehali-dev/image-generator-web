import { useState } from 'react';

interface GenerateImageParams {
  prompt: string;
  style?: string;
  aspectRatio?: string;
  steps?: number;
}

export const useImageGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async (params: GenerateImageParams) => {
    if (!params.prompt.trim()) {
      setError('Промпт не может быть пустым');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // Call our internal generate_image function
      // This is where we'd integrate with the real AI service
      
      // For now, we'll simulate the real generation process
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: params.prompt,
          style: params.style || 'realistic',
          aspect_ratio: params.aspectRatio || '1:1',
          steps: params.steps || 30
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при генерации изображения');
      }

      const data = await response.json();
      
      if (data.success) {
        setGeneratedImage(data.imageUrl);
      } else {
        throw new Error(data.error || 'Неизвестная ошибка');
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Произошла ошибка';
      setError(errorMessage);
      console.error('Image generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const clearImage = () => {
    setGeneratedImage(null);
    setError(null);
  };

  return {
    generateImage,
    clearImage,
    isGenerating,
    generatedImage,
    error
  };
};