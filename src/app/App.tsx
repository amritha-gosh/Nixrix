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
import { AboutPage } from "@/app/pages/AboutPage";
import { ContactPage } from "@/app/pages/ContactPage";

import { CareersPage } from "@/app/pages/CareersPage";
import { PrivacyPolicyPage } from "@/app/pages/PrivacyPolicyPage";
import { TermsPage } from "@/app/pages/TermsPage";
import { CookiePolicyPage } from "@/app/pages/CookiePolicyPage";
import { HowWeWorkPage } from "@/app/pages/HowWeWorkPage";

export default function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="flex min-h-screen flex-col">
        <Navigation />

        <main className="flex-1">
          <Routes>
            {/* Core */}
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/case-studies" element={<WorkPage />} />
            <Route path="/how-we-work" element={<HowWeWorkPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Optional pages */}
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/cookies" element={<CookiePolicyPage />} />

            {/* Demos (keep for now) */}
            <Route path="/demo" element={<DemoPage />} />
            <Route path="/demo/dashboard" element={<DashboardDemoPage />} />
            <Route path="/demo/chatbot" element={<ChatbotDemoPage />} />
            <Route path="/demo/website" element={<WebsiteShowcasePage />} />
            <Route path="/demo/service-business" element={<ServiceBusinessDemo />} />
            <Route path="/demo/portfolio" element={<PortfolioDemo />} />

            {/* Old routes (redirects) */}
            <Route path="/solutions" element={<Navigate to="/services" replace />} />
            <Route path="/work" element={<Navigate to="/case-studies" replace />} />
            <Route path="/how-it-works" element={<Navigate to="/how-we-work" replace />} />

            {/* Removed pages -> redirect */}
            <Route path="/industries" element={<Navigate to="/services" replace />} />
            <Route path="/pricing" element={<Navigate to="/services" replace />} />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
