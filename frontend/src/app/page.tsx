import { StunningHero } from '@/components/sections/StunningHero';
import { ProductShowcase } from '@/components/sections/ProductShowcase';
import dynamic from 'next/dynamic';
const InteractiveScentDiscovery = dynamic(() => import('@/components/sections/InteractiveScentDiscovery').then(m => m.InteractiveScentDiscovery), { ssr: true });
const LuxuryBrandStory = dynamic(() => import('@/components/sections/LuxuryBrandStory').then(m => m.LuxuryBrandStory), { ssr: true });
const InteractiveFragranceNotes = dynamic(() => import('@/components/sections/InteractiveFragranceNotes').then(m => m.InteractiveFragranceNotes), { ssr: true });
const LuxuryLifestyleSection = dynamic(() => import('@/components/sections/LuxuryLifestyleSection').then(m => m.LuxuryLifestyleSection), { ssr: true });
const InteractiveTestimonials = dynamic(() => import('@/components/sections/InteractiveTestimonials').then(m => m.InteractiveTestimonials), { ssr: true });
const InteractiveNewsletter = dynamic(() => import('@/components/sections/InteractiveNewsletter').then(m => m.InteractiveNewsletter), { ssr: true });
const InteractiveFAQ = dynamic(() => import('@/components/sections/InteractiveFAQ').then(m => m.InteractiveFAQ), { ssr: true });
const MobileScentDiscovery = dynamic(() => import('@/components/sections/MobileScentDiscovery').then(m => m.MobileScentDiscovery), { ssr: true });
const MobileBrandStory = dynamic(() => import('@/components/sections/MobileBrandStory').then(m => m.MobileBrandStory), { ssr: true });
const MobileTestimonials = dynamic(() => import('@/components/sections/MobileTestimonials').then(m => m.MobileTestimonials), { ssr: true });
const MobileNewsletter = dynamic(() => import('@/components/sections/MobileNewsletter').then(m => m.MobileNewsletter), { ssr: true });

export default function HomePage() {
  return (
    <>
      <StunningHero />
      <ProductShowcase />
      
      {/* Desktop-only sections; hidden on mobile to avoid layout/padding issues */}
      <div className="hidden md:block">
        <InteractiveScentDiscovery />
        <LuxuryBrandStory />
        <InteractiveFragranceNotes />
        <LuxuryLifestyleSection />
        <InteractiveTestimonials />
        <InteractiveNewsletter />
        <InteractiveFAQ />
      </div>

      {/* Mobile-only sections; optimized for mobile */}
      <div className="block md:hidden">
        <MobileScentDiscovery />
        <MobileBrandStory />
        <MobileTestimonials />
        <MobileNewsletter />
      </div>
    </>
  );
}


