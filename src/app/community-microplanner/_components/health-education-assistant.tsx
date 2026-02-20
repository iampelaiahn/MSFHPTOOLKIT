'use client';

import { useState, useMemo } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { healthCurriculum, mythFactData, type CurriculumUnit } from '../_data/health-curriculum';
import { BookHeart, ChevronLeft, Eye, EyeOff, Languages, ShieldAlert, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Alert, AlertTitle } from '@/components/ui/alert';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Simple dictionary for translations
const translations = {
  cseCurriculum: { en: 'CSE Curriculum', sh: 'Zvirongwa zveCSE' },
  backToCurriculum: { en: 'Back to Curriculum', sh: 'Dzokera kuZvirongwa' },
  changeLanguage: { en: 'Change Language', sh: 'Chinja Mutauro' },
  quickExit: { en: 'Quick Exit', sh: 'Buda Nekuchimbidza' },
  myCalendar: { en: 'My Calendar', sh: 'Karenda Rangu' },
  sessionInterrupted: { en: 'Session interrupted. Displaying a neutral screen.', sh: 'Chikamu chakanganiswa. Kuratidza skrini isina kwayakarerekera.'},
  returnToSession: { en: 'Return to Session', sh: 'Dzokera kuChikamu'},
  startModule: { en: 'Start Module', sh: 'Tanga Chikamu' },
  comingSoon: { en: 'Coming Soon', sh: 'Zviri Kuuya' },
  facilitatorScript: { en: 'Facilitator Script', sh: 'Zvekutaura zveMufambisi' },
  visualAid: { en: 'Visual Aid', sh: 'Chishandiso Chekuona' },
  viewMode: { en: 'View Mode', sh: 'Maitiro Ekuona' },
  moduleComplete: { en: 'Module Complete!', sh: 'Chikamu Chapera!' },
  youveGoneThrough: { en: "You've gone through all the cards.", sh: "Mapedza nemakadhi ese."},
  restart: { en: 'Restart', sh: 'Tanga Zvakare'},
  myth: { en: 'Myth', sh: 'Nhema' },
  fact: { en: 'Fact', sh: 'Chokwadi'},
  correct: { en: 'Correct!', sh: 'Zvakarurama!' },
  incorrect: { en: 'Incorrect', sh: 'Hazvina Kururama'},
};

