import { SEOHead } from "@/app/components/SEOHead";
import { ChatbotWidget } from "@/app/components/ChatbotWidget";
import { HomeHeroSection } from "@/app/components/home/HomeHeroSection";

export function HomePage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SEOHead
        title="NIXRIX - Business Websites, Dashboards, Automation & AI"
        description="NIXRIX builds high-performance business websites with dashboards, automation, chatbots, and integrated digital systems for growing SMEs."
        keywords="NIXRIX, business websites, automation, dashboards, chatbot, SME digital solutions"
        schemaType="organization"
      />

      <ChatbotWidget />
      <HomeHeroSection />
    </div>
  );
}
