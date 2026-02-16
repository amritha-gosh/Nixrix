import { SEOHead } from "@/app/components/SEOHead";
import { ScrollReveal } from "@/app/components/ScrollReveal";

export function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Terms & Conditions | NIXRIX"
        description="Website terms and conditions for NIXRIX."
        keywords="terms, conditions, NIXRIX"
      />

      <section className="bg-gray-50 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h1 className="text-4xl font-bold text-gray-900">Terms & Conditions</h1>
          <p className="text-gray-600 mt-3">
            These terms govern your use of our website and enquiries submitted through it.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <ScrollReveal>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900">Use of the website</h2>
              <p className="text-gray-700">
                You agree not to misuse the website, attempt unauthorised access, or disrupt service availability.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900">Enquiries & proposals</h2>
              <p className="text-gray-700">
                Information on this website is provided for general guidance. Any project scope, timelines, and commercial terms are confirmed in writing.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900">Intellectual property</h2>
              <p className="text-gray-700">
                Website content, branding and assets remain the property of NIXRIX unless stated otherwise.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900">Liability</h2>
              <p className="text-gray-700">
                We are not liable for indirect losses arising from website use. We aim to keep content accurate, but it may change over time.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900">Contact</h2>
              <p className="text-gray-700">
                Email: <strong>hello@nixrix.com</strong>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