export function HealthEducationAssistant() {
  const [selectedUnit, setSelectedUnit] = useState<CurriculumUnit | null>(null);
  const [quickExit, setQuickExit] = useState(false);
  const [language, setLanguage] = useState<'en' | 'sh'>('en');
  
  const t = (key: keyof typeof translations) => translations[key][language];

  if (quickExit) {
    return (
      <div className="w-full h-[80vh] bg-background flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">{t('myCalendar')}</h1>
        <p className="text-muted-foreground">{t('sessionInterrupted')}</p>
        <Button onClick={() => setQuickExit(false)}>{t('returnToSession')}</Button>
      </div>
    )
  }

  const handleUnitSelect = (unit: CurriculumUnit) => {
    setSelectedUnit(unit);
  };

  const handleBack = () => {
    setSelectedUnit(null);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        {selectedUnit ? (
          <Button variant="ghost" onClick={handleBack}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            {t('backToCurriculum')}
          </Button>
        ) : (
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BookHeart /> {t('cseCurriculum')}
          </h1>
        )}

        <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" title={t('changeLanguage')}>
                    <Languages className="h-4 w-4" />
                    <span className="sr-only">{t('changeLanguage')}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup value={language} onValueChange={(value) => setLanguage(value as 'en' | 'sh')}>
                    <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="sh">Shona</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="destructive" size="icon" title={t('quickExit')} onClick={() => setQuickExit(true)}>
                <ShieldAlert className="h-4 w-4" />
                <span className="sr-only">{t('quickExit')}</span>
            </Button>
        </div>
      </div>

      {selectedUnit ? (
        <UnitDetail unit={selectedUnit} language={language} t={t} />
      ) : (
        <Accordion type="single" collapsible className="w-full" defaultValue="cluster-a">
          {healthCurriculum.map((cluster) => (
            <AccordionItem key={cluster.id} value={cluster.id}>
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                <div className="flex items-center gap-3">
                  <cluster.icon className="h-6 w-6 text-primary" />
                  <div>
                    {cluster.title}
                    <p className="text-sm font-normal text-muted-foreground">{cluster.subtitle}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
                  {cluster.units.map((unit) => (
                    <Card key={unit.title} className="flex flex-col hover:bg-accent/50 transition-colors">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <unit.icon className="h-8 w-8 text-muted-foreground" />
                          <div>
                            <CardTitle className="text-base">{unit.title}</CardTitle>
                            <CardDescription className="text-xs">{unit.unit}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground">{unit.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" onClick={() => handleUnitSelect(unit)} disabled={!unit.interactiveElement}>
                           <Zap className="mr-2 h-4 w-4" /> {t('startModule')}
                           {!unit.interactiveElement && <span className="text-xs ml-2">({t('comingSoon')})</span>}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}

function UnitDetail({ unit, language, t }: { unit: CurriculumUnit, language: 'en' | 'sh', t: (key: keyof typeof translations) => string }) {
    const [viewMode, setViewMode] = useState<'facilitator' | 'visual'>('facilitator');

    const renderInteractiveElement = () => {
        switch(unit.interactiveElement) {
            case 'myth-fact':
                const dataKey = unit.title.toLowerCase().includes('hiv') ? 'hiv-aids' : 'stis';
                const data = mythFactData[dataKey as keyof typeof mythFactData];
                return <MythFactSwiper data={data} t={t} />;
            // Add other cases here for scenario-tree, body-map etc.
            default:
                return <p className="text-muted-foreground">Interactive module for "{unit.title}" is under development.</p>;
        }
    }
    
    const facilitatorScript = {
      en: [
        `Welcome the peer and introduce the topic: ${unit.title}.`,
        'Explain the goal of the session is to learn and discuss openly.',
        'Use the interactive tool on the right to guide the conversation.',
        'Ask open-ended questions like "What have you heard about this?"',
        'Emphasize that there are no stupid questions.',
        'Check for understanding at the end and offer resources.'
      ],
      sh: [
        `Gamuchira muparidzi uye zivisa musoro wenyaya: ${unit.title}.`,
        'Tsanangura chinangwa chechikamu ndechekudzidza nekukurukura pachena.',
        'Shandisa chishandiso chiri kurudyi kutungamira hurukuro.',
        'Bvunza mibvunzo yakavhurika se "Wakanzwei nezvenyaya iyi?"',
        'Simbisa kuti hapana mibvunzo isina musoro.',
        'Tarisa kunzwisisa panoperera uye wopa zviwanikwa.'
      ]
    };

    return (
        <Card>
            <CardHeader>
                 <CardTitle className="flex items-center gap-3 text-xl">
                    <unit.icon className="h-6 w-6 text-primary"/>
                    {unit.title}
                </CardTitle>
                <CardDescription>{unit.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    <p className="text-sm font-semibold mb-2">{t('viewMode')}</p>
                    <div className="flex items-center gap-2">
                        <Button variant={viewMode === 'facilitator' ? 'default' : 'outline'} onClick={() => setViewMode('facilitator')}>
                           <EyeOff className="mr-2" /> {t('facilitatorScript')}
                        </Button>
                         <Button variant={viewMode === 'visual' ? 'default' : 'outline'} onClick={() => setViewMode('visual')}>
                           <Eye className="mr-2" /> {t('visualAid')}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 min-h-[400px]">
                    <div className={cn("p-4 rounded-lg bg-background/50 border", viewMode === 'visual' && 'hidden md:block')}>
                        <h3 className="font-bold mb-2">{t('facilitatorScript')}</h3>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                            {facilitatorScript[language].map((line, index) => <li key={index}>{line}</li>)}
                        </ul>
                    </div>
                     <div className={cn("p-4 rounded-lg bg-background/50 border", viewMode === 'facilitator' && 'hidden md:block')}>
                         <h3 className="font-bold mb-2 text-center md:text-left">{t('visualAid')}</h3>
                        <div className="flex items-center justify-center h-full">
                           {renderInteractiveElement()}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

type MythFactCard = {
  statement: string;
  isMyth: boolean;
  explanation: string;
}

function MythFactSwiper({ data, t }: { data: MythFactCard[], t: (key: keyof typeof translations) => string }) {
    const [cards, setCards] = useState(data);
    const [result, setResult] = useState<'myth' | 'fact' | 'correct' | 'incorrect' | null>(null);
    const activeIndex = cards.length - 1;

    const handleAnswer = (userChoice: 'myth' | 'fact') => {
        if (!activeCard) return;
        const isCorrect = (userChoice === 'myth' && activeCard.isMyth) || (userChoice === 'fact' && !activeCard.isMyth);
        setResult(isCorrect ? 'correct' : 'incorrect');

        setTimeout(() => {
            setResult(activeCard.isMyth ? 'myth' : 'fact');
            setTimeout(() => {
                 setCards(prev => prev.slice(0, prev.length - 1));
                 setResult(null);
            }, 2500)
        }, 1000)
    }

    const activeCard = useMemo(() => cards.length > 0 ? cards[activeIndex] : null, [cards, activeIndex]);

    if (!activeCard) {
        return (
            <div className="text-center">
                <p className="font-semibold text-lg">{t('moduleComplete')}</p>
                <p className="text-muted-foreground">{t('youveGoneThrough')}</p>
                <Button onClick={() => setCards(data)} className="mt-4">{t('restart')}</Button>
            </div>
        )
    }

    return (
        <div className="w-full max-w-sm mx-auto flex flex-col items-center">
             <div className="relative w-full h-64">
                <AnimatePresence>
                    <motion.div
                        key={activeCard.statement}
                        className={cn(
                            "absolute w-full h-full rounded-xl border p-6 flex flex-col items-center justify-center text-center shadow-lg",
                            result === 'correct' ? 'bg-green-500/20 border-green-500' : '',
                            result === 'incorrect' ? 'bg-red-500/20 border-red-500' : '',
                            !result && 'bg-card'
                            )}
                        initial={{ scale: 0.9, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ x: result === 'myth' ? -300 : 300, opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(e, { offset }) => {
                            if (offset.x < -100) handleAnswer('myth');
                            if (offset.x > 100) handleAnswer('fact');
                        }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.p 
                                key={result ? 'explanation' : 'statement'}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="font-semibold"
                            >
                                {result === 'myth' || result === 'fact' ? activeCard.explanation : activeCard.statement}
                            </motion.p>
                        </AnimatePresence>
                    </motion.div>
                </AnimatePresence>
            </div>
            
            <div className="mt-6 flex w-full justify-around">
                <Button 
                    variant="outline" 
                    className="w-32 h-16 text-lg border-red-500 hover:bg-red-500/10 text-red-500 hover:text-red-500"
                    onClick={() => handleAnswer('myth')}
                    disabled={!!result}
                >
                    {t('myth')}
                </Button>
                <Button 
                    variant="outline" 
                    className="w-32 h-16 text-lg border-green-500 hover:bg-green-500/10 text-green-500 hover:text-green-500"
                    onClick={() => handleAnswer('fact')}
                    disabled={!!result}
                >
                    {t('fact')}
                </Button>
            </div>
            {result && (result === 'correct' || result === 'incorrect') && (
                <Alert className={cn("mt-4", result === 'correct' ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500')}>
                    <AlertTitle>{result === 'correct' ? t('correct') : t('incorrect')}</AlertTitle>
                </Alert>
            )}
        </div>
    )
}
