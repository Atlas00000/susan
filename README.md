<div align="center">

# 🌸 Sanaya's Scents

### Luxury Fragrances, Powered by AI

*Discover your perfect scent through intelligent conversation, natural language search, and personalized recommendations*

[![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4.5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-blue?style=for-the-badge&logo=docker)](https://www.docker.com/)
[![AI](https://img.shields.io/badge/AI-Groq%20%7C%20Llama%203.3-gold?style=for-the-badge)](https://groq.com/)
[![License](https://img.shields.io/badge/License-Private-red?style=for-the-badge)]()

[Features](#-features) • [Quick Start](#-quick-start) • [AI Features](#-ai-features) • [Tech Stack](#-tech-stack) • [Documentation](#-documentation)

</div>

---

## 🎯 Overview

**Sanaya's Scents** is a luxury fragrance discovery platform that combines sophisticated design with cutting-edge AI technology. Built with Next.js 14 and powered by Groq's AI, the platform offers an immersive scent discovery experience through:

- 💬 **AI Chat Assistant** - Conversational fragrance consultant
- 🔍 **Natural Language Search** - "Show me bold scents under 60k"  
- ✨ **AI-Enhanced Quiz** - Personalized scent profiles
- 🎨 **Luxury Design** - Premium brand aesthetic
- 📱 **Mobile-First** - Optimized for all devices
- 💰 **100% Free AI** - Using Groq's free tier

---

## ✨ Features

### 🤖 AI-Powered Discovery

| Feature | Description | Status |
|---------|-------------|--------|
| **AI Chat Assistant** | Real-time conversation with fragrance consultant | ✅ Live |
| **Natural Language Search** | Search using natural queries like "fresh scents under 60k" | ✅ Live |
| **Enhanced Quiz Results** | AI-generated scent personalities and match reasoning | ✅ Live |
| **Product Recommendations** | Smart matching based on preferences | ✅ Live |

### 🎨 User Experience

- **20+ Premium Products** across 5 curated collections
- **Scent Discovery Quiz** with 5 personalized questions
- **Interactive Product Cards** with rich details
- **Collection Pages** organized by scent families
- **Responsive Design** optimized for mobile and desktop
- **Fast Performance** with Next.js 14 App Router

### 🛍️ Product Collections

1. **Oud & Rich** - Deep, complex, luxurious
2. **Amber & Gold** - Warm, elegant, timeless
3. **Floral & Fresh** - Effortless modern elegance
4. **Gourmand & Unique** - Bold unconventional statements
5. **Signature Editions** - Exclusive rare creations

---

## 🚀 Quick Start

### Prerequisites

- **Docker Desktop** ([Download](https://www.docker.com/products/docker-desktop))
- **Groq API Key** (Free from [console.groq.com](https://console.groq.com))

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd susan

# 2. Add your Groq API key
cd frontend
echo "GROQ_API_KEY=your_groq_api_key_here" > .env.local

# 3. Build the Docker image
cd ..
docker compose build

# 4. Start the development server
docker compose up frontend
```

### Access the Application

- **URL:** http://localhost:3000
- **AI Chat:** Click the gold 💬 button (bottom-right)
- **AI Search:** Click the 🔍 icon in the header
- **Quiz:** Navigate to /quiz or click "Start Your Journey"

---

## 🤖 AI Features

### 💬 Chat Assistant

**What it does:**
- Answers questions about fragrances
- Provides personalized recommendations
- Explains scent notes and occasions
- Links directly to products

**How to use:**
1. Click the gold chat button (💬) at bottom-right
2. Choose a quick action or type your question
3. Get instant AI-powered recommendations
4. Click product links to view details

**Example conversations:**
```
You: "I want something for evening"
AI: "For evening occasions, I recommend ETERNAL_OUD from our 
     Oud & Rich collection. With notes of Oud, Sandalwood, Amber, 
     and Rose, it's perfect for making a lasting impression. ₦65,000"
     [Eternal Oud button appears]
```

### 🔍 Natural Language Search

**What it does:**
- Understands natural language queries
- Extracts price, category, mood filters
- Shows AI interpretation of your search
- Returns relevant products instantly

**How to use:**
1. Click the search icon (🔍) in header
2. Type natural language query
3. See AI interpretation and filtered results

**Example searches:**
```
"bold scents under 60k" → Filters by price + mood
"luxury oud fragrances" → Filters by category
"something fresh for daily wear" → Multi-filter matching
"romantic evening perfumes" → Mood + occasion
```

### ✨ Enhanced Quiz Results

**What it does:**
- Generates unique scent personality titles
- Creates personalized profile descriptions
- Explains WHY each product matches
- Shows "Top 3 Match" badges

**How to use:**
1. Take the 5-question scent discovery quiz
2. Submit your answers
3. Receive AI-generated personalized profile
4. See detailed reasoning for each recommendation

**Example output:**
```
Profile Title: "The Evening Sophisticate"
Description: "Your preference for bold, mysterious fragrances 
and evening occasions reveals a confident individual..."

Top 1 Match: ETERNAL_OUD
Why this matches: Your love for bold evening wear perfectly 
aligns with this complex oud blend...
```

---

## 🏗️ Tech Stack

### Frontend
- **Framework:** Next.js 14.2.5 (App Router)
- **Language:** TypeScript 5.4.5
- **Styling:** Tailwind CSS 3.4
- **Animations:** Framer Motion 11.0
- **Package Manager:** pnpm (via Docker)

### AI & APIs
- **AI Provider:** Groq
- **Model:** Llama 3.3 70B Versatile
- **Cost:** $0 (Free tier - 14,400 requests/day)
- **Speed:** 1-3 second responses
- **SDK:** groq-sdk 0.33.0

### Infrastructure
- **Containerization:** Docker + Docker Compose
- **Development:** Hot reload with Turbo mode
- **Analytics:** Vercel Analytics + Speed Insights
- **SEO:** Structured data, sitemaps, metadata

---

## 📁 Project Structure

```
susan/
├── docs/                          # 📚 Documentation
│   ├── AI_impl.md                # 4-week AI implementation plan
│   ├── AI_TESTING.md             # AI testing guide
│   ├── brand_overview.md         # Brand identity & positioning
│   ├── roadmap.md                # 8-week development roadmap
│   ├── improvments.md            # Performance optimization plan
│   ├── WEEK1_COMPLETE.md         # Week 1 completion report
│   ├── WEEK2_COMPLETE.md         # Week 2 completion report
│   └── WEEK3_COMPLETE.md         # Week 3 completion report
│
├── frontend/
│   ├── src/
│   │   ├── app/                  # Next.js App Router pages
│   │   │   ├── api/              # 🤖 AI API endpoints
│   │   │   │   ├── chat/         # Chat assistant
│   │   │   │   ├── search/       # Natural language search
│   │   │   │   └── quiz-enhance/ # Quiz AI enhancement
│   │   │   ├── products/         # Product catalog
│   │   │   ├── quiz/             # Scent discovery quiz
│   │   │   └── collections/      # Scent family collections
│   │   │
│   │   ├── components/
│   │   │   ├── ai/               # 🤖 AI Components
│   │   │   │   ├── AIChatWidget.tsx
│   │   │   │   ├── ChatMessage.tsx
│   │   │   │   ├── ChatInput.tsx
│   │   │   │   └── QuickActions.tsx
│   │   │   ├── search/           # 🔍 Search Components
│   │   │   │   ├── AISearchBar.tsx
│   │   │   │   └── SearchResults.tsx
│   │   │   ├── ui/               # Reusable UI components
│   │   │   ├── layout/           # Header, Footer, Navigation
│   │   │   ├── quiz/             # Quiz components
│   │   │   └── sections/         # Page sections
│   │   │
│   │   ├── lib/
│   │   │   ├── ai/               # 🤖 AI Library
│   │   │   │   ├── groq-client.ts    # Groq API wrapper
│   │   │   │   ├── prompts.ts        # AI prompts
│   │   │   │   ├── rate-limiter.ts   # Rate limiting
│   │   │   │   └── types.ts          # AI types
│   │   │   ├── quiz-logic.ts     # Quiz algorithm
│   │   │   └── utils.ts          # Helper functions
│   │   │
│   │   ├── data/                 # Mock data & content
│   │   │   ├── products.ts       # 20 products
│   │   │   ├── collections.ts    # 5 collections
│   │   │   └── quiz-questions.ts # Quiz questions
│   │   │
│   │   └── types/                # TypeScript definitions
│   │
│   ├── public/                   # Static assets
│   │   └── images/products/      # Product images
│   │
│   ├── Dockerfile                # Frontend container
│   ├── package.json              # Dependencies
│   └── .env.local                # Environment variables
│
├── docker-compose.yml            # Docker orchestration
├── README.md                     # This file
└── quotes.txt                    # Brand inspiration
```

---

## 🎨 Design System

### Color Palette

```css
Luxury Gold:     #c8a96a  /* Primary accent */
Royal Brown:     #8c5b2e  /* Secondary accent */
Charcoal:        #1f1f1f  /* Background */
Cream:           #f6f1e7  /* Text */
```

### Typography

- **Headings:** Playfair Display (serif)
- **Body:** Inter (sans-serif)
- **Accent:** Cormorant Garamond (serif)

### Brand Voice

> "Perfume isn't just a fragrance. It's a mood, a memory, a story, a signature. The crave of perfumes is not just because of its availability but rather, often times it affects how we feel about ourselves, drives confidence and in situations gives a boost of support. Allow us walk with you on your scent discovery journey."

---

## 🔧 Development

### Running Locally

```bash
# Start development server
docker compose up frontend

# View logs
docker compose logs -f frontend

# Stop server
docker compose down

# Rebuild after changes
docker compose build frontend
docker compose up frontend
```

### Environment Variables

```bash
# frontend/.env.local
GROQ_API_KEY=gsk_your_api_key_here
```

### Building for Production

```bash
# Build production bundle
docker compose exec frontend pnpm build

# Start production server
docker compose exec frontend pnpm start
```

---

## 📊 AI Implementation Status

| Week | Feature | Status | Files | LOC |
|------|---------|--------|-------|-----|
| Week 1 | AI Chat Assistant | ✅ Complete | 8 files | ~800 |
| Week 2 | Natural Language Search | ✅ Complete | 3 files | ~600 |
| Week 3 | Enhanced Quiz Results | ✅ Complete | 1 file | ~200 |
| Week 4 | Advanced Features | 📅 Optional | - | - |

**Total AI Implementation:**
- **12 new files** (~1,800 lines of code)
- **3 API endpoints** (chat, search, quiz-enhance)
- **6 UI components** (chat, search, results)
- **100% FREE** (Groq free tier)
- **Production-ready** (error handling, rate limiting, fallbacks)

---

## 💡 Key AI Capabilities

### Chat Assistant Intelligence
```
✓ Product knowledge (20 fragrances)
✓ Budget awareness (prices in Naira)
✓ Occasion recommendations
✓ Scent note explanations
✓ Collection guidance
✓ Context-aware conversations
✓ Rate limited (10 msgs/hour per user)
```

### Search Intelligence
```
✓ Natural language understanding
✓ Price extraction ("under 60k")
✓ Category recognition ("oud fragrances")
✓ Mood detection ("bold and mysterious")
✓ Multi-filter combination
✓ Fallback to text search
```

### Quiz Intelligence
```
✓ Unique profile generation
✓ Personalized descriptions
✓ Match reasoning explanations
✓ Top 3 match identification
✓ Dynamic profile titles
✓ Contextual recommendations
```

---

## 📚 Documentation

### For Users
- **[Brand Overview](docs/brand_overview.md)** - Brand identity and positioning
- **How to use AI features** - See sections above

### For Developers
- **[AI Implementation Plan](docs/AI_impl.md)** - Complete 4-week AI roadmap
- **[AI Testing Guide](docs/AI_TESTING.md)** - Comprehensive testing checklist
- **[Development Roadmap](docs/roadmap.md)** - 8-week development timeline
- **[Improvements Plan](docs/improvments.md)** - Performance optimization
- **[Week 1 Report](docs/WEEK1_COMPLETE.md)** - Chat Assistant implementation
- **[Week 2 Report](docs/WEEK2_COMPLETE.md)** - Search implementation
- **[Week 3 Report](docs/WEEK3_COMPLETE.md)** - Quiz enhancement

---

## 🎯 Usage Examples

### Example 1: Finding a Scent via Chat

```
User opens chat → Clicks "Recommend a scent"
AI: "I'd love to help! What type of scent are you drawn to?"
User: "Something bold for evening events"
AI: "Perfect! For evening events, I recommend ETERNAL_OUD..."
     [Eternal Oud button appears]
User clicks → Views product page
```

### Example 2: Quick Search

```
User clicks search icon → Types "luxury oud under 70k"
AI Understanding: "Looking for luxury oud fragrances under ₦70,000"
Results: 3 products (ETERNAL_OUD, Eit of Crabia, Out of Crabia III)
User clicks product → Adds to wishlist
```

### Example 3: Personalized Quiz

```
User takes quiz → Answers 5 questions
AI generates: "The Confident Sophisticate"
Description: "Your refined taste for bold evening fragrances..."
Shows Top 3 Matches with reasoning for each
User explores recommended products
```

---

## 🌟 Highlights

### What Makes This Special

**🎨 Luxury Brand Experience**
- Sophisticated minimalism with rich warm tones
- Premium typography (Playfair Display + Inter)
- Elegant animations with Framer Motion
- Custom scrollbar and micro-interactions

**🤖 AI-First Approach**
- Three complementary AI features
- Natural conversation and search
- Personalized recommendations
- All running on free tier

**⚡ Performance-Optimized**
- Fast page loads (< 2 seconds)
- AI responses (1-3 seconds)
- Optimized images with Next.js Image
- Lazy loading for below-fold content

**📱 Mobile-First Design**
- Responsive across all devices
- Touch-optimized interfaces
- Mobile-specific components
- Fast mobile performance

---

## 💰 Cost Analysis

### Infrastructure Costs

| Service | Plan | Monthly Cost |
|---------|------|--------------|
| Groq AI | Free Tier | **$0** |
| Docker | Local Development | **$0** |
| Next.js | Open Source | **$0** |
| Hosting | TBD | TBD |

**Current Total:** **$0/month** for all AI features

### Groq Free Tier Limits
```
Daily: 14,400 requests
Hourly: 600 requests
Per Minute: 30 requests (increased limit)

Your Usage: ~500-1000 requests/day (estimated)
Utilization: < 7% of free tier
Sustainability: Excellent for early stage
```

---

## 🔒 Security & Privacy

- ✅ Environment variables for API keys
- ✅ Rate limiting (10 msgs/hour per user)
- ✅ No sensitive data storage
- ✅ Input validation on all endpoints
- ✅ Error handling and fallbacks
- ✅ HTTPS ready
- ✅ CSP headers configured

---

## 📈 Performance Metrics

### Page Load Times
- Homepage: < 2 seconds
- Product pages: < 1.5 seconds
- Quiz: < 2 seconds
- Search results: < 1 second

### AI Response Times
- Chat messages: 1-3 seconds
- Search queries: 1-2 seconds
- Quiz enhancement: 2-3 seconds

### Lighthouse Scores (Target)
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

---

## 🧪 Testing

### Manual Testing
```bash
# Run the app
docker compose up frontend

# Test Chat:
http://localhost:3000 → Click 💬 → Ask "recommend something"

# Test Search:
http://localhost:3000 → Click 🔍 → Type "bold scents under 60k"

# Test Quiz:
http://localhost:3000/quiz → Complete quiz → See AI profile
```

### Build Testing
```bash
# Production build
docker compose exec frontend pnpm build

# Type checking
docker compose exec frontend pnpm tsc --noEmit
```

---

## 🛠️ Commands

### Docker Commands
```bash
# Build images
docker compose build

# Start all services
docker compose up

# Start frontend only
docker compose up frontend

# Stop all services
docker compose down

# View logs
docker compose logs -f frontend

# Rebuild and restart
docker compose up --build frontend

# Clean rebuild
docker compose down -v
docker compose build --no-cache
docker compose up frontend
```

### Package Management (inside container)
```bash
# Install dependencies
docker compose exec frontend pnpm install

# Add package
docker compose exec frontend pnpm add package-name

# Update packages
docker compose exec frontend pnpm update

# Build for production
docker compose exec frontend pnpm build

# Start production server
docker compose exec frontend pnpm start
```

---

## 🎯 Roadmap

### Completed ✅
- [x] Docker containerization
- [x] Next.js 14 App Router setup
- [x] Luxury design system
- [x] Product catalog (20 products)
- [x] Scent discovery quiz
- [x] AI chat assistant
- [x] AI natural language search
- [x] AI-enhanced quiz results
- [x] Mobile optimization
- [x] SEO implementation

### In Progress 🚧
- [ ] Performance optimizations
- [ ] Testing framework
- [ ] Additional product images

### Future Enhancements 📅
- [ ] Backend API (Node.js/Express)
- [ ] Database (PostgreSQL)
- [ ] Authentication system
- [ ] Shopping cart
- [ ] Payment integration
- [ ] Order management
- [ ] Email notifications
- [ ] Admin dashboard

---

## 🤝 Contributing

This is a private project for Sanaya's Scents. For inquiries, please contact the team.

---

## 📄 License

Private - All rights reserved by Sanaya's Scents

---

## 👥 Team

**Development:** Celestine Emili  
**Brand:** Sanaya's Scents  
**AI Technology:** Groq (Llama 3.3)

---

## 📞 Support

For questions or issues:
- Check the [documentation](docs/)
- Review the [AI implementation guide](docs/AI_impl.md)
- See [testing guide](docs/AI_TESTING.md)

---

## 🎉 Achievements

**Built in Record Time:**
- ✅ Week 1: AI Chat Assistant (8 files, ~800 LOC)
- ✅ Week 2: Natural Language Search (3 files, ~600 LOC)
- ✅ Week 3: Enhanced Quiz (1 file, ~200 LOC)

**Total:** 3 weeks, 12 files, ~1,800 lines of AI code, **$0 cost**

**Result:** Production-ready AI-powered luxury fragrance discovery platform! 🚀

---

<div align="center">

### 🌸 Discover Your Signature Scent with AI 🌸

**Powered by Intelligence. Crafted with Elegance. Built for You.**

[Get Started](#-quick-start) • [View Docs](docs/) • [Contact](#-support)

---

Made with ❤️ for Sanaya's Scents

</div>
