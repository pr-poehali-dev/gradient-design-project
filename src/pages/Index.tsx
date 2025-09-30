import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const menuItems = [
  { id: 'hero', label: 'Главная' },
  { id: 'about', label: 'О проекте' },
  { id: 'initiatives', label: 'Инициативные проекты' },
  { id: 'events', label: 'Мероприятия' },
  { id: 'news', label: 'Новости' },
  { id: 'documents', label: 'Документы' },
  { id: 'feedback', label: 'Обратная связь' },
  { id: 'contacts', label: 'Контакты' },
];

const socialLinks = [
  { icon: 'MessageCircle', url: '#', label: 'Telegram' },
  { icon: 'Instagram', url: '#', label: 'Instagram' },
  { icon: 'Youtube', url: '#', label: 'YouTube' },
];

const events = [
  {
    id: 1,
    title: 'Летняя молодежная школа',
    date: '15 июля 2025',
    location: 'Нижний Новгород',
    description: 'Образовательная программа для талантливой молодежи с мастер-классами от ведущих экспертов',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Форум "Молодые лидеры"',
    date: '22 августа 2025',
    location: 'Дзержинск',
    description: 'Платформа для обмена опытом и создания новых инициатив среди молодых предпринимателей',
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Хакатон "Технологии будущего"',
    date: '10 сентября 2025',
    location: 'Арзамас',
    description: 'Соревнование по созданию цифровых решений для развития региона',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop'
  },
];

const news = [
  {
    id: 1,
    date: '25 июня 2025',
    title: 'Стартовал прием заявок на грантовый конкурс',
    excerpt: 'Молодые новаторы могут подать заявки на финансирование своих проектов до 31 июля',
  },
  {
    id: 2,
    date: '18 июня 2025',
    title: 'Открыт набор в Школу наставничества',
    excerpt: 'Опытные профессионалы поделятся знаниями с начинающими специалистами',
  },
  {
    id: 3,
    date: '10 июня 2025',
    title: 'Подведены итоги регионального этапа конкурса',
    excerpt: 'Более 200 проектов приняли участие в конкурсе молодежных инициатив',
  },
];

