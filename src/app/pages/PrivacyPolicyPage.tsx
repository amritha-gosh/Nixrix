import { SEOHead } from "@/app/components/SEOHead";
import { ScrollReveal } from "@/app/components/ScrollReveal";

export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Privacy Policy | NIXRIX"
        description="Privacy policy for NIXRIX Ltd. How we collect, use and protect your data."
        keywords="privacy policy, GDPR, NIXRIX"
      />

      <section className="bg-gray-50 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="text-gray-600 mt-3">
            This policy explains how NIXRIX handles personal data when you use our website or contact us.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <ScrollReveal>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900">What we collect</h2>
              <p className="text-gray-700">
                We may collect your name, email address, phone number (if provided), company details, and any message you submit via forms or chat.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900">How we use data</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>To respond to enquiries and provide requested information</li>
                <li>To deliver services and manage client relationships</li>
                <li>To improve our website experience and performance</li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900">Legal basis</h2>
              <p className="text-gray-700">
                We process data based on legitimate interests (responding to enquiries), performance of a contract (service delivery),
                or consent (where required).
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900">Data sharing</h2>
              <p className="text-gray-700">
                We do not sell your data. We may use trusted providers (e.g., email delivery, analytics) only to operate the service.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900">Your rights</h2>
              <p className="text-gray-700">
                You may request access, correction, deletion, or restriction of your data. Contact us at <strong>hello@nixrix.com</strong>.
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
