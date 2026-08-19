import {
  getAbout,
  getFaq,
  getJson,
  getServices,
} from "@/lib/content";
import type { PortfolioData, PricingData } from "@/lib/content";
import { Hero } from "@/components/hero";
import { PortfolioSection } from "@/components/portfolio";
import { BeforeAfterSection } from "@/components/before-after";
import { HookStylesSection } from "@/components/hook-styles";
import { ServicesSection } from "@/components/services";
import { PricingSection } from "@/components/pricing";
import { AboutSection } from "@/components/about";
import { FaqSection } from "@/components/faq-section";
import { LeadFormSection } from "@/components/lead-form";
import { Footer } from "@/components/footer";

export default function Page() {
  const portfolio = getJson<PortfolioData>("portfolio.json");
  const pricing = getJson<PricingData>("pricing.json");
  const services = getServices();
  const about = getAbout();
  const faq = getFaq();

  return (
    <>
      <Hero />
      <PortfolioSection data={portfolio} />
      <BeforeAfterSection data={portfolio} />
      <HookStylesSection data={portfolio} />
      <ServicesSection sections={services} />
      <PricingSection data={pricing} />
      <AboutSection sections={about} />
      <FaqSection entries={faq} />
      <LeadFormSection />
      <Footer />
    </>
  );
}
