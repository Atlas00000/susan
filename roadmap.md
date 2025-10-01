# Sanaya's Scents - Docker Development Roadmap

## Project Architecture (Docker-First)

### **Container Structure**
```
sanaya-scents/
├── docker-compose.yml
├── .env.example
├── .gitignore
├── README.md
├── frontend/                 # Next.js App
│   ├── Dockerfile
│   ├── package.json
│   └── src/
├── backend/                  # Node.js API (Future)
│   ├── Dockerfile
│   ├── package.json
│   └── src/
├── database/                 # PostgreSQL
│   ├── init.sql
│   └── migrations/
└── nginx/                    # Reverse Proxy
    └── nginx.conf
```

## Development Roadmap (8 Weeks - Daily Breakdown)

### **Week 1: Foundation Setup**
**Priority: HIGH**

**Day 1:** Create repo structure, add `.gitignore`, `.env.example`, `README` skeleton
**Day 2:** Add `docker-compose.yml` with `frontend` service; write `frontend/Dockerfile` with pnpm
**Day 3:** Scaffold Next.js (App Router, TS), `page.tsx`, `layout.tsx`, `next.config`
**Day 4:** Add Tailwind (`globals.css`, `tailwind.config`, `postcss.config`), base tokens
**Day 5:** Verify Docker build, static lint pass, finalize Week 1 docs

**Deliverables:**
- Working Docker environment
- Basic homepage with hero section
- Development documentation

### **Week 2: Core UI Components**
**Priority: HIGH**

**Day 1:** Define color tokens, typography scale, spacing, container widths
**Day 2:** Build base components: `Button`, `Card`, `Badge`, `Container`
**Day 3:** Layout components: `Header`, `Footer`, `Navigation`
**Day 4:** Sections: `Hero` (luxury look), `FeatureStrip`
**Day 5:** Responsive checks, accessibility sweep, refine tokens

**Deliverables:**
- Reusable UI component library
- Mobile-responsive design
- Brand-consistent styling

### **Week 3: Product Catalog**
**Priority: HIGH**

**Day 1:** Define `Product` and `Collection` types; set directory structure
**Day 2:** Add mock products (by scent families) and image references
**Day 3:** Implement `ProductGrid` with category filters (client-only)
**Day 4:** Product detail page template with gallery and story block
**Day 5:** Collections index page + UX polish on grids and cards

**Deliverables:**
- Complete product catalog
- Product detail pages
- Collection filtering

### **Week 4: Scent Discovery Quiz**
**Priority: HIGH**

**Day 1:** Model questions/answers; map answers to scent families
**Day 2:** Quiz UI (progress, steps, validation)
**Day 3:** Recommendation logic and results mapping to products
**Day 4:** Results page with "recommended" grid and CTA
**Day 5:** QA the flow, add tracking hooks (placeholder for analytics)

**Deliverables:**
- Interactive scent quiz
- Product recommendation system
- Quiz analytics

### **Week 5: Content Management**
**Priority: MEDIUM**

**Day 1:** About page (brand story) + typography polish
**Day 2:** Education/blog index (static), article template (MDX optional)
**Day 3:** Contact page (static form UI), newsletter signup UI stub
**Day 4:** Meta tags, Open Graph, sitemap/static SEO boilerplate
**Day 5:** Copy pass and imagery alignment across pages

**Deliverables:**
- Content pages
- Contact functionality
- SEO-ready structure

### **Week 6: Advanced Features**
**Priority: MEDIUM**

**Day 1:** Wishlist (localStorage), "heart" toggle on cards/detail
**Day 2:** Client search (name/notes), debounce and empty states
**Day 3:** Advanced filtering (family, mood), combine with search
**Day 4:** Performance profiling: images, code-splitting, tree-shaking
**Day 5:** Microinteractions/animations (light, tasteful)

**Deliverables:**
- Enhanced user experience
- Search and filtering
- Performance optimizations

### **Week 7: Testing & Polish**
**Priority: MEDIUM**

