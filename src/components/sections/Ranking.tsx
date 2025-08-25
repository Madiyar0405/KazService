import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, X, TrendingUp, TrendingDown, ChevronLeft, ChevronRight } from 'lucide-react';
import Reveal from '@/components/common/Reveal';
import { useLanguage } from '@/contexts/LanguageContext';

interface Person {
  id: number;
  rank: number;
  name: string;
  position: string;
  workplace: string;
  category: 'government' | 'business' | 'noc' | 'international';
  trend: 'up' | 'down' | 'stable';
  reason: string;
  image: string;
}

const initialPeopleData: Person[] = [
  {
    id: 1,
    rank: 1,
    name: 'Ерлан Аккенженов',
    position: 'Министр',
    workplace: 'Министерство энергетики РК',
    category: 'government',
    trend: 'up',
    reason: 'Девятый ежегодный рейтинг на этот раз возглавил Ерлан Аккенженов. С марта 2025 года Ерлан Аккенженов возглавил Министерство энергетики РК. Его карьера охватывает более двух десятилетий в сфере нефтяной торговли, переработки и государственного управления. Он прошёл путь от трейдера сырой нефти в Chevron Texaco в Великобритании до топ-менеджера международной группы KMG International, отвечая за экспорт, трейдинг и розничную реализацию нефтепродуктов в Румынии, Болгарии и Сингапуре. В Казахстане занимал ключевые должности в структуре «КазМунайГаз», а с 2023 по 2025 годы был вице-министром энергетики. Возглавив министерство, сосредоточен на развитии экспортной инфраструктуры, цифровизации энергетики и усилении роли местного содержания в отраслевых проектах. Как министр, он активно продвигает стратегию национальных интересов в выборе уровня добычи нефти, публично заявив, что Казахстан будет определять производство исходя из внутренних приоритетов, а не строго следовать квотам OPEC+',
    image: '/src/assets/portraits/p1.jpg',
  },
  {
    id: 2,
    rank: 2,
    name: 'Тимур Кулибаев',
    position: 'Председатель',
    workplace: 'Almex Holding Group',
    category: 'business',
    trend: 'up',
    reason: 'В 2025 году поднялся на одну позицию. Остается одной из ключевых фигур в развитии нефтегазовой отрасли Казахстана и одним из наиболее влиятельных бизнесменов страны. Является бенефициаром десятков компаний в добыче, нефтесервисе и машиностроении с совокупной численностью персонала свыше 10 000 человек. По данным Forbes его состояние вместе с супругой оценивается примерно в 5,3 млрд долларов. Контролирует важные финансовые инструменты, включая Халык Банк, который остается одним из крупнейших кредиторов нефтегазового сектора. Рост влияния частного капитала и расширение портфеля активов усилили его позиции и обеспечили движение вверх в рейтинге. Дополнительным фактором являются устойчивые международные контакты, включая страны ОПЕК, а также прочные связи с европейскими инвесторами и глубокое понимание энергетической системы.',
    image: '/src/assets/portraits/p2.jpg',
  },
  {
    id: 3,
    rank: 3,
    name: 'Бекет Избастин',
    position: 'Генеральный директор, Председатель Правления',
    workplace: 'ТОО "PSA"',
    category: 'noc',
    trend: 'stable',
    reason: 'Бекет Темиртаевич Избастин – генеральный директор и председатель правления ТОО «PSA», уполномоченной организации, представляющей интересы Республики Казахстан в рамках соглашений о разделе продукции по проектам Кашаган, Карачаганак и Дунга. Под его руководством PSA реализует стратегию по оптимизации затрат на крупных проектах, управляет многомиллиардными бюджетами и активно отстаивает национальные интересы в отношениях с международными инвесторами. Среди ключевых достижений – успешный запуск пятого компрессора обратной закачки газа на Карачаганакском месторождении, позволивший увеличить эффективность добычи и уровень местного содержания. Также при его участии PSA продвигает реформу тендерных процедур, направленную на повышение участия казахстанских компаний в нефтегазовых контрактах.',
    image: '/src/assets/portraits/p3.jpg',
  },
  {
    id: 4,
    rank: 4,
    name: 'Магзум Мирзагалиев',
    position: 'Советник Президента Республики Казахстан',
    workplace: 'Администрация Президента',
    category: 'government',
    trend: 'stable',
    reason: 'С 13 февраля 2025 года Магзум Мирзагалиев занимает должность советника Президента Республики Казахстан, где курирует вопросы в сфере энергетики и устойчивого развития. До этого в период с апреля 2022 по май 2024 года он возглавлял АО «НК «КазМунайГаз». Под его руководством были реализованы проекты по цифровизации, оптимизации производственных процессов и усилению экспортного потенциала компании. Ранее занимал должности министра энергетики, министра экологии, геологии и природных ресурсов, а также вице-министра нефти и газа и заместителя министра энергетики. Имеет более 20 лет опыта работы в отрасли, включая международные нефтесервисные компании и национальные предприятия.',
    image: '/src/assets/portraits/p4.jpg',
  },
  {
    id: 5,
    rank: 5,
    name: 'Алибек Жамауов',
    position: 'Вице-министр',
    workplace: 'Министерство энергетики РК',
    category: 'government',
    trend: 'stable',
    reason: 'С 1 июля 2023 года Алибек Жамауов занимает должность вице-министра энергетики Республики Казахстан. До этого с 2020 года он работал заместителем генерального директора по контрактам, реализации и ревизии счетов нефтяных операций в ТОО «PSA», где курировал ключевые вопросы по проектам Карачаганак и Кашаган. В своей текущей роли он отвечает за координацию крупных инфраструктурных проектов в энергетике, включая развитие газоперерабатывающих мощностей и модернизацию НПЗ. Участвует в переговорах с международными партнерами, курирует вопросы тендерных процедур и локализации, а также принимает участие в формировании политики по развитию квалификаций в отрасли.',
    image: '/src/assets/portraits/p5.jpg',
  },
  {
    id: 6,
    rank: 6,
    name: 'Нурлан Ногаев',
    position: 'Председатель Правления',
    workplace: 'АО «НК «КазМунайГаз»',
    category: 'noc',
    trend: 'stable',
    reason: 'В рейтинге этого года сохранил свою позицию. Нурлан Ногаев возглавляет «КазМунайГаз» с апреля 2024 года. До этого он занимал должность акима Мангистауской области, где активно занимался привлечением инвестиций в нефтегазовый сектор и развитием инфраструктуры. Ранее работал акимом Атырауской области и Западно-Казахстанской области. Имеет большой опыт работы в нефтегазовой отрасли, включая руководящие должности в компаниях «КазМунайГаз», «Agip KCO» и «NCOC». В своей текущей роли сосредоточен на увеличении добычи нефти и газа, модернизации производственных мощностей и развитии экспортного потенциала компании.',
    image: '/src/assets/portraits/p6.jpg',
  },
  {
    id: 7,
    rank: 7,
    name: 'Галымжан Пирматов',
    position: 'Председатель',
    workplace: 'Национальный Банк РК',
    category: 'government',
    trend: 'stable',
    reason: 'Сохранил свою позицию в рейтинге. Галымжан Пирматов является председателем Национального Банка Республики Казахстан с 2022 года. До этого он занимал должность первого заместителя премьер-министра Республики Казахстан. Ранее работал председателем правления АО «ФНБ «Самрук-Казына». Имеет большой опыт работы в финансовом секторе, включая руководящие должности в Национальном Банке, Министерстве финансов и частных компаниях. В своей текущей роли отвечает за денежно-кредитную политику, стабильность финансовой системы и развитие финансового рынка.',
    image: '/src/assets/portraits/p7.jpg',
  },
  {
    id: 8,
    rank: 8,
    name: 'Асет Магауов',
    position: 'Генеральный директор',
    workplace: 'KAZENERGY',
    category: 'business',
    trend: 'stable',
    reason: 'В рейтинге этого года сохранил свою позицию. Асет Магауов является генеральным директором ассоциации KAZENERGY с 2019 года. До этого он занимал должность вице-министра энергетики Республики Казахстан. Ранее работал в компаниях «КазМунайГаз», «CNPC» и «Shell». Имеет большой опыт работы в нефтегазовой отрасли, включая вопросы геологии, разработки месторождений, транспортировки и переработки нефти и газа. В своей текущей роли представляет интересы нефтегазовых компаний в отношениях с государственными органами, международными организациями и общественностью.',
    image: '/src/assets/portraits/p8.jpg',
  },
  {
    id: 9,
    rank: 9,
    name: 'Олег Егоров',
    position: 'Генеральный директор',
    workplace: 'Тенгизшевройл',
    category: 'international',
    trend: 'stable',
    reason: 'Сохранил свою позицию в рейтинге. Олег Егоров является генеральным директором компании «Тенгизшевройл» с 2018 года. До этого он занимал различные руководящие должности в компании «Chevron». Ранее работал в компаниях «Mobil» и «ExxonMobil». Имеет большой опыт работы в нефтегазовой отрасли, включая вопросы добычи, переработки и транспортировки нефти и газа. В своей текущей роли отвечает за реализацию проекта расширения производственных мощностей на месторождении Тенгиз, а также за обеспечение безопасной и эффективной работы предприятия.',
    image: '/src/assets/portraits/p9.jpg',
  },
  {
    id: 10,
    rank: 10,
    name: 'Вячеслав Ким',
    position: 'Председатель Совета директоров',
    workplace: 'Kaspi.kz',
    category: 'business',
    trend: 'stable',
    reason: 'В рейтинге этого года сохранил свою позицию. Вячеслав Ким является председателем Совета директоров компании Kaspi.kz с 2018 года. До этого он занимал должность председателя правления компании Kaspi Bank. Ранее работал в различных финансовых организациях. Имеет большой опыт работы в финансовом секторе, включая вопросы банковского дела, страхования и инвестиций. В своей текущей роли отвечает за стратегическое развитие компании Kaspi.kz, а также за взаимодействие с инвесторами и государственными органами.',
    image: '/src/assets/portraits/p10.jpg',
  },
];

