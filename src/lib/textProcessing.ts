
// This module provides text processing utilities for plagiarism detection

/**
 * Normalizes text (lowercase, punctuation removal)
 */
export const normalizeText = (text: string): string => {
  return text.toLowerCase().replace(/[^\w\s]/g, '');
};

/**
 * Tokenizes text (splitting text into words)
 */
export const tokenizeText = (text: string): string[] => {
  return text.split(/\s+/).filter(word => word.length > 0);
};

/**
 * Generates n-grams (sequences of n consecutive words)
 */
export const generateNGrams = (tokens: string[], n: number): string[] => {
  const ngrams: string[] = [];
  for (let i = 0; i <= tokens.length - n; i++) {
    ngrams.push(tokens.slice(i, i + n).join(' '));
  }
  return ngrams;
};

/**
 * Calculates term frequency (TF) for each term in a document
 */
export const calculateTF = (tokens: string[]): Record<string, number> => {
  const tf: Record<string, number> = {};
  tokens.forEach(token => {
    tf[token] = (tf[token] || 0) + 1;
  });
  return tf;
};

/**
 * Calculates cosine similarity between two vectors
 */
export const calculateCosineSimilarity = (
  vec1: Record<string, number>,
  vec2: Record<string, number>
): number => {
  let dotProduct = 0;
  let magnitude1 = 0;
  let magnitude2 = 0;

  // Calculate dot product
  for (const key in vec1) {
    if (vec2[key]) {
      dotProduct += vec1[key] * vec2[key];
    }
    magnitude1 += vec1[key] * vec1[key];
  }

  // Calculate magnitude of vec2
  for (const key in vec2) {
    magnitude2 += vec2[key] * vec2[key];
  }

  // Calculate magnitudes
  magnitude1 = Math.sqrt(magnitude1);
  magnitude2 = Math.sqrt(magnitude2);

  // Prevent division by zero
  if (magnitude1 === 0 || magnitude2 === 0) {
    return 0;
  }

  // Return cosine similarity
  return dotProduct / (magnitude1 * magnitude2);
};

// Simulated database of documents for comparison
const databaseSources = [
  {
    id: "source-1",
    title: "Основи академічної доброчесності",
    text: `Академічна доброчесність є важливою частиною освітнього процесу. Вона передбачає дотримання певних етичних принципів та правил, які забезпечують якість та чесність у навчанні та дослідженнях. Плагіат є однією з форм порушення академічної доброчесності, яка полягає у використанні чужих ідей, слів або результатів досліджень без належного посилання на джерело.`,
    url: "https://example.com/academic-integrity"
  },
  {
    id: "source-2",
    title: "Технології машинного навчання",
    text: `Машинне навчання - це підгалузь штучного інтелекту, яка фокусується на розробці алгоритмів та моделей, здатних навчатися на основі даних. Воно застосовується у різних сферах, включаючи розпізнавання образів, обробку природної мови, рекомендаційні системи тощо. Глибоке навчання - це підхід машинного навчання, що базується на використанні нейронних мереж з багатьма шарами.`,
    url: "https://example.com/machine-learning"
  },
  {
    id: "source-3",
    title: "Сталий розвиток та екологія",
    text: `Сталий розвиток - це концепція, яка передбачає задоволення потреб сучасного покоління без шкоди для можливості майбутніх поколінь задовольняти свої потреби. Він включає економічний розвиток, соціальну справедливість та екологічну стійкість. Зміна клімату є однією з найбільших загроз для сталого розвитку, що потребує глобальних колективних дій.`,
    url: "https://example.com/sustainable-development"
  },
  {
    id: "source-4",
    title: "Інформаційна безпека в мережі Інтернет",
    text: `Інформаційна безпека в Інтернеті стосується захисту інформації та інформаційних систем від несанкціонованого доступу, використання, розкриття, порушення, модифікації або знищення. Вона включає такі аспекти, як захист приватності, захист від кібератак, безпека паролів тощо. Шифрування є одним із ключових методів забезпечення інформаційної безпеки в Інтернеті.`,
    url: "https://example.com/cybersecurity"
  },
  {
    id: "source-5",
    title: "Квантові обчислення",
    text: `Квантові обчислення - це галузь, що використовує квантово-механічні явища, такі як суперпозиція та заплутаність, для виконання обчислень. Квантові комп'ютери використовують квантові біти або кубіти, які можуть існувати в суперпозиції станів, що дозволяє їм виконувати певні обчислення значно швидше, ніж класичні комп'ютери. Алгоритм Шора і алгоритм Гровера є двома відомими квантовими алгоритмами.`,
    url: "https://example.com/quantum-computing"
  },
  {
    id: "source-6",
    title: "Історія штучного інтелекту",
    text: `Історія штучного інтелекту бере свій початок у 1950-х роках, хоча багато концепцій і ідей з'явилися раніше. Термін "штучний інтелект" був вперше використаний на Дартмутській конференції 1956 року. З того часу галузь пережила кілька фаз, включаючи періоди великого ентузіазму і фінансування (відомі як "літа АІ") і періоди розчарування і скорочення фінансування (відомі як "зими АІ").`,
    url: "https://example.com/ai-history"
  }
];

