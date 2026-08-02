import { CtaFooter } from "../components/CtaFooter";
import { Features } from "../components/Features";
import { GameShowcase } from "../components/GameShowcase";
import { Hero } from "../components/Hero";
import { HowItWorks } from "../components/HowItWorks";
import { SiteHeader } from "../components/SiteHeader";

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <GameShowcase />
      </main>
      <CtaFooter />
    </div>
  )
}
