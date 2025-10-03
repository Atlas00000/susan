import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Scent Discovery Quiz - Find Your Perfect Fragrance',
  description: 'Take our personalized scent discovery quiz to find your perfect fragrance match. Answer 5 simple questions and discover fragrances tailored to your personality.',
  keywords: ['scent quiz', 'fragrance quiz', 'perfume quiz', 'scent discovery', 'personalized fragrance'],
  openGraph: {
    title: 'Scent Discovery Quiz - Find Your Perfect Fragrance',
    description: 'Take our personalized quiz to discover fragrances that match your personality and preferences.',
  },
}

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
