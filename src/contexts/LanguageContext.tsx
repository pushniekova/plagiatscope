import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define our supported languages
export type Language = 'uk' | 'cs' | 'en';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Define all our translations
const translations: Record<Language, Record<string, string>> = {
  uk: {
    // Navigation
    'nav.home': 'Головна',
    'nav.check': 'Перевірка',
    'nav.about': 'Про нас',
    'nav.checkText': 'Перевірити текст',
    
    // Hero section
    'hero.badge': 'Сучасне виявлення плагіату',
    'hero.title': 'Забезпечте <span>оригінальність</span> вашого контенту з точністю',
    'hero.description': 'Розширений аналіз тексту для студентів, викладачів та авторів контенту. Швидкий, точний та простий у використанні сервіс виявлення плагіату.',
    'hero.checkButton': 'Перевірити текст',
    'hero.learnMore': 'Дізнатися більше',
    
    // Feature cards
    'feature.analysis.title': 'Точний аналіз',
    'feature.analysis.description': 'Сучасні алгоритми для точного виявлення плагіату',
    'feature.fast.title': 'Блискавична швидкість',
    'feature.fast.description': 'Отримуйте результати за секунди, а не хвилини чи години',
    'feature.reports.title': 'Детальні звіти',
    'feature.reports.description': 'Вичерпні звіти з виділенням потенційних проблем',
    
    // How It Works section
    'howItWorks.badge': 'Як це працює',
    'howItWorks.title': 'Просто, швидко та ефективно',
    'howItWorks.description': 'Наш процес виявлення плагіату розроблений, щоб бути простим і потужним, надаючи вам точні результати за кілька кліків.',
    'howItWorks.step1.number': '01',
    'howItWorks.step1.title': 'Відправте ваш текст',
    'howItWorks.step1.description': 'Завантажте документ або вставте текст безпосередньо в наш перевірник.',
    'howItWorks.step2.number': '02',
    'howItWorks.step2.title': 'Розширений аналіз',
    'howItWorks.step2.description': 'Наші алгоритми сканують ваш текст по мільярдах джерел.',
    'howItWorks.step3.number': '03',
    'howItWorks.step3.title': 'Перегляд детальних результатів',
    'howItWorks.step3.description': 'Отримайте вичерпний звіт із виділеними збігами та джерелами.',
    'howItWorks.tryItNow': 'Спробуйте зараз',
    
    // Features section
    'features.badge': 'Можливості',
    'features.title': 'Потужні інструменти для аналізу тексту',
    'features.description': 'Відкрийте для себе повний набір функцій, які виділяють наш сервіс виявлення плагіату.',
    'features.upload.title': 'Завантаження та вставка тексту',
    'features.upload.description': 'Легко надсилайте контент, завантажуючи файли або безпосередньо вставляючи текст у систему.',
    'features.analysis.title': 'Розширений аналіз',
    'features.analysis.description': 'Наші алгоритми виконують глибокий аналіз тексту для виявлення навіть найтонших випадків плагіату.',
    'features.reports.title': 'Вичерпні звіти',
    'features.reports.description': 'Отримуйте детальні звіти, що виділяють потенційний плагіат і джерела відповідного контенту.',
    'features.languages.title': 'Багато мов',
    'features.languages.description': 'Підтримка кількох мов, включаючи українську, що забезпечує комплексне виявлення плагіату.',
    
    // Stats section
    'stats.accuracy': '99,8%',
    'stats.accuracyLabel': 'Точність виявлення',
    'stats.documents': '10M+',
    'stats.documentsLabel': 'Аналізовані документи',
    'stats.checkTime': '5с',
    'stats.checkTimeLabel': 'Середній час перевірки',
    'stats.support': '24/7',
    'stats.supportLabel': 'Доступна підтримка',
    
    // CTA section
    'cta.title': 'Готові забезпечити оригінальність вашого контенту?',
    'cta.description': 'Приєднуйтесь до тисяч студентів, викладачів та авторів контенту, які довіряють нашому сервісу для точного виявлення плагіату.',
    'cta.button': 'Перевірте свій текст зараз',
    
    // Footer
    'footer.description': 'Сучасний сервіс виявлення плагіату для студентів, викладачів та авторів контенту. Перевіряйте оригінальність вашого тексту з точністю та легкістю.',
    'footer.navigation': 'Навігація',
    'footer.legal': 'Юридична інформація',
    'footer.terms': 'Умови використання',
    'footer.privacy': 'Політика конфіденційності',
    'footer.cookies': 'Політика щодо файлів cookie',
    'footer.copyright': '© {year} PlagiatScope. Усі права захищено.',
    'footer.tagline': 'Зроблено з точністю та турботою',
    
    // Language selector
    'language.uk': 'Українська',
    'language.cs': 'Чеська',
    'language.en': 'Англійська',
    
    // Check page
    'check.badge': 'Перевірка на плагіат',
    'check.title': 'Перевірте текст на оригінальність',
    'check.description': 'Завантажте документ або вставте ваш текст нижче для аналізу на можливий плагіат.',
    'check.pasteText': 'Вставте текст',
    'check.textPlaceholder': 'Вставте або введіть ваш текст тут...',
    'check.uploadFile': 'Завантажте файл',
    'check.noticeTitle': 'Важлива інформація',
    'check.noticeText': 'Це демонстрація сервісу виявлення плагіату. У реальному додатку ваш текст буде аналізуватися з використанням комплексної бази даних джерел.',
    'check.checkButton': 'Перевірити на плагіат',
    'check.analyzing': 'Аналізуємо...',
    'check.featuresTitle': 'Розширена система виявлення плагіату',
    'check.featuresDescription': 'Наш комплексний інструмент допомагає забезпечити академічну доброчесність та оригінальність контенту.',
    'check.feature1.title': 'Точний аналіз',
    'check.feature1.description': 'Передові алгоритми виявляють навіть найтонші випадки плагіату, забезпечуючи комплексне охоплення.',
    'check.feature2.title': 'Багатомовність',
    'check.feature2.description': 'Підтримка багатьох мов, включаючи українську, забезпечує ретельне виявлення плагіату.',
    'check.feature3.title': 'Детальні звіти',
    'check.feature3.description': 'Вичерпні звіти, що виділяють потенційні проблеми та надають практичні рекомендації.',
    'check.fileUploaded': 'Файл успішно завантажено',
    'check.fileLoadedMessage': 'Ваш текст завантажено та готовий до аналізу.',
    'check.emptyText': 'Порожній текст',
    'check.enterTextMessage': 'Будь ласка, введіть текст або завантажте файл для аналізу.',
    'check.resultsTitle': 'Результати аналізу',
    
    // FileUpload component
    'fileUpload.title': 'Завантажити файл',
    'fileUpload.dragAndDrop': 'Перетягніть файл сюди або натисніть для вибору',
    'fileUpload.supportedFormats': 'Підтримувані формати: TXT, DOC, DOCX, PDF (Макс 5МБ)',
    'fileUpload.fileTooLarge': 'Файл завеликий. Максимальний розмір 5МБ.',
    'fileUpload.unsupportedFormat': 'Непідтримуваний формат файлу. Будь ласка, завантажте файл TXT, DOC, DOCX або PDF.',
    'fileUpload.removeFile': 'Видалити файл',
    'fileUpload.contentFrom': 'Вміст з',
    'fileUpload.simulatedContent': 'Це симульований вміст для демонстрації.',
    
    // TextInput component
    'textInput.placeholder': 'Вставте або введіть ваш текст тут...',
    'textInput.characters': 'символів',
    
    // ResultsViewer component
    'results.title': 'Результати аналізу на плагіат',
    'results.similarityScore': 'Оцінка схожості',
    'results.tabs.highlighted': 'Виділений текст',
    'results.tabs.sources': 'Джерела',
    'results.tabs.summary': 'Зведення',
    'results.noPlagiarism': 'У поданому тексті плагіат не виявлено.',
    'results.noSources': 'У проаналізованому тексті не знайдено джерел плагіату.',
    'results.match': 'збіг',
    'results.matchedText': 'Знайдений текст',
    'results.characters': 'символи',
    'results.sourcesFound': 'Знайдено джерел',
    'results.charactersAnalyzed': 'Символів проаналізовано',
    'results.analysisSummary': 'Зведення аналізу',
    'results.summary.low': 'Ваш текст видається дуже оригінальним з мінімальною схожістю з існуючими джерелами.',
    'results.summary.medium': 'Ваш текст містить деякі елементи, які збігаються з існуючими джерелами. Рекомендуємо переглянути виділені фрагменти.',
    'results.summary.high': 'Ваш текст має значні збіги з існуючими джерелами. Ми рекомендуємо ретельно переглянути виділені фрагменти.',
    'results.recommendations': 'Рекомендації',
    'results.recommendation1': 'Перегляньте виділені розділи і переформулюйте їх',
    'results.recommendation2': 'Переконайтеся, що всі цитати належним чином позначені',
    'results.recommendation3': 'Перевірте посилання та цитати на точність',
    'results.recommendation4': 'Розгляньте можливість більш ретельного перегляду вмісту',
  },
  
  cs: {
    // Navigation
    'nav.home': 'Domů',
    'nav.check': 'Kontrola',
    'nav.about': 'O nás',
    'nav.checkText': 'Zkontrolovat text',
    
    // Hero section
    'hero.badge': 'Moderní detekce plagiátů',
    'hero.title': 'Zajistěte <span>originalitu</span> vašeho obsahu s přesností',
    'hero.description': 'Pokročilá analýza textu pro studenty, učitele a tvůrce obsahu. Rychlá, přesná a snadno použitelná služba pro detekci plagiátů.',
    'hero.checkButton': 'Zkontrolovat text',
    'hero.learnMore': 'Více informací',
    
    // Feature cards
    'feature.analysis.title': 'Přesná analýza',
    'feature.analysis.description': 'Nejmodernější algoritmy pro přesnou detekci plagiátů',
    'feature.fast.title': 'Bleskově rychlé',
    'feature.fast.description': 'Získejte výsledky během sekund, ne minut nebo hodin',
    'feature.reports.title': 'Podrobné zprávy',
    'feature.reports.description': 'Komplexní zprávy zvýrazňující potenciální problémy',
    
    // How It Works section
    'howItWorks.badge': 'Jak to funguje',
    'howItWorks.title': 'Jednoduché, rychlé a efektivní',
    'howItWorks.description': 'Náš proces detekce plagiátů je navržen tak, aby byl přímočarý a výkonný, poskytující vám přesné výsledky během několika kliknutí.',
    'howItWorks.step1.number': '01',
    'howItWorks.step1.title': 'Vložte svůj text',
    'howItWorks.step1.description': 'Nahrajte dokument nebo přímo vložte svůj text do našeho kontroloru.',
    'howItWorks.step2.number': '02',
    'howItWorks.step2.title': 'Pokročilá analýza',
    'howItWorks.step2.description': 'Naše algoritmy porovnávají váš text s miliardami zdrojů.',
    'howItWorks.step3.number': '03',
    'howItWorks.step3.title': 'Zobrazení podrobných výsledků',
    'howItWorks.step3.description': 'Získejte komplexní zprávu se zvýrazněnými shodami a zdroji.',
    'howItWorks.tryItNow': 'Vyzkoušejte nyní',
    
    // Features section
    'features.badge': 'Funkce',
    'features.title': 'Výkonné nástroje pro analýzu textu',
    'features.description': 'Objevte komplexní sadu funkcí, které odlišují naši službu detekce plagiátů.',
    'features.upload.title': 'Nahrání nebo vložení textu',
    'features.upload.description': 'Snadno odešlete obsah nahráním souborů nebo přímým vložením textu do systému.',
    'features.analysis.title': 'Pokročilá analýza',
    'features.analysis.description': 'Naše algoritmy provádějí hlubokou analýzu textu k odhalení i těch nejjemnějších případů plagiátorství.',
    'features.reports.title': 'Komplexní zprávy',
    'features.reports.description': 'Získejte podrobné zprávy zvýrazňující potenciální plagiátorství a zdroje shodného obsahu.',
    'features.languages.title': 'Více jazyků',
    'features.languages.description': 'Podpora více jazyků včetně ukrajinštiny, zajišťující komplexní detekci plagiátů.',
    
    // Stats section
    'stats.accuracy': '99,8%',
    'stats.accuracyLabel': 'Přesnost detekce',
    'stats.documents': '10M+',
    'stats.documentsLabel': 'Analyzovaných dokumentů',
    'stats.checkTime': '5s',
    'stats.checkTimeLabel': 'Průměrný čas kontroly',
    'stats.support': '24/7',
    'stats.supportLabel': 'Dostupná podpora',
    
    // CTA section
    'cta.title': 'Jste připraveni zajistit originalitu vašeho obsahu?',
    'cta.description': 'Připojte se k tisícům studentů, učitelů a tvůrců obsahu, kteří důvěřují naší službě pro přesnou detekci plagiátů.',
    'cta.button': 'Zkontrolujte svůj text nyní',
    
    // Footer
    'footer.description': 'Pokročilá služba pro detekci plagiátů pro studenty, učitele a tvůrce obsahu. Zkontrolujte originalitu svého textu s přesností a snadností.',
    'footer.navigation': 'Navigace',
    'footer.legal': 'Právní informace',
    'footer.terms': 'Podmínky služby',
    'footer.privacy': 'Zásady ochrany osobních údajů',
    'footer.cookies': 'Zásady používání souborů cookie',
    'footer.copyright': '© {year} PlagiatScope. Všechna práva vyhrazena.',
    'footer.tagline': 'Vytvořeno s přesností a péčí',
    
    // Language selector
    'language.uk': 'Ukrajinština',
    'language.cs': 'Čeština',
    'language.en': 'Angličtina',
    
    // Check page
    'check.badge': 'Kontrola plagiátů',
    'check.title': 'Zkontrolujte originalitu vašeho textu',
    'check.description': 'Nahrajte dokument nebo vložte svůj text níže pro analýzu možných plagiátů.',
    'check.pasteText': 'Vložit text',
    'check.textPlaceholder': 'Vložte nebo napište svůj text zde...',
    'check.uploadFile': 'Nahrát soubor',
    'check.noticeTitle': 'Důležité upozornění',
    'check.noticeText': 'Toto je ukázka služby pro detekci plagiátů. V reálné aplikaci by byl váš text analyzován oproti komplexní databázi zdrojů.',
    'check.checkButton': 'Zkontrolovat na plagiáty',
    'check.analyzing': 'Analyzuji...',
    'check.featuresTitle': 'Pokročilá detekce plagiátů',
    'check.featuresDescription': 'Náš komplexní nástroj pomáhá zajistit akademickou integritu a originalitu obsahu.',
    'check.feature1.title': 'Přesná analýza',
    'check.feature1.description': 'Pokročilé algoritmy detekují i ty nejjemnější případy plagiátorství a zajišťují komplexní pokrytí.',
    'check.feature2.title': 'Více jazyků',
    'check.feature2.description': 'Podpora více jazyků, včetně ukrajinštiny, zajišťující důkladnou detekci plagiátů.',
    'check.feature3.title': 'Podrobné zprávy',
    'check.feature3.description': 'Komplexní zprávy zvýrazňující potenciální problémy a poskytující praktická doporučení.',
    'check.fileUploaded': 'Soubor úspěšně nahrán',
    'check.fileLoadedMessage': 'Váš text byl načten a je připraven k analýze.',
    'check.emptyText': 'Prázdný text',
    'check.enterTextMessage': 'Prosím vložte text nebo nahrajte soubor pro analýzu.',
    'check.resultsTitle': 'Výsledky analýzy',
    
    // FileUpload component
    'fileUpload.title': 'Nahrát soubor',
    'fileUpload.dragAndDrop': 'Přetáhněte soubor sem nebo klikněte pro výběr',
    'fileUpload.supportedFormats': 'Podporované formáty: TXT, DOC, DOCX, PDF (Max 5MB)',
    'fileUpload.fileTooLarge': 'Soubor je příliš velký. Maximální velikost je 5MB.',
    'fileUpload.unsupportedFormat': 'Nepodporovaný formát souboru. Nahrajte prosím soubor TXT, DOC, DOCX nebo PDF.',
    'fileUpload.removeFile': 'Odstranit soubor',
    'fileUpload.contentFrom': 'Obsah z',
    'fileUpload.simulatedContent': 'Toto je simulovaný obsah pro ukázku.',
    
    // TextInput component
    'textInput.placeholder': 'Vložte nebo napište svůj text zde...',
    'textInput.characters': 'znaků',
    
    // ResultsViewer component
    'results.title': 'Výsledky analýzy plagiátů',
    'results.similarityScore': 'Skóre podobnosti',
    'results.tabs.highlighted': 'Zvýrazněný text',
    'results.tabs.sources': 'Zdroje',
    'results.tabs.summary': 'Shrnutí',
    'results.noPlagiarism': 'V předloženém textu nebyl zjištěn žádný plagiát.',
    'results.noSources': 'V analyzovaném textu nebyly nalezeny žádné zdroje plagiátů.',
    'results.match': 'shoda',
    'results.matchedText': 'Shodný text',
    'results.characters': 'znaky',
    'results.sourcesFound': 'Nalezené zdroje',
    'results.charactersAnalyzed': 'Analyzovaných znaků',
    'results.analysisSummary': 'Shrnutí analýzy',
    'results.summary.low': 'Váš text se jeví jako vysoce originální s minimální podobností s existujícími zdroji.',
    'results.summary.medium': 'Váš text obsahuje některé prvky, které se shodují s existujícími zdroji. Doporučujeme zkontrolovat zvýrazněné části.',
    'results.summary.high': 'Váš text má významný překryv s existujícími zdroji. Doporučujeme důkladně revidovat zvýrazněné části.',
    'results.recommendations': 'Doporučení',
    'results.recommendation1': 'Zkontrolujte zvýrazněné části a zvažte přeformulování',
    'results.recommendation2': 'Ujistěte se, že jsou všechny citace řádně označeny',
    'results.recommendation3': 'Zkontrolujte přesnost referencí a citací',
    'results.recommendation4': 'Zvažte důkladnější revizi obsahu',
  },
  
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.check': 'Check',
    'nav.about': 'About',
    'nav.checkText': 'Check Text',
    
    // Hero section
    'hero.badge': 'Modern plagiarism detection',
    'hero.title': 'Ensure Your Content\'s <span>Originality</span> with Precision',
    'hero.description': 'Advanced text analysis for students, teachers, and content creators. Fast, accurate, and easy-to-use plagiarism detection service.',
    'hero.checkButton': 'Check Your Text',
    'hero.learnMore': 'Learn More',
    
    // Feature cards
    'feature.analysis.title': 'Precise Analysis',
    'feature.analysis.description': 'State-of-the-art algorithms for accurate plagiarism detection',
    'feature.fast.title': 'Lightning Fast',
    'feature.fast.description': 'Get results within seconds, not minutes or hours',
    'feature.reports.title': 'Detailed Reports',
    'feature.reports.description': 'Comprehensive reports highlighting potential issues',
    
    // How It Works section
    'howItWorks.badge': 'How It Works',
    'howItWorks.title': 'Simple, Fast, and Effective',
    'howItWorks.description': 'Our plagiarism detection process is designed to be straightforward and powerful, giving you accurate results in just a few clicks.',
    'howItWorks.step1.number': '01',
    'howItWorks.step1.title': 'Submit Your Text',
    'howItWorks.step1.description': 'Upload a document or paste your text directly into our checker.',
    'howItWorks.step2.number': '02',
    'howItWorks.step2.title': 'Advanced Analysis',
    'howItWorks.step2.description': 'Our algorithms scan your text against billions of sources.',
    'howItWorks.step3.number': '03',
    'howItWorks.step3.title': 'View Detailed Results',
    'howItWorks.step3.description': 'Get a comprehensive report with highlighted matches and sources.',
    'howItWorks.tryItNow': 'Try It Now',
    
    // Features section
    'features.badge': 'Features',
    'features.title': 'Powerful Tools for Text Analysis',
    'features.description': 'Discover the comprehensive suite of features that make our plagiarism detection service stand out.',
    'features.upload.title': 'Upload or Paste Text',
    'features.upload.description': 'Easily submit content by uploading files or directly pasting text into the system.',
    'features.analysis.title': 'Advanced Analysis',
    'features.analysis.description': 'Our algorithms perform deep text analysis to detect even the most subtle instances of plagiarism.',
    'features.reports.title': 'Comprehensive Reports',
    'features.reports.description': 'Receive detailed reports highlighting potential plagiarism and sources of matched content.',
    'features.languages.title': 'Multiple Languages',
    'features.languages.description': 'Support for multiple languages, including Ukrainian, ensuring comprehensive plagiarism detection.',
    
    // Stats section
    'stats.accuracy': '99.8%',
    'stats.accuracyLabel': 'Detection Accuracy',
    'stats.documents': '10M+',
    'stats.documentsLabel': 'Documents Analyzed',
    'stats.checkTime': '5s',
    'stats.checkTimeLabel': 'Average Check Time',
    'stats.support': '24/7',
    'stats.supportLabel': 'Available Support',
    
    // CTA section
    'cta.title': 'Ready to Ensure Your Content\'s Originality?',
    'cta.description': 'Join thousands of students, teachers, and content creators who trust our service for accurate plagiarism detection.',
    'cta.button': 'Check Your Text Now',
    
    // Footer
    'footer.description': 'Advanced plagiarism detection service for students, teachers, and content creators. Check your text for originality with precision and ease.',
    'footer.navigation': 'Navigation',
    'footer.legal': 'Legal',
    'footer.terms': 'Terms of Service',
    'footer.privacy': 'Privacy Policy',
    'footer.cookies': 'Cookie Policy',
    'footer.copyright': '© {year} PlagiatScope. All rights reserved.',
    'footer.tagline': 'Made with precision and care',
    
    // Language selector
    'language.uk': 'Ukrainian',
    'language.cs': 'Czech',
    'language.en': 'English',
    
    // Check page
    'check.badge': 'Plagiarism Checker',
    'check.title': 'Check Your Text for Originality',
    'check.description': 'Upload a document or paste your text below to analyze for potential plagiarism.',
    'check.pasteText': 'Paste Text',
    'check.textPlaceholder': 'Paste or type your text here...',
    'check.uploadFile': 'Upload File',
    'check.noticeTitle': 'Important Notice',
    'check.noticeText': 'This is a demonstration of the plagiarism detection service. In a real application, your text would be analyzed against a comprehensive database of sources.',
    'check.checkButton': 'Check for Plagiarism',
    'check.analyzing': 'Analyzing...',
    'check.featuresTitle': 'Advanced Plagiarism Detection',
    'check.featuresDescription': 'Our comprehensive tool helps ensure academic integrity and content originality.',
    'check.feature1.title': 'Precise Analysis',
    'check.feature1.description': 'Advanced algorithms detect even subtle instances of plagiarism, ensuring comprehensive coverage.',
    'check.feature2.title': 'Multiple Languages',
    'check.feature2.description': 'Support for multiple languages, including Ukrainian, ensuring thorough plagiarism detection.',
    'check.feature3.title': 'Detailed Reports',
    'check.feature3.description': 'Comprehensive reports that highlight potential issues and provide actionable insights.',
    'check.fileUploaded': 'File uploaded successfully',
    'check.fileLoadedMessage': 'Your text has been loaded and is ready for analysis.',
    'check.emptyText': 'Empty text',
    'check.enterTextMessage': 'Please enter some text or upload a file to analyze.',
    'check.resultsTitle': 'Analysis Results',
    
    // FileUpload component
    'fileUpload.title': 'Upload a file',
    'fileUpload.dragAndDrop': 'Drag and drop a file here or click to browse',
    'fileUpload.supportedFormats': 'Supported formats: TXT, DOC, DOCX, PDF (Max 5MB)',
    'fileUpload.fileTooLarge': 'File is too large. Maximum size is 5MB.',
    'fileUpload.unsupportedFormat': 'Unsupported file type. Please upload a TXT, DOC, DOCX, or PDF file.',
    'fileUpload.removeFile': 'Remove file',
    'fileUpload.contentFrom': 'Content extracted from',
    'fileUpload.simulatedContent': 'This is simulated content for demo purposes.',
    
    // TextInput component
    'textInput.placeholder': 'Paste or type your text here...',
    'textInput.characters': 'characters',
    
    // ResultsViewer component
    'results.title': 'Plagiarism Analysis Results',
    'results.similarityScore': 'Similarity Score',
    'results.tabs.highlighted': 'Highlighted Text',
    'results.tabs.sources': 'Sources',
    'results.tabs.summary': 'Summary',
    'results.noPlagiarism': 'No plagiarism detected in the submitted text.',
    'results.noSources': 'No plagiarism sources found in the analyzed text.',
    'results.match': 'match',
    'results.matchedText': 'Matched text',
    'results.characters': 'characters',
    'results.sourcesFound': 'Sources Found',
    'results.charactersAnalyzed': 'Characters Analyzed',
    'results.analysisSummary': 'Analysis Summary',
    'results.summary.low': 'Your text appears to be highly original with minimal similarity to existing sources.',
    'results.summary.medium': 'Your text contains some elements that match existing sources. Consider reviewing the highlighted sections.',
    'results.summary.high': 'Your text has significant overlap with existing sources. We recommend thoroughly revising the highlighted sections.',
    'results.recommendations': 'Recommendations',
    'results.recommendation1': 'Review highlighted sections and consider rephrasing',
    'results.recommendation2': 'Ensure all quotes are properly cited',
    'results.recommendation3': 'Check references and citations for accuracy',
    'results.recommendation4': 'Consider a more thorough revision of the content',
  }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Set Ukrainian as the default language
  const [language, setLanguage] = useState<Language>('uk');

  // Function to get a translated string
  const t = (key: string): string => {
    // Return the key itself if translation is not found
    return translations[language][key] || key;
  };

  // Load language preference from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