const Ranking: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  // Get translated people data
  const getTranslatedPeople = () => {
    const translatedPeople: Person[] = [];
    
    // Add translated people (first 5 for now)
    for (let i = 1; i <= 5; i++) {
      const nameKey = `people.${i}.name`;
      const positionKey = `people.${i}.position`;
      const workplaceKey = `people.${i}.workplace`;
      const reasonKey = `people.${i}.reason`;
      
      // Check if translations exist
      if (t(nameKey) !== nameKey) {
        translatedPeople.push({
          id: i,
          rank: i,
          name: t(nameKey),
          position: t(positionKey),
          workplace: t(workplaceKey),
          category: initialPeopleData.find(p => p.id === i)?.category || 'government',
          trend: initialPeopleData.find(p => p.id === i)?.trend || 'stable',
          reason: t(reasonKey),
          image: `/src/assets/portraits/p${i}.jpg`
        });
      }
    }
    
    return translatedPeople;
  };

  const allPeople = useMemo(() => {
    const translatedPeople = getTranslatedPeople();
    
    // Combine translated people with original data for the rest
    const combinedPeople = [...initialPeopleData];
    
    translatedPeople.forEach(translatedPerson => {
      const index = combinedPeople.findIndex(p => p.id === translatedPerson.id);
      if (index !== -1) {
        combinedPeople[index] = translatedPerson;
      }
    });
    
    return combinedPeople;
  }, [t, language]);

  const filteredPeople = useMemo(() => {
    let filtered = [...allPeople];

    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(person =>
        person.name.toLowerCase().includes(lowerSearchTerm) ||
        person.position.toLowerCase().includes(lowerSearchTerm) ||
        person.workplace.toLowerCase().includes(lowerSearchTerm)
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(person => person.category === selectedCategory);
    }

    return filtered;
  }, [searchTerm, selectedCategory, allPeople]);

  const openPersonModal = (person: Person) => {
    setSelectedPerson(person);
  };

  const closePersonModal = () => {
    setSelectedPerson(null);
  };

  const navigateModal = (direction: 'prev' | 'next') => {
    if (!selectedPerson) return;
    
    const currentIndex = filteredPeople.findIndex(p => p.id === selectedPerson.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredPeople.length - 1;
    } else {
      newIndex = currentIndex < filteredPeople.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedPerson(filteredPeople[newIndex]);
  };

  return (
    <section id="ranking" className="py-24 bg-gradient-to-br from-background via-background/95 to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Reveal>
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('ranking.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('ranking.subtitle')}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center w-full md:w-auto">
              <Input
                type="text"
                placeholder={t('ranking.search.placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-80 lg:w-96 bg-card/80 backdrop-blur-sm border-border/50"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchTerm('')}
                  className="rounded-full hover:bg-accent ml-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
              <Button
                variant="secondary"
                onClick={() => {}}
                className="ml-2 hidden"
              >
                <Search className="w-4 h-4 mr-2" />
                {t('ranking.search.button')}
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                className="bg-card/80 backdrop-blur-sm border-border/50 hover:bg-accent/80 transition-colors"
              >
                {t('ranking.filters.all')}
              </Button>
              <Button
                variant={selectedCategory === 'government' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('government')}
                className="bg-card/80 backdrop-blur-sm border-border/50 hover:bg-accent/80 transition-colors"
              >
                {t('ranking.filters.government')}
              </Button>
              <Button
                variant={selectedCategory === 'business' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('business')}
                className="bg-card/80 backdrop-blur-sm border-border/50 hover:bg-accent/80 transition-colors"
              >
                {t('ranking.filters.business')}
              </Button>
              <Button
                variant={selectedCategory === 'noc' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('noc')}
                className="bg-card/80 backdrop-blur-sm border-border/50 hover:bg-accent/80 transition-colors"
              >
                {t('ranking.filters.noc')}
              </Button>
              <Button
                variant={selectedCategory === 'international' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('international')}
                className="bg-card/80 backdrop-blur-sm border-border/50 hover:bg-accent/80 transition-colors"
              >
                {t('ranking.filters.international')}
              </Button>
            </div>
          </div>
        </Reveal>

        {/* Results Grid */}
        <Reveal delay={0.4}>
          {filteredPeople.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPeople.map((person, index) => (
                <Card 
                  key={person.id} 
                  className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-border/50 hover:border-accent/50 bg-card/80 backdrop-blur-sm"
                  onClick={() => openPersonModal(person)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <img
                            src={person.image}
                            alt={person.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-accent/20 group-hover:border-accent/60 transition-colors"
                          />
                          <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
                            {person.rank}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {person.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {person.position}
                        </p>
                        <p className="text-xs text-muted-foreground/80 mt-1 line-clamp-1">
                          {t('ranking.modal.workplacePrefix')} {person.workplace}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge 
                            variant="secondary" 
                            className="text-xs bg-accent/20 text-accent-foreground border-accent/30"
                          >
                            {t(`ranking.filters.${person.category}`)}
                          </Badge>
                          {person.trend !== 'stable' && (
                            <div className={`flex items-center gap-1 text-xs ${
                              person.trend === 'up' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {person.trend === 'up' ? (
                                <TrendingUp className="w-3 h-3" />
                              ) : (
                                <TrendingDown className="w-3 h-3" />
                              )}
                              <span>{t(`ranking.modal.trend.${person.trend}`)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                {t('ranking.noResults')}
              </h3>
              <p className="text-sm text-muted-foreground/80">
                {t('ranking.noResultsDesc')}
              </p>
            </div>
          )}
        </Reveal>
      </div>

      {/* Person Details Modal */}
      <Dialog open={!!selectedPerson} onOpenChange={closePersonModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedPerson && (
            <>
              <DialogHeader>
                <DialogTitle className="sr-only">
                  {t('ranking.modal.details')} - {selectedPerson.name}
                </DialogTitle>
              </DialogHeader>
              
              {/* Navigation buttons */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigateModal('prev')}
                  className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-accent"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigateModal('next')}
                  className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-accent"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-6 pt-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <img
                        src={selectedPerson.image}
                        alt={selectedPerson.name}
                        className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover border-4 border-accent/20"
                      />
                      <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold shadow-lg">
                        {selectedPerson.rank}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                        {selectedPerson.name}
                      </h2>
                      <p className="text-lg text-muted-foreground mb-1">
                        {selectedPerson.position}
                      </p>
                      <p className="text-base text-muted-foreground/80">
                        {t('ranking.modal.workplacePrefix')} {selectedPerson.workplace}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3 flex-wrap">
                      <Badge 
                        variant="secondary" 
                        className="bg-accent/20 text-accent-foreground border-accent/30"
                      >
                        {t(`ranking.filters.${selectedPerson.category}`)}
                      </Badge>
                      <Badge variant="outline" className="border-border/50">
                        {t('ranking.modal.position')} #{selectedPerson.rank}
                      </Badge>
                      {selectedPerson.trend !== 'stable' && (
                        <Badge 
                          variant="outline" 
                          className={`border-border/50 ${
                            selectedPerson.trend === 'up' ? 'text-green-600 border-green-200' : 'text-red-600 border-red-200'
                          }`}
                        >
                          {selectedPerson.trend === 'up' ? (
                            <TrendingUp className="w-3 h-3 mr-1" />
                          ) : (
                            <TrendingDown className="w-3 h-3 mr-1" />
                          )}
                          {t(`ranking.modal.trend.${selectedPerson.trend}`)}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b border-border/50 pb-2">
                    {t('ranking.modal.reason')}
                  </h3>
                  <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                    {selectedPerson.reason.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-3">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Ranking;