// Academic sources for more comprehensive comparison
const academicSources = [
  {
    id: "academic-1",
    title: "Етика наукових досліджень",
    text: `У науковій діяльності етика є ключовим аспектом. Дослідники повинні чесно представляти свої методи, результати та висновки. Вони повинні уникати фабрикації, фальсифікації та плагіату. Крім того, дослідження, які включають людей або тварин, повинні проводитися з повагою до їхніх прав та благополуччя. Інформована згода, конфіденційність та справедливість є важливими принципами етики досліджень.`,
    url: "https://example.com/research-ethics"
  },
  {
    id: "academic-2",
    title: "Методологія наукових досліджень",
    text: `Методологія наукових досліджень - це систематичний підхід до вирішення дослідницьких проблем. Вона включає визначення дослідницьких питань, розробку гіпотез, збір та аналіз даних, а також інтерпретацію результатів. Існує багато різних методологій, включаючи експериментальні, спостережні, якісні та кількісні підходи. Вибір методології залежить від природи дослідницького питання та наявних ресурсів.`,
    url: "https://example.com/research-methodology"
  }
];

// External APIs for checking content similarity (simulated)
interface SimulatedAPIResult {
  url: string;
  title: string;
  snippet: string;
  similarity: number;
}

/**
 * Simulates a web search for similar content
 * In a real application, this would call search engine APIs
 */
