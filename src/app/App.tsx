import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Navigation }       from "@/app/components/Navigation";
import { Footer }           from "@/app/components/Footer";
import { CustomCursor }     from "@/app/components/CustomCursor";
import { HomePage }         from "@/app/pages/HomePage";
import { ServicesPage }     from "@/app/pages/ServicesPage";
import { WorkPage }         from "@/app/pages/WorkPage";
import { AboutPage }        from "@/app/pages/AboutPage";
import { ContactPage }      from "@/app/pages/ContactPage";
import { HowWeWorkPage }    from "@/app/pages/HowWeWorkPage";
import { BlogPage }         from "@/app/pages/BlogPage";
import { PrivacyPolicyPage } from "@/app/pages/PrivacyPolicyPage";
import { TermsPage }        from "@/app/pages/TermsPage";
import { CookiePolicyPage } from "@/app/pages/CookiePolicyPage";

export default function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      {/* Custom cursor — renders globally, hidden on touch */}
      <CustomCursor />

      <div className="flex min-h-screen flex-col">
        <Navigation />

        <main className="flex-1">
          <Routes>
            {/* ── Core pages ─────────────────────────────── */}
            <Route path="/"             element={<HomePage />}        />
            <Route path="/services"     element={<ServicesPage />}    />
            <Route path="/work"         element={<WorkPage />}        />
            <Route path="/how-we-work"  element={<HowWeWorkPage />}   />
            <Route path="/about"        element={<AboutPage />}       />
            <Route path="/contact"      element={<ContactPage />}     />

            {/* ── Blog (listing + individual articles) ───── */}
            <Route path="/blog"         element={<BlogPage />}        />
            <Route path="/blog/:slug"   element={<BlogPage />}        />

            {/* ── Legal ──────────────────────────────────── */}
            <Route path="/privacy"      element={<PrivacyPolicyPage />} />
            <Route path="/terms"        element={<TermsPage />}         />
            <Route path="/cookies"      element={<CookiePolicyPage />}  />

            {/* ── Legacy redirects ────────────────────────── */}
            <Route path="/solutions"    element={<Navigate to="/services"  replace />} />
            <Route path="/case-studies" element={<Navigate to="/work"      replace />} />
            <Route path="/how-it-works" element={<Navigate to="/how-we-work" replace />} />
            <Route path="/industries"   element={<Navigate to="/services"  replace />} />
            <Route path="/pricing"      element={<Navigate to="/services"  replace />} />
            <Route path="/careers"      element={<Navigate to="/about"     replace />} />

            {/* ── Demo routes (keep during dev) ───────────── */}
            <Route path="/demo/*"       element={<Navigate to="/"          replace />} />

            {/* ── 404 ─────────────────────────────────────── */}
            <Route path="*"             element={<Navigate to="/"          replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
