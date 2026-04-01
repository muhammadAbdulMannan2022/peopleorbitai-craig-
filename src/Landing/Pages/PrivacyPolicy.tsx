import React from "react";
import Navbar from "../Sections/Navbar";
import { Footer } from "../Sections/Footer";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 md:px-16 py-16">
        <h1 className="text-4xl font-bold text-[#1a1a2e] mb-8">Privacy Policy</h1>
        
        <div className="space-y-8 text-[#64748b] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-[#1a1a2e] mb-4">3. How we use personal information</h2>
            <p className="mb-4">We use personal information to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>create and manage accounts, authenticate users, and provide the Services;</li>
              <li>deliver AI audit consulting, micro‑learning, and AI agents, including tailoring outputs to your templates and tone;</li>
              <li>operate, maintain, secure, and improve our Services (analytics, troubleshooting, quality assurance);</li>
              <li>provide support, send service updates, notify you of changes to terms/policies, and manage incidents;</li>
              <li>run training programmes, events, and partner activities (with appropriate consents);</li>
              <li>conduct lawful marketing (with easy opt‑out) and measure campaign effectiveness;</li>
              <li>comply with law, manage risk, prevent fraud and misuse, and enforce our agreements.</li>
            </ul>
            <p className="mt-4 font-medium text-[#1a1a2e]">No training of public models</p>
            <p>We do not use your prompts, documents, or outputs to train publicly available AI models. Model providers engaged by us are contractually restricted from using your data for their own model training.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1a1a2e] mb-4">4. Legal bases (purpose & consent)</h2>
            <p>We collect, hold, use, and disclose personal information where it is reasonably necessary for our functions and activities, with your consent where required. For marketing emails, you can withdraw consent at any time via the unsubscribe link or by contacting us.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1a1a2e] mb-4">5. Disclosing information to others</h2>
            <p className="mb-4">We may share personal information with:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>service providers (e.g., hosting, infrastructure, security, analytics, email, payments, support tooling, identity/SSO, model providers) under confidentiality and data‑protection obligations;</li>
              <li>implementation/training partners where you ask us to collaborate on delivery;</li>
              <li>event partners/sponsors if you register for a partner session and consent to sharing;</li>
              <li>professional advisers (legal, audit, insurance) and regulators or law enforcement where required by law or to protect rights, safety, or security;</li>
              <li>business transfers: in a merger, acquisition, or reorganisation, subject to appropriate safeguards.</li>
            </ul>
            <p className="mt-4">We do not sell personal information.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1a1a2e] mb-4">6. Overseas disclosure and storage</h2>
            <p>Our trusted providers may process and store data in Australia and other locations. Where personal information is disclosed overseas, we take reasonable steps to ensure recipients protect it in a manner substantially similar to the APPs (e.g., contract terms and security standards).</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1a1a2e] mb-4">7. Cookies, analytics and tracking</h2>
            <p>We use cookies and similar technologies to keep you signed in, remember preferences, measure site performance, and improve features. We also use Google Analytics to understand how our website and products are used and to improve the user experience. You can control cookies through your browser settings; blocking some cookies may affect functionality. Where required, we display a consent notice for analytics/marketing cookies.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1a1a2e] mb-4">8. Security</h2>
            <p className="mb-4">We implement administrative, technical, and physical safeguards designed to protect personal information against unauthorised access, alteration, disclosure, or loss—such as role‑based access, encryption in transit, environment segregation, monitoring, and staff training. No method is perfectly secure; we continuously review and improve our controls.</p>
            <p className="font-medium text-[#1a1a2e]">Notifiable Data Breaches (NDB) scheme</p>
            <p>If a data breach is likely to result in serious harm, we will assess promptly and notify affected individuals and the Office of the Australian Information Commissioner (OAIC) as required.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1a1a2e] mb-4">9. Data retention</h2>
            <p>We retain personal information only for as long as needed for the purposes set out in this policy or as required by law. Customer content in Finn/Nell can be deleted by you or upon request following contract end. We apply documented retention/destruction schedules and secure deletion processes.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1a1a2e] mb-4">10. Access and correction</h2>
            <p>You may request access to, or correction of, your personal information. We will respond within a reasonable period (generally within 30 days) and may require verification of identity. If we refuse a request, we will tell you why and how to complain.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1a1a2e] mb-4">11. Marketing choices</h2>
            <p>You can opt out of marketing at any time using the unsubscribe link or by contacting us. Service and transactional messages (e.g., security alerts, invoices, policy updates) are necessary for the operation of the Services and will still be sent.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1a1a2e] mb-4">12. Children</h2>
            <p>Our Services are designed for professional users. We do not knowingly collect personal information from individuals under 16. If you believe a child has provided personal information, please contact us and we will take appropriate steps to delete it.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1a1a2e] mb-4">13. Your responsibilities as a customer</h2>
            <p>If you upload or process third‑party personal information (e.g., employee or candidate data), you are responsible for ensuring you have a lawful basis and appropriate notices/consents. We act as your service provider for that content and handle it according to your configuration and our agreement.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1a1a2e] mb-4">14. How to contact us</h2>
            <p className="mb-2"><strong>Email:</strong> craig@talentflexx.com</p>
            <p><strong>Postal:</strong> Level 7, 10 Yarra St, South Yarra 3141, VIC Australia</p>
            <p className="mt-2 text-sm">For security‑sensitive requests, we may ask you to verify your identity and account ownership.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1a1a2e] mb-4">15. Complaints</h2>
            <p className="mb-4">If you have a privacy complaint, please contact us first. We will acknowledge and investigate your concern and aim to resolve it promptly. If you are not satisfied, you can contact the Office of the Australian Information Commissioner (OAIC):</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Website: oaic.gov.au</li>
              <li>Phone: 1300 363 992</li>
              <li>Post: GPO Box 5218, Sydney NSW 2001</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1a1a2e] mb-4">16. Changes to this policy</h2>
            <p>We may update this policy from time to time to reflect legal, technical, or operational changes. The "Last updated" date will be revised, and material changes will be communicated through reasonable channels.</p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-[#64748b]">Last updated: April 2026</p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;