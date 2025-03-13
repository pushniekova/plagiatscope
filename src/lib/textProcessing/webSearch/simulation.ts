
/**
 * Simulated web search functionality
 */

import { WebSearchResult, SimulatedSource } from './types';
import { processAndScoreResults, calculateTextSimilarity } from './utils';

// Simulated web search (fallback only)
export async function simulateWebSearch(query: string): Promise<WebSearchResult[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Generate results with different similarity scores
  const queryWords = query.toLowerCase().split(/\s+/);
  
  // Sample websites that might contain academic content
  const potentialSources = getPotentialSources();
  
  // Add dynamically generated sources based on the query
  const dynamicSources = generateDynamicSources(query);
  const allSources = [...potentialSources, ...dynamicSources];
  
  // Calculate matches based on query words
  return allSources.map(source => {
    // Calculate a more sophisticated similarity score based on word overlap and phrase matching
    const contentWords = source.content.toLowerCase().split(/\s+/);
    let matchingWords = 0;
    let phraseMatches = 0;
    
    // Check for individual word matches
    for (const word of queryWords) {
      if (contentWords.includes(word)) {
        matchingWords++;
      }
    }
    
    // Check for phrase matches (more valuable)
    const queryPhrasesMatch = query.match(/"([^"]+)"/g) || [];
    for (const phraseMatch of queryPhrasesMatch) {
      const phrase = phraseMatch.replace(/"/g, '').toLowerCase();
      if (source.content.toLowerCase().includes(phrase)) {
        phraseMatches += phrase.split(/\s+/).length; // Weight by phrase length
      }
    }
    
    // Calculate combined score (phrase matches are worth more)
    const wordMatchScore = queryWords.length > 0 ? matchingWords / queryWords.length : 0;
    const phraseMatchScore = queryWords.length > 0 ? (phraseMatches * 2) / queryWords.length : 0;
    const combinedScore = (wordMatchScore * 0.4) + (phraseMatchScore * 0.6);
    
    // Add some randomness to simulate variance in real search results
    const randomVariance = 0.7 + Math.random() * 0.3;
    const similarity = combinedScore * randomVariance;
    
    return {
      title: source.title,
      snippet: source.content,
      link: source.link,
      similarity: Math.min(similarity, 0.95) // Cap at 0.95 for realism
    };
  }).filter(result => result.similarity > 0.1) // Filter out very low matches
    .sort((a, b) => b.similarity - a.similarity) // Sort by highest similarity
    .slice(0, 5); // Limit to top 5 results
}

/**
 * Generate dynamic sources based on the query for more realistic results
 */
function generateDynamicSources(query: string): SimulatedSource[] {
  const sources: SimulatedSource[] = [];
  const queryWords = query.toLowerCase().replace(/"/g, '').split(/\s+/);
  
  // Generate a source specifically related to the query
  if (queryWords.length > 3) {
    const titleWords = queryWords
      .filter(word => word.length > 3)
      .slice(0, 3)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1));
    
    // Don't create if we don't have enough meaningful words
    if (titleWords.length >= 2) {
      const title = `${titleWords.join(' ')} - Академічний ресурс`;
      const domain = titleWords.join('').toLowerCase().substring(0, 10);
      const link = `https://academic-${domain}.edu/resources`;
      
      // Generate content that contains the exact query phrases for high similarity
      const phrases = query.match(/"([^"]+)"/g) || [];
      let content = "Цей академічний ресурс містить інформацію про ";
      
      // Include the exact phrases from the query in the content
      if (phrases.length > 0) {
        for (const phrase of phrases) {
          const cleanPhrase = phrase.replace(/"/g, '');
          content += `${cleanPhrase}, а також пов'язані теми. `;
        }
      } else {
        // If no phrases, use the most significant words
        content += `${queryWords.filter(w => w.length > 4).join(', ')}. `;
      }
      
      content += "Дотримання академічної доброчесності та правильне цитування джерел є важливими аспектами наукової роботи.";
      
      sources.push({ title, link, content });
    }
  }
  
  return sources;
}

/**
 * Get a list of predefined potential academic sources
 */
function getPotentialSources(): SimulatedSource[] {
  return [
    {
      title: "Wikipedia - Academic integrity",
      link: "https://en.wikipedia.org/wiki/Academic_integrity",
      content: "Academic integrity is the moral code or ethical policy of academia. This includes values such as avoidance of cheating or plagiarism; maintenance of academic standards; honesty and rigor in research and academic publishing."
    },
    {
      title: "Плагіат — Вікіпедія",
      link: "https://uk.wikipedia.org/wiki/Плагіат",
      content: "Плагіат — оприлюднення (опублікування), повністю або частково, чужого твору під іменем особи, яка не є автором цього твору. Плагіат є порушенням авторського права, тобто немайнових (право на ім'я, на оприлюднення тощо) та майнових прав справжнього автора."
    },
    {
      title: "Google Scholar: Citation analysis",
      link: "https://scholar.google.com/citations",
      content: "Google Scholar provides a simple way to broadly search for scholarly literature. Search across a wide variety of disciplines and sources: articles, theses, books, abstracts and court opinions."
    },
    {
      title: "Academic publishing - Wikipedia",
      link: "https://en.wikipedia.org/wiki/Academic_publishing",
      content: "Academic publishing is the subfield of publishing which distributes academic research and scholarship. Most academic work is published in academic journal articles, books or theses."
    },
    {
      title: "Академічна доброчесність — Національний університет",
      link: "https://nau.edu.ua/ua/menu/quality/akademichna-dobrochesnist/",
      content: "Академічна доброчесність — це сукупність етичних принципів та визначених законом правил, якими мають керуватися учасники освітнього процесу під час навчання, викладання та провадження наукової діяльності."
    },
    {
      title: "Turnitin - Promoting Academic Integrity",
      link: "https://www.turnitin.com/",
      content: "Turnitin solutions promote academic integrity, streamline grading and feedback, deter plagiarism, and improve student outcomes."
    },
    {
      title: "Наукові публікації та видавнича етика",
      link: "https://mon.gov.ua/ua/nauka/nauka/atestaciya-kadriv-vishoyi-kvalifikaciyi/naukovi-fahovi-vidannya",
      content: "Публікації результатів наукових досліджень є невід'ємною частиною наукового процесу. Вимоги до публікацій результатів дисертаційних досліджень визначені наказом МОН України."
    },
    {
      title: "Unicheck - Plagiarism Prevention Software",
      link: "https://unicheck.com/",
      content: "Unicheck is a plagiarism prevention software that helps educators and students create original content by checking papers for plagiarism and poor citation."
    },
    {
      title: "Наукова комунікація в цифрову епоху",
      link: "https://dntb.gov.ua/scientific-communication",
      content: "Наукова комунікація в цифрову епоху суттєво змінюється. Цифрові технології надають нові інструменти для поширення наукових знань, обміну ідеями та наукового співробітництва."
    }
  ];
}
