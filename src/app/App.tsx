import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from '@/app/components/Navigation';
import { Footer } from '@/app/components/Footer';
import { HomePage } from '@/app/pages/HomePage';
import { ServicesPage } from '@/app/pages/ServicesPage';
import { WorkPage } from '@/app/pages/WorkPage';
import { DemoPage } from '@/app/pages/DemoPage';
import { DashboardDemoPage } from '@/app/pages/DashboardDemoPage';
import { ChatbotDemoPage } from '@/app/pages/ChatbotDemoPage';
import { WebsiteShowcasePage } from '@/app/pages/WebsiteShowcasePage';
import { ServiceBusinessDemo } from '@/app/pages/demos/ServiceBusinessDemo';
import { PortfolioDemo } from '@/app/pages/demos/PortfolioDemo';
import { HowItWorksPage } from '@/app/pages/HowItWorksPage';
import { AboutPage } from '@/app/pages/AboutPage';
import { ContactPage } from '@/app/pages/ContactPage';

export default function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="/demo/dashboard" element={<DashboardDemoPage />} />
            <Route path="/demo/chatbot" element={<ChatbotDemoPage />} />
            <Route path="/demo/website" element={<WebsiteShowcasePage />} />
            <Route path="/demo/service-business" element={<ServiceBusinessDemo />} />
            <Route path="/demo/portfolio" element={<PortfolioDemo />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
