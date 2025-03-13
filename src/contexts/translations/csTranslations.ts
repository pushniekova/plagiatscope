
import { Translations } from "../languageTypes";

const csTranslations: Translations = {
  nav: {
    home: 'Domů',
    check: 'Kontrola',
    about: 'O nás',
    checkText: 'Kontrola plagiátů',
  },
  footer: {
    rights: 'Všechna práva vyhrazena',
    language: 'Jazyk',
    description: 'ForgenHub - inteligentní nástroj pro detekci a prevenci plagiátů ve vašich textech',
    navigation: 'Navigace',
    legal: 'Právní informace',
    terms: 'Podmínky použití',
    privacy: 'Zásady ochrany osobních údajů',
    cookies: 'Zásady cookies',
    copyright: '© {year} ForgenHub. Všechna práva vyhrazena.',
    tagline: 'Vytvořeno s láskou'
  },
  common: {
    title: 'ForgenHub',
    description: 'Výkonný nástroj pro kontrolu plagiátů s využitím umělé inteligence',
    back: 'Zpět',
    submit: 'Potvrdit',
    loading: 'Načítání...',
    success: 'Úspěch!',
    error: 'Chyba!',
  },
  language: {
    en: 'Angličtina',
    uk: 'Ukrajinština',
    cs: 'Čeština',
  },
  textInput: {
    placeholder: 'Zadejte text ke kontrole...',
    characters: 'znaků',
  },
  auth: {
    welcome: 'Vítejte v ForgenHub',
    signIn: 'Přihlásit se',
    signUp: 'Zaregistrovat se',
    signInDescription: 'Přihlaste se pro přístup ke svému účtu',
    signUpDescription: 'Vytvořte si účet a začněte',
    account: 'Můj účet',
    email: 'E-mail',
    password: 'Heslo',
    phoneNumber: 'Telefonní číslo',
    forgotPassword: 'Zapomenuté heslo?',
    verificationCode: 'Ověřovací kód',
    verify: 'Ověřit',
    alreadyHaveAccount: 'Již máte účet?',
    dontHaveAccount: 'Nemáte účet?',
    or: 'nebo',
    continue: 'Pokračovat',
    continueWithGoogle: 'Pokračovat s Google',
  },
  hero: {
    badge: 'Nástroj s umělou inteligencí',
    title: 'Kontrola plagiátů s <span>ForgenHub</span>',
    description: 'Výkonný online nástroj, který pomáhá odhalit plagiáty a zajistit originalitu vašeho obsahu',
    checkButton: 'Zkontrolovat text',
    learnMore: 'Zjistit více'
  },
  feature: {
    analysis: {
      title: 'Hloubková analýza',
      description: 'Podrobné skenování textu k identifikaci potenciálních shod'
    },
    fast: {
      title: 'Rychlá kontrola',
      description: 'Získejte výsledky během několika sekund'
    },
    reports: {
      title: 'Podrobné zprávy',
      description: 'Jasné zprávy se zvýrazněnými problematickými oblastmi'
    }
  },
  howItWorks: {
    badge: 'Jak to funguje',
    title: 'Jednoduchý třístupňový proces',
    description: 'Rychle zkontrolujte originalitu svého textu pomocí pokročilé technologie umělé inteligence',
    step1: {
      number: '1',
      title: 'Nahrání textu',
      description: 'Zadejte nebo nahrajte text, který chcete zkontrolovat na plagiáty'
    },
    step2: {
      number: '2',
      title: 'Analýza pomocí AI',
      description: 'Náš systém umělé inteligence analyzuje text a porovnává ho s mnoha zdroji'
    },
    step3: {
      number: '3',
      title: 'Získání výsledků',
      description: 'Obdržíte podrobnou zprávu s procentem originality a zjištěnými shodami'
    },
    tryItNow: 'Vyzkoušejte nyní'
  },
  features: {
    badge: 'Funkce',
    title: 'Pokročilé funkce pro přesnou kontrolu',
    description: 'ForgenHub poskytuje nástroje potřebné k efektivnímu boji proti plagiátům',
    upload: {
      title: 'Snadné nahrávání',
      description: 'Zadejte text nebo nahrajte soubory pro rychlou kontrolu'
    },
    analysis: {
      title: 'Inteligentní analýza',
      description: 'Naše AI kontroluje váš text proti milionům zdrojů'
    },
    reports: {
      title: 'Podrobné zprávy',
      description: 'Získejte jasné zprávy se zvýrazněnými shodami a odkazy na zdroje'
    },
    languages: {
      title: 'Vícejazyčná podpora',
      description: 'Kontrolujte texty v češtině, angličtině a ukrajinštině'
    }
  },
  stats: {
    accuracy: '99,8 %',
    accuracyLabel: 'přesnost',
    documents: '10M+',
    documentsLabel: 'zkontrolovaných dokumentů',
    checkTime: '<3 s',
    checkTimeLabel: 'doba kontroly',
    support: '24/7',
    supportLabel: 'podpora'
  },
  cta: {
    title: 'Připraveni zkontrolovat svůj text?',
    description: 'Začněte používat ForgenHub ještě dnes a zajistěte originalitu svého obsahu',
    button: 'Zkontrolovat nyní'
  },
  check: {
    badge: 'AI kontrola',
    title: 'Kontrola textu na plagiáty',
    description: 'Vložte text nebo nahrajte soubor ke kontrole na plagiáty',
    pasteText: 'Vložit text',
    uploadFile: 'Nahrát soubor',
    textPlaceholder: 'Vložte text ke kontrole...',
    noticeTitle: 'Důležitá informace',
    noticeText: 'Pro nejlepší výsledky používejte texty s alespoň 300 slovy',
    checkButton: 'Zkontrolovat',
    analyzing: 'Analyzuji...',
    resultsTitle: 'Výsledky kontroly',
    featuresTitle: 'Funkce naší kontroly',
    featuresDescription: 'ForgenHub nabízí pokročilé nástroje pro detekci plagiátů v textech',
    feature1: {
      title: 'Hloubková analýza',
      description: 'Podrobné skenování textu k identifikaci potenciálních shod'
    },
    feature2: {
      title: 'Podpora jazyků',
      description: 'Kontrola textů v různých jazycích se stejnou přesností'
    },
    feature3: {
      title: 'Podrobná zpráva',
      description: 'Získejte kompletní zprávu s odkazy na zdroje'
    },
    fileUploaded: 'Soubor nahrán',
    fileLoadedMessage: 'Text ze souboru byl úspěšně nahrán',
    emptyText: 'Prázdný text',
    enterTextMessage: 'Zadejte text ke kontrole nebo nahrajte soubor',
  },
  about: {
    badge: 'O ForgenHub',
    title: 'Naše mise a hodnoty',
    description: 'Zjistěte více o naší technologii a přístupu k boji proti plagiátům',
    mission: {
      label: 'Naše mise',
      title: 'Podpora akademické a tvůrčí integrity',
      description1: 'Vytvořili jsme ForgenHub, abychom pomohli autorům, studentům a výzkumníkům chránit jejich práci a ověřit originalitu textů.',
      description2: 'Naším cílem je poskytnout dostupný a přesný nástroj pro detekci plagiátů, který pomůže vytvořit poctivější a transparentnější intelektuální prostředí.',
      button: 'Vyzkoušet kontrolu'
    },
    values: {
      title: 'Naše hodnoty',
      integrity: {
        title: 'Integrita',
        description: 'Věříme v důležitost originality a intelektuální poctivosti'
      },
      accuracy: {
        title: 'Přesnost',
        description: 'Snažíme se poskytovat nejpřesnější výsledky ověření'
      },
      innovation: {
        title: 'Inovace',
        description: 'Neustále vylepšujeme naše algoritmy a přístupy'
      }
    },
    technology: {
      label: 'Technologie',
      title: 'Jak náš systém funguje',
      description: 'ForgenHub používá pokročilé algoritmy strojového učení a umělé inteligence k analýze textů a detekci plagiátů'
    },
    textProcessing: {
      title: 'Zpracování textu',
      step1: 'Sémantická analýza textu pro pochopení kontextu',
      step2: 'Rozdělení na smysluplné fragmenty pro zlepšení přesnosti',
      step3: 'Odstranění šumu a normalizace textu',
      step4: 'Vytvoření digitálních otisků pro porovnání'
    },
    comparison: {
      title: 'Proces porovnávání',
      step1: 'Vyhledávání v databázi akademických a internetových zdrojů',
      step2: 'Porovnání s miliony dokumentů v reálném čase',
      step3: 'Detekce přímých i parafrázovaných výpůjček',
      step4: 'Generování podrobné zprávy s procentem shod'
    },
    languages: {
      title: 'Podpora jazyků',
      description: 'Náš systém dokáže analyzovat texty v různých jazycích a zajistit přesnost ověření bez ohledu na původní jazyk'
    },
    cta: {
      title: 'Připraveni zkontrolovat svůj text?',
      description: 'Začněte používat ForgenHub ještě dnes a zajistěte originalitu svého obsahu',
      button: 'Zkontrolovat nyní'
    }
  },
  legal: {
    terms: {
      title: 'Podmínky použití',
      description: 'Přečtěte si tyto podmínky pozorně před použitím naší služby.',
      section1: {
        title: 'Přijetí podmínek',
        paragraph1: 'Používáním ForgenHub souhlasíte s dodržováním těchto Podmínek použití, našich Zásad ochrany osobních údajů a Zásad cookies. Pokud s těmito podmínkami nesouhlasíte, nepoužívejte prosím naši službu.',
        paragraph2: 'Vyhrazujeme si právo tyto podmínky kdykoli změnit. Pokračováním v používání ForgenHub po takových změnách tyto změny přijímáte.'
      },
      section2: {
        title: 'Použití služby',
        paragraph1: 'ForgenHub poskytuje nástroje pro kontrolu textů na plagiáty. Naše služba je navržena tak, aby pomáhala zajistit originalitu obsahu, ale nezaručuje odhalení všech možných případů plagiátů.',
        paragraph2: 'Používáním naší služby souhlasíte s tím, že:',
        bullet1: 'Nebudete používat službu pro nelegální účely',
        bullet2: 'Nebudete porušovat práva duševního vlastnictví třetích stran',
        bullet3: 'Nebudete se pokoušet získat neoprávněný přístup k našemu systému',
        bullet4: 'Nebudete šířit škodlivý software prostřednictvím naší služby'
      },
      section3: {
        title: 'Uživatelský účet',
        paragraph1: 'Pro použití některých funkcí naší služby může být nutné vytvoření účtu. Jste zodpovědní za zachování důvěrnosti svých přihlašovacích údajů a za všechny aktivity, které se odehrávají pod vaším účtem.',
        paragraph2: 'Vyhrazujeme si právo smazat nebo zablokovat jakýkoli účet, který podle našeho názoru porušuje tyto podmínky.'
      },
      section4: {
        title: 'Duševní vlastnictví',
        paragraph1: 'Veškerý obsah poskytovaný prostřednictvím ForgenHub, včetně, ale ne výhradně, log, textů, grafiky, kódu a softwaru, je chráněn autorskými právy, ochrannými známkami a dalšími zákony o duševním vlastnictví.',
        paragraph2: 'Získáváte omezenou, nevýhradní licenci k používání naší služby v souladu s těmito podmínkami. Tato licence nezahrnuje právo kopírovat nebo upravovat naše materiály nebo vytvářet odvozená díla založená na nich.'
      },
      section5: {
        title: 'Odmítnutí odpovědnosti',
        paragraph1: 'ForgenHub je poskytován "tak, jak je" a "jak je dostupný" bez jakýchkoli záruk, ať už výslovných nebo implikovaných. Nezaručujeme, že naše služba bude nepřerušovaná, bezpečná nebo bez chyb.',
        paragraph2: 'Neneseme odpovědnost za žádné přímé, nepřímé, náhodné, zvláštní nebo následné škody, které mohou vzniknout v souvislosti s používáním nebo nemožností používat naši službu.'
      },
      lastUpdated: 'Poslední aktualizace: 17. července 2023'
    },
    privacy: {
      title: 'Zásady ochrany osobních údajů',
      description: 'Ochranu vašich osobních údajů bereme vážně. Zjistěte, jak shromažďujeme, používáme a chráníme vaše informace.',
      section1: {
        title: 'Shromažďování informací',
        paragraph1: 'Shromažďujeme informace, které poskytujete přímo při používání naší služby, včetně registračních údajů, textů, které předkládáte ke kontrole, a dalších informací, které dobrovolně poskytujete.',
        paragraph2: 'Také automaticky shromažďujeme určité informace o vašem používání naší služby, včetně IP adresy, typu prohlížeče, operačního systému, času návštěvy a dalších údajů o používání.'
      },
      section2: {
        title: 'Použití informací',
        paragraph1: 'Shromážděné informace používáme pro:',
        bullet1: 'Poskytování a udržování naší služby',
        bullet2: 'Zlepšování a vývoj naší služby',
        bullet3: 'Komunikaci s vámi ohledně vašeho účtu nebo změn v našich podmínkách',
        bullet4: 'Ochranu před podvodnými nebo nelegálními činnostmi',
        bullet5: 'Analýzu trendů používání a aktivity na naší službě'
      },
      section3: {
        title: 'Sdílení informací',
        paragraph1: 'Neprodáváme, nevyměňujeme ani nepředáváme vaše osobní údaje třetím stranám bez vašeho souhlasu, s výjimkou případů popsaných v těchto zásadách.',
        paragraph2: 'Můžeme sdílet informace s poskytovateli služeb, kteří nám pomáhají v našich operacích, s orgány činnými v trestním řízení, pokud to vyžaduje zákon, nebo v případě reorganizace našeho podnikání.'
      },
      section4: {
        title: 'Zabezpečení dat',
        paragraph1: 'Přijímáme přiměřená opatření k ochraně vašich osobních údajů před neoprávněným přístupem, použitím nebo zveřejněním. Žádný způsob přenosu přes internet nebo metoda elektronického ukládání však není absolutně bezpečná.',
        paragraph2: 'Jste také zodpovědní za zachování důvěrnosti svého účtu a hesla a za omezení přístupu k vašemu počítači nebo zařízení.'
      },
      section5: {
        title: 'Vaše práva',
        paragraph1: 'V závislosti na vaší lokalitě můžete mít určitá práva týkající se vašich osobních údajů, včetně práva na přístup, opravu, smazání vašich informací nebo omezení zpracování.',
        paragraph2: 'Pro uplatnění těchto práv nebo pokud máte dotazy ohledně našich Zásad ochrany osobních údajů, kontaktujte nás prosím na níže uvedené adrese.'
      },
      lastUpdated: 'Poslední aktualizace: 17. července 2023'
    },
    cookies: {
      title: 'Zásady cookies',
      description: 'Tyto zásady vysvětlují, jak používáme cookies a podobné technologie na našem webu.',
      section1: {
        title: 'Co jsou cookies',
        paragraph1: 'Cookies jsou malé textové soubory, které se ukládají na vašem zařízení (počítači, tabletu nebo mobilním telefonu) při návštěvě webových stránek. Jsou široce používány k zajištění fungování webových stránek nebo jejich efektivnějšího fungování.',
        paragraph2: 'Cookies také umožňují webům zapamatovat si vaše preference a poskytnout vám personalizovaný zážitek.'
      },
      section2: {
        title: 'Typy cookies, které používáme',
        paragraph1: 'Používáme různé typy cookies pro různé účely:',
        bullet1: 'Nezbytné cookies: Tyto cookies jsou nezbytné pro fungování našeho webu a nemohou být v našich systémech vypnuty.',
        bullet2: 'Analytické cookies: Tyto cookies nám umožňují sledovat a analyzovat používání našeho webu, abychom mohli měřit a zlepšovat jeho výkon.',
        bullet3: 'Funkční cookies: Tyto cookies umožňují našemu webu zapamatovat si volby, které děláte, a poskytovat rozšířené, více personalizované funkce.',
        bullet4: 'Reklamní cookies: Tyto cookies se používají k zobrazování reklam, které vás pravděpodobně zaujmou na základě vašich návyků procházení.'
      },
      section3: {
        title: 'Správa cookies',
        paragraph1: 'Většina webových prohlížečů umožňuje kontrolovat cookies prostřednictvím nastavení preferencí. Pokud však omezíte naši schopnost nastavovat cookies, může to ovlivnit váš celkový zážitek s webem a omezit přístup k některým funkcím.',
        paragraph2: 'Pokyny pro správu cookies v populárních prohlížečích lze nalézt na oficiálních webových stránkách příslušných prohlížečů.'
      },
      section4: {
        title: 'Cookies třetích stran',
        paragraph1: 'Můžeme také používat cookies třetích stran, které vlastní a spravují jiné strany, jako je Google Analytics. Tyto společnosti mohou používat cookies ke sledování vaší aktivity v průběhu času a na různých webových stránkách.',
        paragraph2: 'Nekontrolujeme cookies třetích stran a měli byste si zkontrolovat zásady ochrany osobních údajů a cookies těchto třetích stran, pokud potřebujete další informace o jejich postupech.'
      },
      lastUpdated: 'Poslední aktualizace: 17. července 2023'
    }
  }
};

export default csTranslations;
