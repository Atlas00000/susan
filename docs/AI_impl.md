# AI Implementation Plan - Sanaya's Scents

## 🎯 Project Overview

**Goal:** Integrate AI-powered features to enhance scent discovery and customer engagement  
**Technology:** Groq API (Free tier - Llama 3.1)  
**Budget:** $0 (100% free tier)  
**Timeline:** 4 weeks  
**Total New Code:** ~1,200 lines across 12 files

---

## 🚀 Why Groq API?

- **100% FREE** with generous limits (14,400 requests/day)
- **Fastest inference** (800+ tokens/second)
- **Models:** Llama 3.1 70B, Mixtral 8x7B, Gemma 2 9B
- **No credit card required**
- **Perfect for:** Real-time chat, recommendations, natural language processing

---

## 📊 Features Overview

| Feature | Priority | Impact | Complexity | Week |
|---------|----------|--------|------------|------|
| AI Chat Assistant | P0 | Very High 🔥🔥🔥 | Medium | 1 |
| Natural Language Search | P1 | High 🔥🔥 | Low | 2 |
| Enhanced Quiz Results | P1 | Medium-High 🔥 | Very Low | 3 |
| Scent Pairing Advisor | P2 | Medium | Medium | 4 |
| Virtual Profile Generator | P2 | Medium | Low | 4 |

---

## 🗓️ Weekly Implementation Plan

### **WEEK 1: AI Chat Assistant**
**Milestone 1: Foundation + Basic Chat**

#### Day 1: Setup & Infrastructure
**Time:** 2-3 hours