const simulateWebSearch = async (text: string): Promise<SimulatedAPIResult[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Use only relevant words for search (remove common words)
  const normalizedText = normalizeText(text);
  const tokens = tokenizeText(normalizedText);
  
  // Create a simple search query from the most significant words
  const significantWords = tokens
    .filter(token => token.length > 4) // Only use words with 5+ characters
    .slice(0, 10); // Limit to 10 words
  
  if (significantWords.length === 0) {
    return [];
  }
  
  // Simulated search results
  const webSources = [
    {
      url: "https://uk.wikipedia.org/wiki/Плагіат",
      title: "Плагіат — Вікіпедія",
      snippet: "Плагіат — оприлюднення (опублікування), повністю або частково, чужого твору під іменем особи, яка не є автором цього твору. Плагіат є порушенням авторського права, тобто немайнових (право на ім'я, на оприлюднення тощо) та майнових прав справжнього автора."
    },
    {
      url: "https://uk.wikipedia.org/wiki/Штучний_інтелект",
      title: "Штучний інтелект — Вікіпедія",
      snippet: "Штучний інтелект (ШІ, англ. artificial intelligence, AI) — здатність інженерної системи здобувати, обробляти та застосовувати знання та вміння. Це розділ комп'ютерної лінгвістики та інформатики, що опікується формалізацією проблем та завдань, які подібні до дій, що виконує людина."
    },
    {
      url: "https://uk.wikipedia.org/wiki/Академічна_доброчесність",
      title: "Академічна доброчесність — Вікіпедія",
      snippet: "Академічна доброчесність — це сукупність етичних принципів та визначених законом правил, якими мають керуватися учасники освітнього процесу під час навчання, викладання та провадження наукової діяльності з метою забезпечення довіри до результатів навчання та/або наукових досягнень."
    },
    {
      url: "https://science.ua/ua/article/machine-learning-explained",
      title: "Що таке машинне навчання — пояснюємо простими словами",
      snippet: "Машинне навчання - це підгалузь штучного інтелекту, яка фокусується на розробці алгоритмів та моделей, здатних навчатися на основі даних без явного програмування. Воно застосовується у різних сферах, включаючи розпізнавання образів, обробку природної мови, рекомендаційні системи тощо."
    },
    {
      url: "https://www.ukma.edu.ua/index.php/osvita/akademichna-dobrochesnist",
      title: "Академічна доброчесність - НаУКМА",
      snippet: "Академічна доброчесність є важливою частиною освітнього процесу. Вона передбачає дотримання певних етичних принципів та правил, які забезпечують якість та чесність у навчанні та дослідженнях. Плагіат є однією з форм порушення академічної доброчесності, яка полягає у використанні чужих ідей, слів або результатів досліджень без належного посилання на джерело."
    }
  ];
  
  // Calculate similarity for each source based on overlapping words
  return webSources.map(source => {
    const sourceNormalizedText = normalizeText(source.snippet);
    const sourceTokens = tokenizeText(sourceNormalizedText);
    const sourceTF = calculateTF(sourceTokens);
    const inputTF = calculateTF(tokens);
    
    const similarity = calculateCosineSimilarity(inputTF, sourceTF);
    
    return {
      ...source,
      similarity: similarity * (0.7 + Math.random() * 0.3) // Add some randomness for variation
    };
  })
  .filter(result => result.similarity > 0.1) // Filter out very low similarity results
  .sort((a, b) => b.similarity - a.similarity) // Sort by highest similarity
  .slice(0, 3); // Return top 3 results
};

/**
 * Find matching segments between two texts
 */
export const findMatchingSegments = (text1: string, text2: string, minLength = 10): Array<{
  text: string;
  startIndex: number;
  endIndex: number;
  matchPercentage: number;
}> => {
  const matches: Array<{
    text: string;
    startIndex: number;
    endIndex: number;
    matchPercentage: number;
  }> = [];
  
  // Normalize texts for comparison
  const normalizedText1 = text1.toLowerCase();
  const normalizedText2 = text2.toLowerCase();
  
  // Generate n-grams for the second text (used as comparison base)
  const words2 = normalizedText2.split(/\s+/);
  const ngrams: Record<string, number> = {};
  
  // We'll use different n-gram sizes to catch different length matches
  for (let ngramSize = 3; ngramSize <= 8; ngramSize++) {
    for (let i = 0; i <= words2.length - ngramSize; i++) {
      const ngram = words2.slice(i, i + ngramSize).join(' ');
      if (ngram.length >= minLength) {
        ngrams[ngram] = i;
      }
    }
  }
  
  // Find matches in the first text
  const words1 = normalizedText1.split(/\s+/);
  
  for (let ngramSize = 8; ngramSize >= 3; ngramSize--) {
    for (let i = 0; i <= words1.length - ngramSize; i++) {
      const ngram = words1.slice(i, i + ngramSize).join(' ');
      
      if (ngrams[ngram] !== undefined && ngram.length >= minLength) {
        // Found a match
        const startIndex = text1.indexOf(ngram);
        if (startIndex !== -1) {
          const endIndex = startIndex + ngram.length;
          
          // Calculate a match percentage (arbitrary formula for demonstration)
          const matchPercentage = Math.min(100, Math.floor((ngram.length / 20) * 100));
          
          // Check for overlap with existing matches
          const isOverlapping = matches.some(match => 
            (startIndex >= match.startIndex && startIndex < match.endIndex) ||
            (endIndex > match.startIndex && endIndex <= match.endIndex)
          );
          
          if (!isOverlapping) {
            matches.push({
              text: ngram,
              startIndex,
              endIndex,
              matchPercentage
            });
          }
        }
      }
    }
  }
  
  return matches;
};

