import { Providers } from "./components/providers";
import { Navbar } from "./components/navbar";
import { HeroSection } from "./sections/hero";
import { HowItWorksSection } from "./sections/how-it-works";
import { FeaturesSection } from "./sections/features";
import { TestimonialsSection } from "./sections/testimonials";
import { CTASection } from "./sections/cta";
import { Footer } from "./sections/footer";
import { SocialProofSection } from "./sections/social-proof";

export default function Home() {
  return (
    <Providers>
      <main className="min-h-screen overflow-x-hidden relative">
        {/* Global Border-x Container - Spans entire page height */}
        <div className="fixed inset-0 pointer-events-none z-40">
          <div className="max-w-7xl mx-auto h-full relative">
            {/* Left border */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
            {/* Right border */}
            <div className="absolute right-0 top-0 bottom-0 w-px bg-border" />
          </div>
        </div>

        {/* NAVBAR - Fixed, dark background */}
        <div className="bg-[hsl(0,0%,12%)] text-white" id="top">
          <Navbar />
        </div>

        {/* HERO - Light gray background */}
        <section id="hero" className="relative bg-muted border-t border-border scroll-mt-24">
          <HeroSection />
        </section>

        {/* SOCIAL PROOF - Pure white background, no muted */}
        <section id="metrics" className="relative bg-background border-t border-border scroll-mt-24">
          <SocialProofSection/>
        </section>

        {/* HOW IT WORKS - Light gray background */}
        <section id="how-it-works" className="relative bg-muted border-t border-border scroll-mt-24">
          <HowItWorksSection />
        </section>

        {/* FEATURES - Pure white background */}
        <section id="features" className="relative bg-background border-t border-border scroll-mt-24">
          <FeaturesSection />
        </section>

        {/* TESTIMONIALS - Light gray background */}
        <section id="testimonials" className="relative bg-muted border-t border-border scroll-mt-24">
          <TestimonialsSection />
        </section>

        {/* CTA - Pure white background */}
        <section id="cta" className="relative bg-background border-t border-border scroll-mt-24">
          <CTASection />
        </section>

        {/* FOOTER - Dark background dengan border-x yang subtle untuk menutupi border global */}
        <footer id="footer" className="relative bg-[hsl(0,0%,12%)] text-white border-t border-[hsl(0,0%,20%)] scroll-mt-24">
          {/* Border-x yang subtle untuk menutupi border global */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="max-w-7xl mx-auto h-full relative">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-white/5" />
              <div className="absolute right-0 top-0 bottom-0 w-px bg-white/5" />
            </div>
          </div>
          <Footer />
        </footer>
      </main>
    </Providers>
  );
}