const initiatives = [
  {
    id: 1,
    title: 'Развитие образования',
    description: 'Модернизация учебных заведений и внедрение современных образовательных технологий',
    icon: 'GraduationCap',
    status: 'active'
  },
  {
    id: 2,
    title: 'Профессиональное развитие',
    description: 'Программы стажировок, практик и профориентации для студентов и молодых специалистов',
    icon: 'Briefcase',
    status: 'active'
  },
  {
    id: 3,
    title: 'Научные исследования',
    description: 'Поддержка молодых ученых и вовлечение студентов в научно-исследовательскую деятельность',
    icon: 'Microscope',
    status: 'planning'
  },
  {
    id: 4,
    title: 'Культурное развитие',
    description: 'Продвижение русского языка и культуры, воспитание патриотизма и любви к Родине',
    icon: 'Landmark',
    status: 'active'
  },
];

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % events.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleEventRegister = (event: typeof events[0]) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
    setIsModalOpen(false);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-violet-indigo rounded-lg flex items-center justify-center">
                <Icon name="Rocket" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">Молодежь и дети</h1>
                <p className="text-xs text-muted-foreground">Нижегородская область</p>
              </div>
            </div>
            <nav className="hidden lg:flex space-x-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col space-y-3">
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.url}
            className="w-12 h-12 bg-gradient-violet-indigo rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
            aria-label={social.label}
          >
            <Icon name={social.icon as any} size={20} />
          </a>
        ))}
      </div>

      <section id="hero" className="pt-32 pb-20 gradient-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              Национальный проект
              <span className="block mt-2 bg-gradient-violet-indigo bg-clip-text text-transparent">
                Молодежь и дети
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Воспитание всесторонне развитых людей, любящих свою страну и создающих будущее России
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-violet-indigo hover:opacity-90 transition-opacity"
                onClick={() => scrollToSection('events')}
              >
                Мероприятия
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('about')}>
                Узнать больше
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-center text-foreground">О проекте</h2>
            <p className="text-lg text-muted-foreground mb-8 text-center">
              7 мая 2024 года президент РФ Путин В.В. подписал Указ «О национальных целях развития
              Российской Федерации на период до 2030 года и на перспективу до 2036 года»
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Target" className="text-primary" size={24} />
                  </div>
                  <CardTitle>Наша миссия</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Поддержка талантливой молодежи и воспитание лидеров с высокими моральными принципами
                    и социальной ответственностью
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Users" className="text-secondary" size={24} />
                  </div>
                  <CardTitle>Целевая аудитория</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Школьники, студенты СПО и высших учебных заведений, молодые люди до 35 лет
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="initiatives" className="py-20 gradient-light">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-foreground">Инициативные проекты</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {initiatives.map((initiative, index) => (
              <Card
                key={initiative.id}
                className="hover:shadow-lg transition-all hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-violet-indigo rounded-xl flex items-center justify-center mb-4">
                    <Icon name={initiative.icon as any} className="text-white" size={28} />
                  </div>
                  <CardTitle className="text-lg">{initiative.title}</CardTitle>
                  <div className="mt-2">
                    {initiative.status === 'active' ? (
                      <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full">
                        Активен
                      </span>
                    ) : (
                      <span className="text-xs px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                        Планируется
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{initiative.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="events" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-foreground">Мероприятия</h2>
          <div className="max-w-6xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-8">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {events.map((event) => (
                  <div key={event.id} className="min-w-full relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-[500px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <div className="max-w-2xl">
                        <div className="flex items-center space-x-4 mb-4">
                          <span className="flex items-center text-sm">
                            <Icon name="Calendar" size={16} className="mr-2" />
                            {event.date}
                          </span>
                          <span className="flex items-center text-sm">
                            <Icon name="MapPin" size={16} className="mr-2" />
                            {event.location}
                          </span>
                        </div>
                        <h3 className="text-3xl font-bold mb-3">{event.title}</h3>
                        <p className="text-lg mb-6 text-white/90">{event.description}</p>
                        <Dialog open={isModalOpen && selectedEvent?.id === event.id} onOpenChange={setIsModalOpen}>
                          <DialogTrigger asChild>
                            <Button
                              size="lg"
                              className="bg-white text-primary hover:bg-white/90"
                              onClick={() => handleEventRegister(event)}
                            >
                              Зарегистрироваться
                              <Icon name="ArrowRight" size={20} className="ml-2" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Регистрация на мероприятие</DialogTitle>
                              <DialogDescription>{selectedEvent?.title}</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                              <div>
                                <Label htmlFor="name">ФИО</Label>
                                <Input
                                  id="name"
                                  required
                                  value={formData.name}
                                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                  placeholder="Иванов Иван Иванович"
                                />
                              </div>
                              <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                  id="email"
                                  type="email"
                                  required
                                  value={formData.email}
                                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                  placeholder="ivan@example.com"
                                />
                              </div>
                              <div>
                                <Label htmlFor="phone">Телефон</Label>
                                <Input
                                  id="phone"
                                  type="tel"
                                  required
                                  value={formData.phone}
                                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                  placeholder="+7 (999) 123-45-67"
                                />
                              </div>
                              <div>
                                <Label htmlFor="message">Комментарий</Label>
                                <Textarea
                                  id="message"
                                  value={formData.message}
                                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                  placeholder="Дополнительная информация..."
                                  rows={3}
                                />
                              </div>
                              <Button type="submit" className="w-full bg-gradient-violet-indigo">
                                Отправить заявку
                              </Button>
                            </form>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {events.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentSlide === index ? 'bg-white w-8' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {events.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                      <Icon name="Calendar" size={16} />
                      <span>{event.date}</span>
                    </div>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">{event.description}</CardDescription>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleEventRegister(event)}
                    >
                      Подробнее
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="news" className="py-20 gradient-light">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-foreground">Новости</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {news.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                    <span className="text-sm text-muted-foreground flex items-center">
                      <Icon name="Clock" size={16} className="mr-2" />
                      {item.date}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{item.excerpt}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="documents" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-foreground">Документы</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              'Указ Президента РФ о национальных целях развития',
              'План мероприятий нацпроекта "Молодежь и дети"',
              'Положение о грантовой поддержке',
              'Регламент участия в мероприятиях',
            ].map((doc, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="flex-row items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="FileText" className="text-primary" size={24} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{doc}</CardTitle>
                  </div>
                  <Icon name="Download" className="text-muted-foreground" size={20} />
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="feedback" className="py-20 gradient-light">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-foreground">Обратная связь</h2>
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Есть вопросы или предложения?</CardTitle>
              <CardDescription>Мы всегда рады вашим идеям и готовы помочь</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.success('Спасибо за обращение! Мы ответим вам в ближайшее время.');
                }}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="feedback-name">Имя</Label>
                  <Input id="feedback-name" required placeholder="Ваше имя" />
                </div>
                <div>
                  <Label htmlFor="feedback-email">Email</Label>
                  <Input id="feedback-email" type="email" required placeholder="email@example.com" />
                </div>
                <div>
                  <Label htmlFor="feedback-message">Сообщение</Label>
                  <Textarea
                    id="feedback-message"
                    required
                    placeholder="Ваше сообщение..."
                    rows={5}
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-violet-indigo">
                  Отправить
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="contacts" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-foreground">Контакты</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="MapPin" className="text-primary" size={24} />
                </div>
                <CardTitle className="text-lg">Адрес</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>г. Нижний Новгород, пл. Минина и Пожарского, д. 1</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Phone" className="text-secondary" size={24} />
                </div>
                <CardTitle className="text-lg">Телефон</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>+7 (831) 439-00-00</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Mail" className="text-accent" size={24} />
                </div>
                <CardTitle className="text-lg">Email</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>info@molodezh-nn.ru</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-foreground text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-white/70">
                © 2025 Национальный проект "Молодежь и дети". Нижегородская область
              </p>
            </div>
            <div className="flex space-x-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <Icon name={social.icon as any} size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}