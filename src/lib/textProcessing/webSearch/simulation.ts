
/**
 * Simulated web search functionality for fallback when real API is not available
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
      const title = `${titleWords.join(' ')} - Академічні матеріали`;
      
      // Generate realistic-looking domain and URL
      const randomDomain = getRandomDomain();
      const slug = titleWords.join('-').toLowerCase();
      const link = `https://${randomDomain}/article/${slug}`;
      
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
 * Get a random realistic domain for simulated sources
 */
function getRandomDomain(): string {
  const academicDomains = [
    'sciencedirect.com',
    'academia.edu',
    'researchgate.net',
    'springer.com',
    'jstor.org',
    'ieee.org',
    'scielo.org',
    'wiley.com',
    'tandfonline.com',
    'oxfordacademic.com',
    'nature.com',
    'semanticscholar.org',
    'core.ac.uk',
    'cambridge.org',
    'arxiv.org',
    'scholar.archive.org',
  ];
  
  const randomIndex = Math.floor(Math.random() * academicDomains.length);
  return academicDomains[randomIndex];
}

/**
 * Get a list of predefined potential academic sources
 */
function getPotentialSources(): SimulatedSource[] {
  return [
    {
      title: "Academic integrity - Wikipedia",
      link: "https://en.wikipedia.org/wiki/Academic_integrity",
      content: "Academic integrity is the moral code or ethical policy of academia. This includes values such as avoidance of cheating or plagiarism; maintenance of academic standards; honesty and rigor in research and academic publishing."
    },
    {
      title: "Плагіат — Вікіпедія",
      link: "https://uk.wikipedia.org/wiki/Плагіат",
      content: "Плагіат — оприлюднення (опублікування), повністю або частково, чужого твору під іменем особи, яка не є автором цього твору. Плагіат є порушенням авторського права, тобто немайнових (право на ім'я, на оприлюднення тощо) та майнових прав справжнього автора."
    },
    {
      title: "Citations and Academic Integrity - Harvard University",
      link: "https://scholar.harvard.edu/citations",
      content: "Academic integrity requires citing sources for all material that isn't the product of your own original thinking. Familiar facts are fine but borrowed words, thoughts, ideas, research, frameworks, visuals, and other material must be properly credited."
    },
    {
      title: "Plagiarism in Academic Writing - Oxford University Press",
      link: "https://academic.oup.com/journals/pages/authors/ethics",
      content: "Plagiarism is presenting someone else's work or ideas as your own, with or without their consent, by incorporating it into your work without full acknowledgement. All published and unpublished material, whether in manuscript, printed or electronic form, is covered under this definition."
    },
    {
      title: "Академічна доброчесність — Національний університет Києво-Могилянська академія",
      link: "https://www.ukma.edu.ua/index.php/osvita/quality-ukma/academic-integrity",
      content: "Академічна доброчесність — це сукупність етичних принципів та визначених законом правил, якими мають керуватися учасники освітнього процесу під час навчання, викладання та провадження наукової діяльності з метою забезпечення довіри до результатів навчання та/або наукових досягнень."
    },
    {
      title: "Understanding Plagiarism and Academic Integrity - MIT",
      link: "https://integrity.mit.edu/handbook/academic-writing/avoiding-plagiarism",
      content: "Plagiarism occurs when you use another's words, ideas, assertions, data, or figures and do not acknowledge that you have done so. If you use someone else's words, either verbatim or paraphrased, you must indicate this through the use of quotation marks and proper citation."
    },
    {
      title: "Запобігання плагіату у науковій діяльності - Національна академія наук України",
      link: "https://www.nas.gov.ua/UA/Messages/Pages/View.aspx?MessageID=6963",
      content: "Наукова діяльність має ґрунтуватися на засадах чесності, довіри, поваги та відповідальності. Плагіат є однією з форм академічної недоброчесності. Він підриває основи наукового прогресу та знижує довіру до науки в суспільстві."
    },
    {
      title: "Citation Practices and Academic Integrity - Princeton University",
      link: "https://www.princeton.edu/pr/pub/integrity/pages/cite/",
      content: "As a Princeton student, you are expected to acknowledge the sources you use in your academic work. When you consult any kind of source and incorporate what you find in your work, you must include proper citations that reflect what you have drawn from that source."
    },
    {
      title: "Методичні рекомендації для закладів вищої освіти з підтримки принципів академічної доброчесності",
      link: "https://mon.gov.ua/storage/app/media/vishcha-osvita/2018/10/25/recomendatsii.pdf",
      content: "Академічна доброчесність є невід'ємною складовою забезпечення якості вищої освіти в Україні та фундаментальною етичною цінністю усієї академічної спільноти. Дотримання принципів академічної доброчесності означає, що в процесі навчання та дослідницької роботи студенти, викладачі та науковці мають керуватися принципами чесності, довіри, справедливості, поваги, відповідальності."
    }
  ];
}
