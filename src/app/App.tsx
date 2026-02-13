import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";

import { HomePage } from "@/app/pages/HomePage";
import { ServicesPage } from "@/app/pages/ServicesPage";
import { WorkPage } from "@/app/pages/WorkPage";
import { DemoPage } from "@/app/pages/DemoPage";
import { DashboardDemoPage } from "@/app/pages/DashboardDemoPage";
import { ChatbotDemoPage } from "@/app/pages/ChatbotDemoPage";
import { WebsiteShowcasePage } from "@/app/pages/WebsiteShowcasePage";
import { ServiceBusinessDemo } from "@/app/pages/demos/ServiceBusinessDemo";
import { PortfolioDemo } from "@/app/pages/demos/PortfolioDemo";
import { HowItWorksPage } from "@/app/pages/HowItWorksPage";
import { AboutPage } from "@/app/pages/AboutPage";
import { ContactPage } from "@/app/pages/ContactPage";

export default function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="flex min-h-screen flex-col">
        <Navigation />
        <main className="flex-1">
          <Routes>
            {/* Core */}
            <Route path="/" element={<HomePage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* New structure (temporary mapping to existing pages until we update pages) */}
            <Route path="/solutions" element={<ServicesPage />} />
            <Route path="/industries" element={<DemoPage />} />
            <Route path="/case-studies" element={<WorkPage />} />
            <Route path="/pricing" element={<ServicesPage />} />

            {/* Keep old routes working */}
            <Route path="/services" element={<Navigate to="/solutions" replace />} />
            <Route path="/work" element={<Navigate to="/case-studies" replace />} />
            <Route path="/demo" element={<Navigate to="/industries" replace />} />

            {/* Demo subpages (we’ll later decide what stays public vs internal demo) */}
            <Route path="/demo/dashboard" element={<DashboardDemoPage />} />
            <Route path="/demo/chatbot" element={<ChatbotDemoPage />} />
            <Route path="/demo/website" element={<WebsiteShowcasePage />} />
            <Route path="/demo/service-business" element={<ServiceBusinessDemo />} />
            <Route path="/demo/portfolio" element={<PortfolioDemo />} />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