**Day 1:** Cross-browser smoke tests; fix layout edge cases
**Day 2:** Mobile-first pass; refine spacing/typography
**Day 3:** Accessibility (landmarks, color contrast, focus states)
**Day 4:** Content review; broken links, image alt text
**Day 5:** Fix bugs found; finalize UI constants

**Deliverables:**
- Bug-free application
- Performance benchmarks
- Cross-platform compatibility

### **Week 8: Deployment & Documentation**
**Priority: LOW**

**Day 1:** Production Docker config sanity (envs, caching)
**Day 2:** Update `README` with run/build steps and structure
**Day 3:** Add lightweight contribution/dev guide
**Day 4:** Final performance sweep (LCP/CLS basics)
**Day 5:** Release checklist, tag, and handoff notes

**Deliverables:**
- Production-ready application
- Complete documentation
- Deployment guide

## Docker Configuration

### **docker-compose.yml**
```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    depends_on:
      - database

  database:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=sanaya_scents
      - POSTGRES_USER=admin
      - POSTGRES_PASSWORD=password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - frontend

volumes:
  postgres_data:
```

### **Frontend Dockerfile**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
```

## Modular Architecture

### **Frontend Structure**
```
frontend/src/
├── app/                      # Next.js App Router
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                   # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Modal.tsx
│   ├── layout/               # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   └── sections/             # Page sections
│       ├── Hero.tsx
│       ├── ProductGrid.tsx
│       └── Quiz.tsx
├── lib/
│   ├── utils.ts
│   ├── quiz-logic.ts
│   └── product-data.ts
├── data/
│   ├── products/
│   ├── collections/
│   └── quiz-questions.ts
└── types/
    ├── product.ts
    └── quiz.ts
```

## Development Workflow

### **Daily Development**
```bash
# Start development environment
docker-compose up -d

# View logs
docker-compose logs -f frontend

# Stop environment
docker-compose down

# Rebuild containers
docker-compose up --build
```

### **Code Organization**
- **Modular components** - Reusable and testable
- **Type safety** - TypeScript throughout
- **Consistent naming** - Clear, descriptive names
- **Separation of concerns** - Logic separated from UI
- **Documentation** - Inline comments and README

## Priority Matrix

| Feature | Week | Priority | Complexity | Impact |
|---------|------|----------|------------|---------|
| Docker Setup | 1 | HIGH | LOW | HIGH |
| UI Components | 2 | HIGH | MEDIUM | HIGH |
| Product Catalog | 3 | HIGH | MEDIUM | HIGH |
| Scent Quiz | 4 | HIGH | HIGH | HIGH |
| Content Pages | 5 | MEDIUM | LOW | MEDIUM |
| Advanced Features | 6 | MEDIUM | HIGH | MEDIUM |
| Testing | 7 | MEDIUM | MEDIUM | HIGH |
| Deployment | 8 | LOW | LOW | MEDIUM |

## Success Metrics

### **Week 1-2: Foundation**
- Docker environment running
- Basic UI components working
- Development workflow established

### **Week 3-4: Core Features**
- Product catalog functional
- Scent quiz working
- Mobile responsive

### **Week 5-6: Enhancement**
- Content management working
- Advanced features implemented
- Performance optimized

### **Week 7-8: Production Ready**
- All features tested
- Documentation complete
- Deployment ready

## Risk Mitigation

### **Technical Risks**
- **Port conflicts** - Docker isolates all services
- **Dependency issues** - Containerized environment
- **Performance** - Optimized Docker images
- **Scalability** - Modular architecture

### **Development Risks**
- **Scope creep** - Clear weekly deliverables
- **Over-engineering** - Focus on MVP features
- **Timeline delays** - Buffer time in schedule
- **Quality issues** - Testing in each week

This roadmap ensures a systematic, modular approach to building your luxury scents website while maintaining Docker containerization and avoiding port conflicts. Each week has clear deliverables and priorities, making it easy to track progress and scale when needed.

