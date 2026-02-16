import { SEOHead } from "@/app/components/SEOHead";
import { ScrollReveal } from "@/app/components/ScrollReveal";

export function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Cookie Policy | NIXRIX"
        description="Cookie policy for NIXRIX. Learn how cookies are used and how to control them."
        keywords="cookie policy, cookies, NIXRIX"
      />

      <section className="bg-gray-50 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h1 className="text-4xl font-bold text-gray-900">Cookie Policy</h1>
          <p className="text-gray-600 mt-3">
            Cookies help us improve the website and understand usage patterns.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <ScrollReveal>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900">What are cookies?</h2>
              <p className="text-gray-700">
                Cookies are small text files stored on your device to help websites function and improve user experience.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900">How we use cookies</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Essential cookies for site functionality</li>
                <li>Analytics cookies to understand site performance (when enabled)</li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900">Managing cookies</h2>
              <p className="text-gray-700">
                You can control cookies in your browser settings. Disabling cookies may affect site functionality.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
