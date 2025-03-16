
import { analyzePlagiarism } from '@/lib/textProcessing';

// Function to handle the plagiarism analysis logic
export const analyzePlagiarismText = async (text: string): Promise<{
  overallScore: number;
}> => {
  try {
    // Call the actual analysis function
    const results = await analyzePlagiarism(text);
    return {
      overallScore: results.overallScore
    };
  } catch (error) {
    console.error("Error analyzing text:", error);
    throw error;
  }
};
