import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import Companies from './_components/Companies';
import CTA from './_components/CTA';
import FAQ from './_components/FAQ';
import Footer from './_components/Footer';
import Hero from './_components/Hero';
import Navbar from './_components/Navbar';
import Pricing from './_components/Pricing';
import Testimony from './_components/Testimony';

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      <Navbar isLoggedIn={!!session} />
      <main>
        <Hero />
        <Companies />
        <Testimony />
        <Pricing />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
