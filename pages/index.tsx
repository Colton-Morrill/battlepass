import Head from 'next/head'
import MarketingHero from '@/components/MarketingHero'
import Footer from '@/components/Footer'
import HowItWorks from '@/components/HowItWorks'
import Rewards from '@/components/Rewards'

export default function Example() {
  return (
    <>
      <Head>
        <title>Battle Pass</title>
        <meta name="description" content="Midnight Island Battle Pass" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://www.coltonmorrill.com/vaporwave-01.svg" />
      </Head>
      <MarketingHero />
      <HowItWorks />
      <Rewards />
      <Footer />
    </>
  )
}
