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
  private async callKandinskyAPI(prompt: string, style: string = 'realistic', aspectRatio: string = '1:1', steps: number = 20): Promise<string> {
    const ratioConfig = KANDINSKY_CONFIG.SUPPORTED_RATIOS.find(r => r.value === aspectRatio) || KANDINSKY_CONFIG.SUPPORTED_RATIOS[0];
    
    const requestBody = {
      prompt: prompt,
      negative_prompt: 'blurry, low quality, distorted, watermark',
      style: style,
      samples: 1,
      width: ratioConfig.width,
      height: ratioConfig.height,
      steps: Math.min(Math.max(steps, 10), 50),
      guidance_scale: 7.5,
      seed: Math.floor(Math.random() * 1000000)
    };

    try {
      const response = await fetch(KANDINSKY_CONFIG.BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': KANDINSKY_CONFIG.API_KEY
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const result = await response.json();
      
      if (result.image) {
        // Convert base64 to blob URL for display
        const base64Data = result.image;
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/png' });
        const imageUrl = URL.createObjectURL(blob);
        return imageUrl;
      } else {
        throw new Error('No image returned from API');
      }
    } catch (error) {
      console.error('Kandinsky API Error:', error);
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

      // Call Kandinsky API
      const imageUrl = await this.callKandinskyAPI(
        enhancedPrompt,
        request.style || 'realistic',
        request.aspectRatio || '1:1',
        request.steps || 20
      );

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