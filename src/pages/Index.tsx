import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { imageGenerationService } from '@/services/imageGenerationService';
import { KANDINSKY_CONFIG } from '@/config/kandinsky';

const Index = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [style, setStyle] = useState('realistic');
  const [steps, setSteps] = useState([30]);

  // Mock data for gallery
  const galleryImages = [
    {
      id: 1,
      url: '/img/26b90f6e-6d79-42a4-9aad-23b40a9860f5.jpg',
      prompt: 'Digital art landscape with mountains at sunset',
      author: 'Alex_Creator',
      likes: 124,
      createdAt: '2 часа назад'
    },
    {
      id: 2,
      url: '/img/7ee41c08-9b95-411b-91be-e41b267dc46f.jpg',
      prompt: 'Abstract geometric patterns in purple and teal',
      author: 'Maria_Art',
      likes: 89,
      createdAt: '4 часа назад'
    },
    {
      id: 3,
      url: '/img/a813486a-0e7e-4835-9a9d-0d0edf81d1cb.jpg',
      prompt: 'Futuristic city skyline at night with neon lights',
      author: 'CyberDreamer',
      likes: 203,
      createdAt: '6 часов назад'
    }
  ];

  // Mock user history
  const userHistory = [
    {
      id: 1,
      url: '/img/26b90f6e-6d79-42a4-9aad-23b40a9860f5.jpg',
      prompt: 'Космический пейзаж с планетами',
      createdAt: 'Сегодня, 14:30',
      status: 'completed'
    },
    {
      id: 2,
      url: '/img/7ee41c08-9b95-411b-91be-e41b267dc46f.jpg',
      prompt: 'Абстрактное искусство в стиле минимализм',
      createdAt: 'Вчера, 18:45',
      status: 'completed'
    }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    try {
      const result = await imageGenerationService.generateImage({
        prompt: prompt,
        style: style,
        aspectRatio: aspectRatio,  
        steps: steps[0]
      });

      if (result.success && result.imageUrl) {
        setGeneratedImage(result.imageUrl);
      } else {
        throw new Error(result.error || 'Ошибка генерации изображения');
      }
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Произошла ошибка при генерации изображения. Попробуйте снова.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGoogleAuth = () => {
    alert('⚠️ Авторизация через Google находится в разработке. Скоро будет доступна!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Icon name="Sparkles" size={20} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                fotoMan ai
              </h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" className="text-sm font-medium">Генератор</Button>
              <Button variant="ghost" className="text-sm font-medium">Галерея</Button>
              <Button variant="ghost" className="text-sm font-medium">История</Button>
              <Button variant="ghost" className="text-sm font-medium">Настройки</Button>
            </nav>

            <div className="flex items-center space-x-3">
              <Button onClick={handleGoogleAuth} variant="outline" size="sm">
                <Icon name="Chrome" size={16} className="mr-2" />
                Войти через Google
              </Button>
              <Avatar>
                <AvatarFallback>?</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="generate" className="w-full">
          {/* Mobile Navigation */}
          <TabsList className="grid w-full grid-cols-4 md:hidden mb-8">
            <TabsTrigger value="generate">
              <Icon name="Sparkles" size={16} />
            </TabsTrigger>
            <TabsTrigger value="gallery">
              <Icon name="Images" size={16} />
            </TabsTrigger>
            <TabsTrigger value="history">
              <Icon name="History" size={16} />
            </TabsTrigger>
            <TabsTrigger value="profile">
              <Icon name="User" size={16} />
            </TabsTrigger>
          </TabsList>

          {/* Generator Tab */}
          <TabsContent value="generate" className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold">Создай изображение мечты</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Опиши что хочешь увидеть, и наш ИИ создаст уникальное изображение за секунды
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Generation Panel */}
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="Wand2" size={20} />
                    <span>Генератор</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Промпт</label>
                    <Textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Опишите изображение которое хотите создать..."
                      className="min-h-[100px] resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Соотношение сторон</label>
                      <Select value={aspectRatio} onValueChange={setAspectRatio}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1:1">Квадрат (1:1)</SelectItem>
                          <SelectItem value="16:9">Широкий (16:9)</SelectItem>
                          <SelectItem value="9:16">Вертикальный (9:16)</SelectItem>
                          <SelectItem value="4:3">Стандарт (4:3)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Стиль</label>
                      <Select value={style} onValueChange={setStyle}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {KANDINSKY_CONFIG.SUPPORTED_STYLES.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Качество: {steps[0]} шагов</label>
                    <Slider
                      value={steps}
                      onValueChange={setSteps}
                      max={100}
                      min={10}
                      step={10}
                      className="w-full"
                    />
                  </div>

                  <Button 
                    onClick={handleGenerate}
                    disabled={!prompt.trim() || isGenerating}
                    className="w-full h-12 text-lg font-semibold"
                  >
                    {isGenerating ? (
                      <>
                        <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                        Генерирую...
                      </>
                    ) : (
                      <>
                        <Icon name="Sparkles" size={20} className="mr-2" />
                        Создать изображение
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Result Panel */}
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="Image" size={20} />
                    <span>Результат</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0">
                  {generatedImage ? (
                    <div className="space-y-4">
                      <div className="relative rounded-lg overflow-hidden bg-muted aspect-square">
                        <img 
                          src={generatedImage} 
                          alt="Generated" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" className="flex-1">
                          <Icon name="Download" size={16} className="mr-2" />
                          Скачать
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Icon name="Share2" size={16} className="mr-2" />
                          Поделиться
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <Icon name="ImagePlus" size={48} className="mx-auto text-muted-foreground/50" />
                        <p className="text-muted-foreground">
                          Изображение появится здесь
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold">Публичная галерея</h2>
              <p className="text-xl text-muted-foreground">
                Вдохновляйтесь работами других пользователей
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image) => (
                <Dialog key={image.id}>
                  <DialogTrigger asChild>
                    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <div className="relative aspect-square overflow-hidden">
                        <img 
                          src={image.url} 
                          alt={image.prompt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge variant="secondary" className="bg-black/50 text-white">
                            <Icon name="Heart" size={12} className="mr-1" />
                            {image.likes}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <p className="font-medium truncate">{image.prompt}</p>
                        <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                          <span>@{image.author}</span>
                          <span>{image.createdAt}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>{image.prompt}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <img 
                        src={image.url} 
                        alt={image.prompt}
                        className="w-full rounded-lg"
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>{image.author[0].toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">@{image.author}</p>
                            <p className="text-sm text-muted-foreground">{image.createdAt}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Icon name="Heart" size={16} className="mr-2" />
                            {image.likes}
                          </Button>
                          <Button variant="outline" size="sm">
                            <Icon name="Download" size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold">Моя история</h2>
              <p className="text-xl text-muted-foreground">
                Все ваши созданные изображения в одном месте
              </p>
            </div>

            <div className="space-y-4">
              {userHistory.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                      <img 
                        src={item.url} 
                        alt={item.prompt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium">{item.prompt}</p>
                      <p className="text-sm text-muted-foreground">{item.createdAt}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {item.status === 'completed' ? 'Завершено' : 'В процессе'}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Icon name="Download" size={16} />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="Share2" size={16} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-8">
            <div className="text-center space-y-4">
              <Avatar className="w-24 h-24 mx-auto">
                <AvatarFallback className="text-2xl">?</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">Гость</h2>
                <p className="text-muted-foreground">Войдите для полного доступа</p>
              </div>
              <Button onClick={handleGoogleAuth} className="mx-auto">
                <Icon name="Chrome" size={16} className="mr-2" />
                Войти через Google
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-center">
                <Icon name="Image" size={32} className="mx-auto mb-2 text-primary" />
                <h3 className="font-semibold text-2xl">0</h3>
                <p className="text-sm text-muted-foreground">Создано изображений</p>
              </Card>
              <Card className="p-6 text-center">
                <Icon name="Heart" size={32} className="mx-auto mb-2 text-secondary" />
                <h3 className="font-semibold text-2xl">0</h3>
                <p className="text-sm text-muted-foreground">Получено лайков</p>
              </Card>
              <Card className="p-6 text-center">
                <Icon name="Users" size={32} className="mx-auto mb-2 text-accent" />
                <h3 className="font-semibold text-2xl">0</h3>
                <p className="text-sm text-muted-foreground">Подписчиков</p>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;