export const KANDINSKY_CONFIG = {
  API_KEY: 'SG_1e9051b6b962ad3a',
  BASE_URL: 'https://api.segmind.com/v1/kandinsky-2.2',
  TIMEOUT: 60000, // 60 seconds
  SUPPORTED_STYLES: [
    { value: 'realistic', label: 'Реалистичный' },
    { value: 'artistic', label: 'Художественный' },
    { value: 'digital_art', label: 'Цифровое искусство' },
    { value: 'photographic', label: 'Фотографический' },
    { value: 'anime', label: 'Аниме' },
    { value: 'sketch', label: 'Эскиз' }
  ],
  SUPPORTED_RATIOS: [
    { value: '1:1', label: 'Квадрат (1:1)', width: 512, height: 512 },
    { value: '16:9', label: 'Широкий (16:9)', width: 768, height: 432 },
    { value: '9:16', label: 'Портрет (9:16)', width: 432, height: 768 },
    { value: '4:3', label: 'Классический (4:3)', width: 640, height: 480 }
  ]
};