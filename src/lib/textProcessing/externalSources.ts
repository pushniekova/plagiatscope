
/**
 * External sources checking utilities for plagiarism detection
 */

import { normalizeText, tokenizeText, calculateTF } from './normalize';
import { calculateCosineSimilarity } from './similarity';

// External APIs for checking content similarity (simulated)
export interface SimulatedAPIResult {
  url: string;
  title: string;
  snippet: string;
  similarity: number;
}

/**
 * Simulates a web search for similar content
 * In a real application, this would call search engine APIs
 */
export const simulateWebSearch = async (text: string): Promise<SimulatedAPIResult[]> => {
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
