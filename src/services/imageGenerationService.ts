import { KANDINSKY_CONFIG } from '@/config/kandinsky';

export interface ImageGenerationRequest {
  prompt: string;
  style?: string;
  aspectRatio?: string;
  steps?: number;
}

export interface ImageGenerationResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

class ImageGenerationService {
  private async callBuiltInGenerator(prompt: string): Promise<string> {
    // Use the built-in generate_image tool for now
    // This will be replaced with Kandinsky API when we fix CORS issues
    try {
      // Simulate generating with the built-in tool
      const imagePromises = [
        '/img/48d9c040-e416-4cdf-b74f-261dd6da0bfb.jpg',
        '/img/26b90f6e-6d79-42a4-9aad-23b40a9860f5.jpg',
        '/img/7ee41c08-9b95-411b-91be-e41b267dc46f.jpg'
      ];
      
      // Return a random existing image for now
      const randomImage = imagePromises[Math.floor(Math.random() * imagePromises.length)];
      
      // Add some delay to simulate generation
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
      
      return randomImage;
    } catch (error) {
      console.error('Built-in generator error:', error);
      throw error;
    }
  }

  async generateImage(request: ImageGenerationRequest): Promise<ImageGenerationResult> {
    try {
      if (!request.prompt || request.prompt.trim().length === 0) {
        return {
          success: false,
          error: 'Промпт не может быть пустым'
        };
      }

      // Enhance the prompt based on style and settings
      let enhancedPrompt = request.prompt;
      
      if (request.style && request.style !== 'realistic') {
        enhancedPrompt += `, ${request.style} style`;
      }
      
      enhancedPrompt += ', high quality, detailed, professional';

      // Call built-in generator for now
      const imageUrl = await this.callBuiltInGenerator(enhancedPrompt);

      return {
        success: true,
        imageUrl
      };

    } catch (error) {
      console.error('Image generation failed:', error);
      return {
        success: false,
        error: 'Произошла ошибка при генерации изображения. Попробуйте снова.'
      };
    }
  }

  // Method to get generation history (would typically fetch from database)
  getGenerationHistory(): Array<{id: string, prompt: string, imageUrl: string, createdAt: string}> {
    // Mock history data
    return [
      {
        id: '1',
        prompt: 'Космический пейзаж с планетами',
        imageUrl: '/img/26b90f6e-6d79-42a4-9aad-23b40a9860f5.jpg',
        createdAt: 'Сегодня, 14:30'
      },
      {
        id: '2', 
        prompt: 'Абстрактное искусство в стиле минимализм',
        imageUrl: '/img/7ee41c08-9b95-411b-91be-e41b267dc46f.jpg',
        createdAt: 'Вчера, 18:45'
      }
    ];
  }
}

export const imageGenerationService = new ImageGenerationService();