/**
 * Analyze text against both our database and external sources
 */
export const analyzePlagiarism = async (text: string): Promise<{
  overallScore: number;
  matches: Array<{
    text: string;
    startIndex: number;
    endIndex: number;
    matchPercentage: number;
    source: string;
    sourceUrl?: string;
  }>;
  externalSources: Array<{
    source: string;
    similarity: number;
    matchedText: string;
    sourceUrl: string;
  }>;
}> => {
  // Skip very short texts
  if (text.length < 30) {
    return {
      overallScore: 0,
      matches: [],
      externalSources: []
    };
  }
  
  // Prepare the text for analysis
  const normalizedInputText = normalizeText(text);
  const inputTokens = tokenizeText(normalizedInputText);
  const inputTF = calculateTF(inputTokens);
  
  // Match against our database sources
  const matches: Array<{
    text: string;
    startIndex: number;
    endIndex: number;
    matchPercentage: number;
    source: string;
    sourceUrl?: string;
  }> = [];
  
  // Check against academic database
  const allDatabaseSources = [...databaseSources, ...academicSources];
  for (const source of allDatabaseSources) {
    // Calculate cosine similarity
    const sourceNormalizedText = normalizeText(source.text);
    const sourceTokens = tokenizeText(sourceNormalizedText);
    const sourceTF = calculateTF(sourceTokens);
    
    const similarity = calculateCosineSimilarity(inputTF, sourceTF);
    
    // If there's enough similarity, find matching segments
    if (similarity > 0.2) {
      const matchingSegments = findMatchingSegments(text, source.text);
      
      for (const segment of matchingSegments) {
        matches.push({
          ...segment,
          source: source.title,
          sourceUrl: source.url
        });
      }
    }
  }
  
  // Check against external websites (simulated API calls)
  const externalResults = await simulateWebSearch(text);
  
  const externalSources = externalResults.map(result => ({
    source: result.title,
    similarity: result.similarity,
    matchedText: result.snippet,
    sourceUrl: result.url
  }));
  
  // Add matches from external sources to our general matches array
  externalSources.forEach((source) => {
    const matchingSegments = findMatchingSegments(text, source.matchedText);
    
    for (const segment of matchingSegments) {
      matches.push({
        ...segment,
        source: source.source,
        sourceUrl: source.sourceUrl
      });
    }
  });
  
  // Calculate overall score based on matches and external sources
  let totalMatchedChars = matches.reduce((sum, match) => sum + (match.endIndex - match.startIndex), 0);
  
  // Avoid counting overlapping regions twice
  totalMatchedChars = Math.min(totalMatchedChars, text.length);
  
  // Add weight from external sources
  const externalSourceWeight = externalSources.reduce((sum, source) => sum + source.similarity, 0);
  
  // Calculate overall score
  let overallScore = Math.round((totalMatchedChars / text.length) * 70);
  
  // Add external source weight (up to 30% of the score)
  overallScore += Math.min(30, Math.round(externalSourceWeight * 15));
  
  // Ensure score is between 0 and 100
  overallScore = Math.min(100, Math.max(0, overallScore));
  
  return {
    overallScore,
    matches,
    externalSources
  };
};

// Export additional functions for potential future use
export const analyzeDocument = {
  normalizeText,
  tokenizeText,
  generateNGrams,
  calculateTF,
  calculateCosineSimilarity,
  findMatchingSegments
};
