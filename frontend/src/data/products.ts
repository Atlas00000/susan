import { Product } from '@/types'

export const mockProducts: Product[] = [
  // OUD & RICH COLLECTION
  {
    id: 'eternal-oud',
    name: 'ETERNAL_OUD',
    description: 'A journey through ancient souks and royal courts. This complex oud blend tells a story of tradition, luxury, and timeless elegance.',
    price: 65000,
    category: 'oud-rich',
    mood: 'bold-mysterious',
    notes: ['Oud', 'Sandalwood', 'Amber', 'Rose'],
    story: 'For those who understand that true luxury is never loud, but always memorable. This complex oud blend evokes the mystique of ancient traditions and modern sophistication.',
    images: ['/images/products/ETERNAL_OUD.jpeg'],
    availability: 'in-stock',
    featured: true
  },
  {
    id: 'out-of-crabia-iii',
    name: 'Out of Crabia III',
    description: 'The third in our legendary Out of Crabia series. A sophisticated oud that captures the essence of Arabian luxury.',
    price: 72000,
    category: 'oud-rich',
    mood: 'elegant-romantic',
    notes: ['Oud', 'Frankincense', 'Musk', 'Saffron'],
    story: 'Inspired by the royal courts of the Middle East, this fragrance embodies the opulence and refinement of Arabian nobility.',
    images: ['/images/products/Out_of_Crabia_III.jpeg'],
    availability: 'limited',
    featured: true
  },
  {
    id: 'eit-of-crabia',
    name: 'Eit of Crabia',
    description: 'A refined oud composition that speaks to the connoisseur. Rich, complex, and unforgettable.',
    price: 58000,
    category: 'oud-rich',
    mood: 'bold-mysterious',
    notes: ['Oud', 'Cedar', 'Amber', 'Spices'],
    story: 'For the sophisticated soul who appreciates depth and complexity. This oud tells a story of ancient wisdom and modern luxury.',
    images: ['/images/products/Eit_of_Crabia1.jpeg'],
    availability: 'in-stock',
    featured: false
  },

  // AMBER & GOLD COLLECTION
  {
    id: 'royal-amber',
    name: 'ROYAL_AmBER',
    description: 'Liquid gold in a bottle. This warm, enveloping amber evokes the confidence of royalty and the warmth of golden hour.',
    price: 62000,
    category: 'amber-gold',
    mood: 'elegant-romantic',
    notes: ['Amber', 'Vanilla', 'Sandalwood', 'Honey'],
    story: 'For the individual who knows their worth and isn\'t afraid to show it. This warm amber embodies confidence and luxury.',
    images: ['/images/products/GOLD.jpeg'],
    availability: 'in-stock',
    featured: true
  },
  {
    id: 'gold',
    name: 'GOLD',
    description: 'Pure luxury in its most refined form. A golden fragrance that radiates sophistication and elegance.',
    price: 68000,
    category: 'amber-gold',
    mood: 'elegant-romantic',
    notes: ['Gold', 'Amber', 'Vanilla', 'Musk'],
    story: 'The ultimate expression of luxury. This golden fragrance is for those who demand nothing but the finest.',
    images: ['/images/products/GOLD.jpeg'],
    availability: 'in-stock',
    featured: true
  },
  {
    id: 'amber-rouge',
    name: 'AMBER_ROUGE',
    description: 'A passionate amber with a hint of mystery. Warm, seductive, and utterly captivating.',
    price: 55000,
    category: 'amber-gold',
    mood: 'elegant-romantic',
    notes: ['Amber', 'Rose', 'Spices', 'Musk'],
    story: 'For the passionate soul who loves with intensity. This amber tells a story of desire and sophistication.',
    images: ['/images/products/AMBER_ROUGE.jpeg'],
    availability: 'in-stock',
    featured: false
  },

  // FLORAL & FRESH COLLECTION
  {
    id: 'grecia',
    name: 'GRECIA',
    description: 'Inspired by the gardens of ancient Greece. Fresh, elegant, and eternally beautiful.',
    price: 52000,
    category: 'floral-fresh',
    mood: 'fresh-clean',
    notes: ['White Flowers', 'Citrus', 'Green Leaves', 'Musk'],
    story: 'Like a walk through the gardens of ancient Greece, this fragrance captures the essence of timeless beauty and grace.',
    images: ['/images/products/GRECIA.jpeg'],
    availability: 'in-stock',
    featured: true
  },
  {
    id: 'olena',
    name: 'OLENA',
    description: 'A modern interpretation of classic floral elegance. Fresh, sophisticated, and effortlessly chic.',
    price: 51000,
    category: 'floral-fresh',
    mood: 'fresh-clean',
    notes: ['Rose', 'Jasmine', 'Lily', 'Musk'],
    story: 'For the modern woman who appreciates classic beauty with a contemporary twist. Fresh, elegant, and unforgettable.',
    images: ['/images/products/OLENA.jpeg'],
    availability: 'in-stock',
    featured: false
  },
  {
    id: 'cherry-intense',
    name: 'Cherry Intense',
    description: 'A burst of cherry blossoms in full bloom. Intense, beautiful, and impossible to ignore.',
    price: 50000,
    category: 'floral-fresh',
    mood: 'sweet-playful',
    notes: ['Cherry Blossom', 'Fruity', 'Floral', 'Musk'],
    story: 'Like cherry blossoms dancing in the spring breeze, this fragrance captures the joy and beauty of new beginnings.',
    images: ['/images/products/cherry_intense.jpeg'],
    availability: 'in-stock',
    featured: false
  },
  {
    id: 'natural-intense',
    name: 'NATURAL_INTENSE',
    description: 'Pure, natural beauty intensified. A celebration of nature\'s most precious gifts.',
    price: 53000,
    category: 'floral-fresh',
    mood: 'fresh-clean',
    notes: ['Natural Essences', 'Green', 'Floral', 'Wood'],
    story: 'For those who believe in the power of natural beauty. This fragrance celebrates the pure essence of nature.',
    images: ['/images/products/NATURAL_INTENSE.jpeg'],
    availability: 'in-stock',
    featured: false
  },

  // GOURMAND & UNIQUE COLLECTION
  {
    id: 'coffee',
    name: 'COFFEE',
    description: 'Bold, unconventional, unforgettable. This rich coffee blend is for the confident individual who makes their own rules.',
    price: 57000,
    category: 'gourmand-unique',
    mood: 'bold-mysterious',
    notes: ['Coffee', 'Vanilla', 'Chocolate', 'Spices'],
    story: 'Perfect for those who want to stand out in a world of conformity. This coffee fragrance is bold, unique, and unforgettable.',
    images: ['/images/products/COFFEE.jpeg'],
    availability: 'in-stock',
    featured: true
  },
  {
    id: 'liquid-brun',
    name: 'Liquid Brun',
    description: 'A sophisticated brown fragrance that captures the essence of luxury and refinement.',
    price: 54000,
    category: 'gourmand-unique',
    mood: 'elegant-romantic',
    notes: ['Brown Sugar', 'Vanilla', 'Wood', 'Musk'],
    story: 'For the sophisticated individual who appreciates the finer things in life. Rich, warm, and utterly luxurious.',
    images: ['/images/products/liquid_brun.jpeg'],
    availability: 'in-stock',
    featured: false
  },
  {
    id: 'dimmah',
    name: 'Dimmah',
    description: 'A mysterious fragrance that whispers secrets of the night. Dark, seductive, and unforgettable.',
    price: 61000,
    category: 'gourmand-unique',
    mood: 'bold-mysterious',
    notes: ['Dark Woods', 'Spices', 'Musk', 'Amber'],
    story: 'For the mysterious soul who loves the night. This fragrance tells a story of secrets and seduction.',
    images: ['/images/products/dimmah.jpeg'],
    availability: 'in-stock',
    featured: false
  },
  {
    id: 'della',
    name: 'Della',
    description: 'A delicate fragrance that captures the essence of feminine grace and beauty.',
    price: 51000,
    category: 'gourmand-unique',
    mood: 'sweet-playful',
    notes: ['Floral', 'Fruity', 'Vanilla', 'Musk'],
    story: 'For the woman who embodies grace and beauty. This fragrance celebrates the essence of femininity.',
    images: ['/images/products/della.jpeg'],
    availability: 'in-stock',
    featured: false
  },

  // SIGNATURE EDITIONS
  {
    id: 'afnan',
    name: 'AFNAN',
    description: 'An exclusive creation for the discerning few. Rare, precious, and utterly unique.',
    price: 75000,
    category: 'signature',
    mood: 'elegant-romantic',
    notes: ['Rare Oud', 'Rose', 'Saffron', 'Amber'],
    story: 'For the connoisseur who demands the extraordinary. This exclusive fragrance is a masterpiece of perfumery.',
    images: ['/images/products/AFNAN.jpeg'],
    availability: 'limited',
    featured: true
  },
  {
    id: 'ajwad',
    name: 'Ajwad',
    description: 'A royal fragrance fit for kings and queens. Majestic, powerful, and utterly regal.',
    price: 73000,
    category: 'signature',
    mood: 'bold-mysterious',
    notes: ['Royal Oud', 'Frankincense', 'Gold', 'Spices'],
    story: 'Inspired by the royal courts of ancient kingdoms. This fragrance embodies power, majesty, and regal elegance.',
    images: ['/images/products/ajwad.jpeg'],
    availability: 'limited',
    featured: true
  },
  {
    id: 'haya',
    name: 'Haya',
    description: 'A celebration of life and beauty. Fresh, vibrant, and full of joy.',
    price: 52000,
    category: 'signature',
    mood: 'sweet-playful',
    notes: ['Floral', 'Fruity', 'Green', 'Musk'],
    story: 'For the joyful soul who celebrates life\'s beautiful moments. This fragrance captures the essence of happiness.',
    images: ['/images/products/haya.jpeg'],
    availability: 'in-stock',
    featured: false
  },
  {
    id: 'leen',
    name: 'Leen',
    description: 'A gentle fragrance that whispers of softness and grace. Delicate, beautiful, and utterly charming.',
    price: 51000,
    category: 'signature',
    mood: 'elegant-romantic',
    notes: ['Soft Florals', 'Vanilla', 'Musk', 'Powder'],
    story: 'For the gentle soul who embodies grace and softness. This fragrance is like a gentle caress.',
    images: ['/images/products/leen.jpeg'],
    availability: 'in-stock',
    featured: false
  },
  {
    id: 'khadlaj',
    name: 'KHADLAJ',
    description: 'An ancient fragrance with modern appeal. Timeless, mysterious, and utterly captivating.',
    price: 69000,
    category: 'signature',
    mood: 'bold-mysterious',
    notes: ['Ancient Oud', 'Spices', 'Amber', 'Musk'],
    story: 'Inspired by ancient perfumery traditions. This fragrance tells a story of timeless beauty and mystery.',
    images: ['/images/products/KHADLAJ.jpeg'],
    availability: 'limited',
    featured: true
  }
]

export const getProductsByCategory = (category: string) => {
  return mockProducts.filter(product => product.category === category)
}

export const getFeaturedProducts = () => {
  return mockProducts.filter(product => product.featured)
}

export const getProductById = (id: string) => {
  return mockProducts.find(product => product.id === id)
}
