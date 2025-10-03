import './globals.css';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StructuredData } from '@/components/seo/StructuredData';

export const metadata = {
  title: {
    default: "Sanaya's Scents - Luxury Fragrances",
    template: "%s | Sanaya's Scents"
  },
  description: "Discover your perfect fragrance with our personalized scent discovery quiz and curated collection of luxury perfumes. From oud to amber, find your signature scent.",
  keywords: ["luxury fragrances", "perfume", "scent discovery", "oud", "amber", "floral", "gourmand", "personalized fragrance"],
  authors: [{ name: "Sanaya's Scents" }],
  creator: "Sanaya's Scents",
  publisher: "Sanaya's Scents",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sanayascents.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sanayascents.com',
    title: "Sanaya's Scents - Luxury Fragrances",
    description: "Discover your perfect fragrance with our personalized scent discovery quiz and curated collection of luxury perfumes.",
    siteName: "Sanaya's Scents",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sanaya's Scents - Luxury Fragrances",
    description: "Discover your perfect fragrance with our personalized scent discovery quiz and curated collection of luxury perfumes.",
    creator: '@sanayascents',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const inter = Inter({ subsets: ['latin'], display: 'swap', preload: true, weight: ['400','500','600','700'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`bg-luxury-charcoal text-luxury-cream ${inter.className}`}>
        <StructuredData />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

