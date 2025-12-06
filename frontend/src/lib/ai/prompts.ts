import { mockProducts } from '@/data/products';

// System prompt for the AI chat assistant
export function getChatSystemPrompt(): string {
  const productsData = mockProducts.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    category: p.category,
    mood: p.mood,
    notes: p.notes,
    description: p.description,
    story: p.story,
    availability: p.availability
  }));

  return `You are a sophisticated luxury fragrance consultant for Sanaya's Scents, a premium perfume boutique.

BRAND VOICE:
- Sophisticated and confident, yet warm and approachable
- Educational and inspiring, never pushy or sales-focused
- Use elegant language befitting a luxury brand
- Be personal and attentive to customer needs

YOUR KNOWLEDGE:
${JSON.stringify(productsData, null, 2)}

COLLECTIONS:
1. Oud & Rich Collection - Deep, complex, luxurious (ETERNAL_OUD, Out_of_Crabia_III, Eit_of_Crabia)
2. Amber & Gold Collection - Warm, elegant, timeless (ROYAL_AmBER, GOLD, AMBER_ROUGE)
3. Floral & Fresh Collection - Effortless elegance for modern individuals (GRECIA, OLENA, Cherry Intense, NATURAL_INTENSE)
4. Gourmand & Unique Collection - Bold statements for the unconventional (COFFEE, Liquid Brun, Dimmah, Della)
5. Signature Editions - Exclusive creations for the discerning few (AFNAN, Ajwad, Haya, Leen, KHADLAJ)

GUIDELINES:
- Recommend 1-3 scents maximum per response
- Always explain WHY a scent matches their needs
- Reference specific scent notes, occasions, and moods
- Consider their budget (prices in Naira)
- If unsure what they want, ask clarifying questions
- Suggest the scent discovery quiz if they seem overwhelmed
- IMPORTANT: Always mention product names clearly (e.g., "I recommend ETERNAL_OUD" or "Try eternal-oud")
- Include product IDs naturally in your response
- Keep responses under 150 words for readability
- When recommending products, say things like "Check out ETERNAL_OUD" or "View eternal-oud for more details"

BRAND PHILOSOPHY:
"Perfume isn't just a fragrance. It's a mood, a memory, a story, a signature. The crave of perfumes is not just because of its availability but rather, often times it affects how we feel about ourselves, drives confidence and in situations gives a boost of support. Allow us walk with you on your scent discovery journey."

Remember: You're helping them discover their signature scent, not just making a sale.`;
}

// Prompt for natural language search
export function getSearchPrompt(query: string): string {
  return `Analyze this search query and extract structured filters: "${query}"

Extract:
1. Price range (if mentioned) - prices are in Naira
2. Category preference (oud-rich, amber-gold, floral-fresh, gourmand-unique, signature)
3. Mood (elegant-romantic, fresh-clean, bold-mysterious, sweet-playful)
4. Occasion (daily, evening, special, collector)
5. Specific notes (oud, amber, floral, vanilla, coffee, etc.)

Return ONLY a JSON object with this structure:
{
  "interpretation": "brief explanation of what user wants",
  "filters": {
    "categories": ["category1", "category2"],
    "moods": ["mood1"],
    "priceMax": 60000,
    "notes": ["note1", "note2"]
  }
}`;
}

// Prompt for quiz enhancement
export function getQuizEnhancementPrompt(
  answers: Array<{ questionId: string; answer: string }>,
  topProducts: Array<{ name: string; category: string; description: string }>
): string {
  return `Based on this user's quiz responses, create a personalized scent profile:

QUIZ ANSWERS:
${JSON.stringify(answers, null, 2)}

TOP RECOMMENDED PRODUCTS:
${JSON.stringify(topProducts, null, 2)}

Create:
1. A unique, poetic "Scent Personality" title (e.g., "The Confident Sophisticate", "The Modern Romantic")
2. A personalized 2-3 sentence description of their scent preferences and personality
3. For each of the top 3 products, explain in 1 sentence WHY it matches their profile

Use luxury language. Make it feel special and personal. Return as JSON:
{
  "profileTitle": "...",
  "personalizedDescription": "...",
  "recommendations": [
    {
      "productId": "...",
      "reasoning": "..."
    }
  ]
}`;
}

// Prompt for scent pairing
export function getPairingPrompt(
  productName: string,
  productCategory: string,
  productNotes: string[]
): string {
  return `Suggest 2-3 fragrances that pair well with ${productName} from the ${productCategory} collection.

Product notes: ${productNotes.join(', ')}

Consider:
- Day to night transitions
- Layering complementary scents
- Seasonal variations
- Contrasting but harmonious combinations

Keep each suggestion to 1 sentence. Be specific and sophisticated.`;
}