**Tasks:**
- [ ] Get Groq API key from [console.groq.com](https://console.groq.com)
- [ ] Add environment variable to `.env.local`
- [ ] Install dependencies
- [ ] Create AI folder structure

**Files to Create:**
```
frontend/
├── .env.local (update)
├── src/lib/ai/
│   ├── groq-client.ts
│   ├── prompts.ts
│   └── types.ts
```

**Code:**
```bash
# Install Groq SDK
cd frontend
pnpm add groq-sdk

# Add to .env.local
echo "GROQ_API_KEY=your_key_here" >> .env.local
```

**Deliverables:**
- ✅ Groq SDK installed
- ✅ API key configured
- ✅ Basic client wrapper working

---

#### Day 2: Chat API Endpoints
**Time:** 3-4 hours

**Tasks:**
- [ ] Create chat API route
- [ ] Implement conversation context handling
- [ ] Add error handling and rate limiting
- [ ] Test API with Postman/Thunder Client

**Files to Create:**
```
frontend/src/app/api/
├── chat/
│   └── route.ts
└── chat-context/
    └── route.ts
```

**Code Structure:**
```typescript
// app/api/chat/route.ts
- POST endpoint for chat messages
- Context-aware responses
- Product knowledge integration
- Error handling
```

**Deliverables:**
- ✅ Working chat API endpoint
- ✅ Context management
- ✅ Product data integration

---

#### Day 3: Chat UI Component
**Time:** 4-5 hours

**Tasks:**
- [ ] Create floating chat widget
- [ ] Design chat interface (luxury aesthetic)
- [ ] Add message bubbles (user/AI)
- [ ] Implement typing indicators
- [ ] Add quick action buttons

**Files to Create:**
```
frontend/src/components/
├── ai/
│   ├── AIChatWidget.tsx
│   ├── ChatMessage.tsx
│   ├── ChatInput.tsx
│   └── QuickActions.tsx
```

**Design Specs:**
- Floating button: 60px circle, bottom-right
- Chat window: 400px × 600px, luxury-charcoal background
- Gold accents for AI messages
- Smooth animations (Framer Motion)

**Deliverables:**
- ✅ Floating chat button
- ✅ Chat window UI
- ✅ Message display
- ✅ Input handling

---

#### Day 4: Chat Logic & Integration
**Time:** 3-4 hours

**Tasks:**
- [ ] Connect UI to API
- [ ] Implement conversation persistence (sessionStorage)
- [ ] Add product recommendation links
- [ ] Create starter prompts
- [ ] Handle loading states

**Features:**
```typescript
- Conversation history management
- Product card embeds in chat
- "View Product" quick links
- "Start Quiz" suggestions
- Session persistence
```

**Deliverables:**
- ✅ Functional chat flow
- ✅ Product recommendations in chat
- ✅ Persistent conversations

---

#### Day 5: Testing & Polish
**Time:** 2-3 hours

**Tasks:**
- [ ] Test on mobile devices
- [ ] Fix responsive issues
- [ ] Add accessibility (keyboard navigation)
- [ ] Test rate limits
- [ ] Add analytics tracking
- [ ] Create documentation

**Testing Checklist:**
- [ ] Chat works on mobile
- [ ] Product links work correctly
- [ ] Error states handled gracefully
- [ ] No memory leaks
- [ ] Accessible with keyboard

**Deliverables:**
- ✅ Production-ready chat assistant
- ✅ Mobile responsive
- ✅ Documented code
- ✅ Analytics integrated

---

### **WEEK 2: Natural Language Search**
**Milestone 2: AI-Powered Product Discovery**

#### Day 1: Search API Endpoint
**Time:** 2-3 hours

**Tasks:**
- [ ] Create search API route
- [ ] Implement query understanding with AI
- [ ] Map intents to product filters
- [ ] Handle price queries, moods, occasions

**Files to Create:**
```
frontend/src/app/api/
└── search/
    └── route.ts

frontend/src/lib/ai/
└── search-helpers.ts
```

**Intent Examples:**
```
"fresh scents under 60k" → filter by category + price
"bold fragrances for evening" → filter by mood + occasion
"something with oud" → filter by notes
```

**Deliverables:**
- ✅ Search API endpoint
- ✅ Intent recognition
- ✅ Query to filter mapping

---

#### Day 2: Search UI Component
**Time:** 3-4 hours

**Tasks:**
- [ ] Create enhanced search bar
- [ ] Add search suggestions
- [ ] Design results display
- [ ] Add loading states
- [ ] Handle empty states

**Files to Create:**
```
frontend/src/components/
├── search/
│   ├── AISearchBar.tsx
│   ├── SearchSuggestions.tsx
│   └── SearchResults.tsx
```

**Design:**
- Search bar in header (replace/enhance existing)
- Dropdown suggestions while typing
- Results in grid layout (reuse ProductGrid)
- AI explanation of search interpretation

**Deliverables:**
- ✅ AI search bar
- ✅ Smart suggestions
- ✅ Results display

---

#### Day 3: Search Integration
**Time:** 2-3 hours

**Tasks:**
- [ ] Integrate search with product pages
- [ ] Add search to header
- [ ] Implement search history
- [ ] Add popular searches
- [ ] Connect to existing filters

**Features:**
- Recent searches (localStorage)
- Trending searches
- Voice search (optional)
- Search from chat

**Deliverables:**
- ✅ Integrated search experience
- ✅ Search history
- ✅ Cross-feature integration

---

#### Day 4-5: Testing & Polish
**Time:** 3-4 hours

**Tasks:**
- [ ] Test various query types
- [ ] Optimize search speed
- [ ] Add search analytics
- [ ] Create search documentation
- [ ] Handle edge cases

**Test Queries:**
```
✓ "luxury oud fragrances"
✓ "something romantic under 65000"
✓ "fresh scents for daily wear"
✓ "bold mysterious evening perfumes"
✓ "gifts for women"
```

**Deliverables:**
- ✅ Robust search functionality
- ✅ Fast response times
- ✅ Comprehensive testing

---

### **WEEK 3: Enhanced Quiz Results**
**Milestone 3: AI-Personalized Recommendations**

#### Day 1-2: AI-Enhanced Quiz Logic
**Time:** 3-4 hours

**Tasks:**
- [ ] Create quiz enhancement API
- [ ] Generate personalized descriptions
- [ ] Create dynamic scent profiles
- [ ] Add personality insights

**Files to Modify/Create:**
```
frontend/src/lib/ai/
└── quiz-enhancer.ts

frontend/src/app/api/
└── quiz-enhance/
    └── route.ts
```

**Features:**
```typescript
// Instead of static:
"You're drawn to deep, complex fragrances..."

// Generate dynamic:
"Based on your love for bold evening scents and 
classic style, you embody the Confident Sophisticate 
archetype. ETERNAL_OUD perfectly matches your 
appreciation for depth and complexity..."
```

**Deliverables:**
- ✅ Dynamic profile generation
- ✅ Personalized explanations
- ✅ Enhanced recommendation reasoning

---

#### Day 3: Update Quiz Results Page
**Time:** 2-3 hours

**Tasks:**
- [ ] Modify quiz/results/page.tsx
- [ ] Add AI-generated descriptions
- [ ] Create profile cards
- [ ] Add sharing functionality
- [ ] Improve layout

**UI Enhancements:**
- Animated profile reveal
- "Your Scent DNA" section
- Top 3 recommendations with AI reasoning
- Social share buttons
- "Chat with Expert" CTA

**Deliverables:**
- ✅ Enhanced results page
- ✅ AI descriptions integrated
- ✅ Beautiful presentation

---

#### Day 4-5: Testing & Polish
**Time:** 2-3 hours

**Tasks:**
- [ ] Test all quiz paths
- [ ] Ensure consistent quality
- [ ] Add fallbacks for API errors
- [ ] Mobile optimization
- [ ] Analytics tracking

**Deliverables:**
- ✅ Production-ready enhanced quiz
- ✅ Fallback mechanisms
- ✅ Analytics integrated

---

### **WEEK 4: Advanced Features**
**Milestone 4: Scent Pairing & Profile Generator**

#### Day 1-2: Scent Pairing Advisor
**Time:** 4-5 hours

**Tasks:**
- [ ] Create pairing API endpoint
- [ ] Build pairing logic
- [ ] Design pairing UI
- [ ] Add to product pages

**Files to Create:**
```
frontend/src/app/api/
└── pairing/
    └── route.ts

frontend/src/components/
└── product/
    └── ScentPairing.tsx
```

**Features:**
- "Complete the look" suggestions
- Day-to-night transitions
- Seasonal recommendations
- Layering tips
- Complementary scents

**Deliverables:**
- ✅ Pairing API
- ✅ Pairing UI on product pages
- ✅ Smart recommendations

---

#### Day 3: Virtual Profile Generator
**Time:** 3-4 hours

**Tasks:**
- [ ] Create profile generator API
- [ ] Design profile cards
- [ ] Add shareable image generation
- [ ] Implement social sharing

**Files to Create:**
```
frontend/src/app/api/
└── profile-generator/
    └── route.ts

frontend/src/components/
└── profile/
    ├── ProfileCard.tsx
    └── ProfileShare.tsx
```

**Features:**
- "Your Scent Personality"
- Beautiful shareable cards
- Download as image
- Social media integration
- Unique luxury descriptions

**Deliverables:**
- ✅ Profile generator
- ✅ Shareable cards
- ✅ Social integration

---

#### Day 4-5: Final Integration & Testing
**Time:** 3-4 hours

**Tasks:**
- [ ] Integration testing all features
- [ ] Performance optimization
- [ ] Rate limit testing
- [ ] Documentation updates
- [ ] Prepare for launch

**Final Checklist:**
- [ ] All AI features working together
- [ ] Mobile responsive
- [ ] Error handling robust
- [ ] Analytics tracking complete
- [ ] Documentation updated
- [ ] README updated with AI features

**Deliverables:**
- ✅ Fully integrated AI system
- ✅ Comprehensive documentation
- ✅ Ready for production

---

## 📁 File Structure

```
frontend/
├── .env.local
│   └── GROQ_API_KEY=xxx
│
├── src/
│   ├── app/
│   │   └── api/
│   │       ├── chat/
│   │       │   └── route.ts
│   │       ├── search/
│   │       │   └── route.ts
│   │       ├── quiz-enhance/
│   │       │   └── route.ts
│   │       ├── pairing/
│   │       │   └── route.ts
│   │       └── profile-generator/
│   │           └── route.ts
│   │
│   ├── components/
│   │   ├── ai/
│   │   │   ├── AIChatWidget.tsx
│   │   │   ├── ChatMessage.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   └── QuickActions.tsx
│   │   │
│   │   ├── search/
│   │   │   ├── AISearchBar.tsx
│   │   │   ├── SearchSuggestions.tsx
│   │   │   └── SearchResults.tsx
│   │   │
│   │   ├── product/
│   │   │   └── ScentPairing.tsx
│   │   │
│   │   └── profile/
│   │       ├── ProfileCard.tsx
│   │       └── ProfileShare.tsx
│   │
│   └── lib/
│       └── ai/
│           ├── groq-client.ts
│           ├── prompts.ts
│           ├── types.ts
│           ├── search-helpers.ts
│           ├── quiz-enhancer.ts
│           └── rate-limiter.ts
│
└── package.json (add groq-sdk)
```

**Total Files:** 23 files (~1,200 lines)

---

## 🔧 Technical Implementation Details

### Groq Client Setup

```typescript
// src/lib/ai/groq-client.ts
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function chatWithAI(
  userMessage: string,
  conversationHistory: Array<{ role: string; content: string }> = []
) {
  const systemPrompt = `You are a luxury fragrance consultant for Sanaya's Scents.
  
  Brand Voice:
  - Sophisticated and confident
  - Warm and welcoming
  - Educational and inspiring
  - Never pushy or sales-y
  
  Your Knowledge:
  ${JSON.stringify(products, null, 2)}
  
  Guidelines:
  - Recommend 1-3 scents maximum per response
  - Always explain WHY a scent matches their needs
  - Use luxury language but stay approachable
  - Reference scent notes, occasions, and moods
  - Suggest the quiz if they're unsure
  `;

  const completion = await groq.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      ...conversationHistory,
      { role: "user", content: userMessage },
    ],
    model: "llama-3.1-70b-versatile",
    temperature: 0.7,
    max_tokens: 500,
    top_p: 1,
    stream: false,
  });

  return completion.choices[0]?.message?.content || "I apologize, I couldn't process that.";
}
```

### Chat API Endpoint

```typescript
// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { chatWithAI } from '@/lib/ai/groq-client';
import { checkRateLimit } from '@/lib/ai/rate-limiter';

export async function POST(req: NextRequest) {
  try {
    const { message, history, userId } = await req.json();
    
    // Rate limiting
    if (!checkRateLimit(userId)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a moment.' },
        { status: 429 }
      );
    }

    const response = await chatWithAI(message, history);
    
    return NextResponse.json({ 
      response,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to get AI response. Please try again.' },
      { status: 500 }
    );
  }
}
```

### Rate Limiter

```typescript
// src/lib/ai/rate-limiter.ts
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(userId: string, limit = 10): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(userId);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(userId, {
      count: 1,
      resetTime: now + 60 * 60 * 1000, // 1 hour
    });
    return true;
  }

  if (userLimit.count >= limit) {
    return false;
  }

  userLimit.count++;
  return true;
}

// Cleanup old entries every hour
setInterval(() => {
  const now = Date.now();
  for (const [userId, data] of rateLimitMap.entries()) {
    if (now > data.resetTime) {
      rateLimitMap.delete(userId);
    }
  }
}, 60 * 60 * 1000);
```

---

## 💰 Cost Analysis

### Groq Free Tier Limits
```
Daily Limit: 14,400 requests
Hourly Limit: 600 requests
Per Minute: 10 requests

Average conversation: 8 messages
Daily capacity: ~1,800 conversations
Monthly capacity: ~54,000 conversations

Your expected traffic (MVP): 50-200 conversations/day
Usage: < 15% of free tier
Conclusion: MORE than sufficient
```

### Fallback Strategy
If you exceed limits (unlikely):
1. Cache common queries
2. Use rate limiting per user
3. Add Google Gemini as backup (also free)
4. Static fallbacks for common questions

---

## 📊 Success Metrics

### Week 1: Chat Assistant
- [ ] 100+ test conversations
- [ ] < 2 second response time
- [ ] 80%+ helpful response rate
- [ ] 0 critical errors

### Week 2: Search
- [ ] 50+ test queries
- [ ] 90%+ correct intent recognition
- [ ] < 1 second search time
- [ ] Handles all edge cases

### Week 3: Enhanced Quiz
- [ ] All quiz paths tested
- [ ] Dynamic descriptions > static
- [ ] User satisfaction improved
- [ ] No API failures

### Week 4: Advanced Features
- [ ] All features integrated
- [ ] Mobile optimized
- [ ] Documentation complete
- [ ] Ready for production

---

## 🚨 Risk Mitigation

### Technical Risks

**Risk: API Rate Limits**
- Mitigation: User-level rate limiting
- Fallback: Static responses for common queries
- Monitoring: Track usage daily

**Risk: API Downtime**
- Mitigation: Graceful error handling
- Fallback: Disable AI features temporarily
- User Message: "AI assistant temporarily unavailable"

**Risk: Poor AI Responses**
- Mitigation: Well-crafted system prompts
- Testing: 100+ test scenarios
- Fallback: Option to talk to human (contact form)

**Risk: Performance Issues**
- Mitigation: Async API calls, loading states
- Optimization: Cache common queries
- Monitoring: Response time tracking

---

## 🎯 Key Deliverables by Milestone

### Milestone 1 (Week 1)
✅ Working AI chat assistant  
✅ Floating chat widget on all pages  
✅ Product recommendations in chat  
✅ Mobile responsive  

### Milestone 2 (Week 2)
✅ Natural language search  
✅ Smart query understanding  
✅ Integrated search experience  
✅ Search analytics  

### Milestone 3 (Week 3)
✅ AI-enhanced quiz results  
✅ Dynamic scent profiles  
✅ Personalized explanations  
✅ Improved user satisfaction  

### Milestone 4 (Week 4)
✅ Scent pairing advisor  
✅ Virtual profile generator  
✅ Shareable content  
✅ Full integration  

---

## 📚 Documentation to Create

### For Developers
- [ ] AI integration guide
- [ ] API endpoint documentation
- [ ] Groq API setup instructions
- [ ] Troubleshooting guide
- [ ] Rate limiting documentation

### For Users
- [ ] How to use AI chat
- [ ] Search tips and examples
- [ ] FAQ about AI features

---

## 🎓 Learning Resources

### Groq Documentation
- [Groq API Docs](https://console.groq.com/docs)
- [Llama 3.1 Guide](https://ai.meta.com/llama/)
- [Prompt Engineering Best Practices](https://www.promptingguide.ai/)

### Implementation References
- Next.js API Routes
- React Chat UI patterns
- Natural Language Processing basics

---

## ✅ Pre-Launch Checklist

### Technical
- [ ] All API endpoints working
- [ ] Error handling robust
- [ ] Rate limiting implemented
- [ ] Loading states polished
- [ ] Mobile responsive
- [ ] Accessibility compliant
- [ ] Analytics tracking added

### Content
- [ ] System prompts optimized
- [ ] Product data integrated
- [ ] Fallback responses written
- [ ] User documentation created

### Testing
- [ ] 100+ chat conversations tested
- [ ] 50+ search queries tested
- [ ] All quiz paths tested
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Rate limit testing
- [ ] Error scenario testing

### Launch
- [ ] Staging deployment
- [ ] User acceptance testing
- [ ] Performance monitoring setup
- [ ] Rollback plan ready
- [ ] Support documentation ready

---

## 🚀 Post-Launch Plan

### Week 5: Monitor & Optimize
- Monitor API usage
- Collect user feedback
- Fix bugs and issues
- Optimize prompts based on real usage

### Week 6: Iterate
- A/B test different prompts
- Add user-requested features
- Improve response quality
- Enhance UI based on feedback

### Future Enhancements
- Voice input for chat
- Image recognition (upload perfume photo)
- Multi-language support
- Integration with WhatsApp/SMS
- Advanced analytics dashboard

---

## 🎉 Success Criteria

### User Engagement
- 30%+ of visitors use AI chat
- 50%+ of searches use natural language
- 40%+ complete enhanced quiz
- Positive feedback from users

### Technical Performance
- < 2 second response time
- < 1% error rate
- 99%+ uptime
- < 15% of free tier usage

### Business Impact
- Increased product discovery
- Higher conversion rates
- Reduced support requests
- Better customer satisfaction

---

## 📞 Support & Maintenance

### Weekly Tasks
- Monitor API usage
- Check error logs
- Review user feedback
- Update prompts if needed

### Monthly Tasks
- Analyze usage patterns
- Optimize performance
- Add new features
- Update documentation

### As Needed
- Fix critical bugs
- Add new products to AI knowledge
- Update system prompts
- Scale infrastructure if needed

---

**Remember:** Start simple, iterate fast, keep it luxurious. The goal is to enhance the customer experience, not complicate it. AI should feel like a natural part of the Sanaya's Scents journey.

---

**Next Step:** Run `pnpm add groq-sdk` and get your free API key from [console.groq.com](https://console.groq.com) to begin Week 1, Day 1! 🚀

