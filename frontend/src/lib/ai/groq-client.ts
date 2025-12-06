import Groq from 'groq-sdk';
import { ChatMessage } from './types';
import { getChatSystemPrompt } from './prompts';

// Lazy initialization of Groq client to avoid build-time errors
let groqClient: Groq | null = null;

function getGroqClient(): Groq {
  if (!groqClient) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error('GROQ_API_KEY environment variable is required');
    }
    groqClient = new Groq({ apiKey });
  }
  return groqClient;
}

/**
 * Chat with AI using Groq's Llama 3.1 model
 * @param userMessage - The user's message
 * @param conversationHistory - Previous messages in the conversation
 * @returns AI response as a string
 */
export async function chatWithAI(
  userMessage: string,
  conversationHistory: ChatMessage[] = []
): Promise<string> {
  try {
    const systemPrompt = getChatSystemPrompt();

    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...conversationHistory.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
      { role: 'user' as const, content: userMessage },
    ];

    const groq = getGroqClient();
    const completion = await groq.chat.completions.create({
      messages,
      model: 'llama-3.3-70b-versatile', // Latest Llama model - Fast, smart, free
      temperature: 0.7, // Balance between creativity and consistency
      max_tokens: 500, // Keep responses concise
      top_p: 1,
      stream: false,
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
      throw new Error('No response from AI');
    }

    return response;
  } catch (error) {
    console.error('Groq API error:', error);
    
    // Fallback response
    return "I apologize, but I'm having trouble processing your request right now. Please try again in a moment, or feel free to explore our collections directly.";
  }
}

/**
 * Process a search query with AI
 * @param query - Natural language search query
 * @returns Structured search filters
 */
export async function processSearchQuery(query: string): Promise<{
  interpretation: string;
  filters: Record<string, any>;
}> {
  try {
    const prompt = `Analyze this fragrance search query and extract filters: "${query}"

Extract price range (Naira), category (oud-rich/amber-gold/floral-fresh/gourmand-unique/signature), mood (elegant-romantic/fresh-clean/bold-mysterious/sweet-playful), and specific notes.

Return JSON only:
{
  "interpretation": "what user wants",
  "filters": {
    "categories": [],
    "moods": [],
    "priceMax": 0,
    "notes": []
  }
}`;

    const groq = getGroqClient();
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.3, // Lower temperature for more consistent parsing
      max_tokens: 300,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) throw new Error('No response');

    // Parse JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Invalid JSON response');

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Search query processing error:', error);
    
    // Fallback: simple keyword matching
    return {
      interpretation: `Searching for: ${query}`,
      filters: {
        categories: [],
        moods: [],
        notes: [],
      },
    };
  }
}

/**
 * Enhance quiz results with AI-generated personalization
 * @param answers - User's quiz answers
 * @param topProducts - Top recommended products
 * @returns Personalized profile and recommendations
 */
export async function enhanceQuizResults(
  answers: Array<{ questionId: string; answer: string }>,
  topProducts: Array<{ id: string; name: string; category: string; description: string }>
): Promise<{
  profileTitle: string;
  personalizedDescription: string;
  recommendations: Array<{ productId: string; reasoning: string }>;
}> {
  try {
    const prompt = `Based on quiz answers, create a luxury scent profile:

ANSWERS: ${JSON.stringify(answers)}
PRODUCTS: ${JSON.stringify(topProducts)}

Return JSON:
{
  "profileTitle": "unique title like 'The Modern Sophisticate'",
  "personalizedDescription": "2-3 sentences about their scent personality",
  "recommendations": [
    {"productId": "product-id", "reasoning": "why it matches"}
  ]
}`;

    const groq = getGroqClient();
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.8, // Higher for creative descriptions
      max_tokens: 500,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) throw new Error('No response');

    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Invalid JSON');

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Quiz enhancement error:', error);
    
    // Fallback to static response
    return {
      profileTitle: 'The Fragrance Enthusiast',
      personalizedDescription: 'Based on your preferences, you appreciate sophisticated scents that make a statement. Your choices reflect a balanced approach to fragrance, valuing both tradition and innovation.',
      recommendations: topProducts.slice(0, 3).map(p => ({
        productId: p.id,
        reasoning: `${p.name} matches your sophisticated taste and preference for ${p.category.replace('-', ' ')} fragrances.`,
      })),
    };
  }
}

/**
 * Generate scent pairing suggestions
 * @param productId - Current product ID
 * @param productData - Product details
 * @returns Pairing suggestions
 */
export async function getScentPairings(
  productId: string,
  productData: { name: string; category: string; notes: string[] }
): Promise<string[]> {
  try {
    const prompt = `Suggest 2-3 fragrances that pair well with ${productData.name} (${productData.category} with notes: ${productData.notes.join(', ')}).

Consider day-to-night transitions and complementary scents. Keep each to 1 sentence.`;

    const groq = getGroqClient();
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 300,
    });

    const response = completion.choices[0]?.message?.content || '';
    
    // Split by newlines and filter empty lines
    return response
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .slice(0, 3);
  } catch (error) {
    console.error('Pairing suggestion error:', error);
    return [
      'Explore our full collection for complementary scents.',
    ];
  }
}

