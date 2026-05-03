import { LegalPage } from '../Model/index.js';

const DEFAULTS = {
  'privacy-policy': {
    title: 'Privacy Policy',
    content: `Last updated: This policy describes how Astro With You ("we", "us") collects, uses, and protects your information when you use our website and services.

1. Information we collect
We may collect information you provide directly, such as name, email, phone number, birth details for consultations or reports, payment-related identifiers processed by our payment partners, and messages you send through contact or booking forms.

2. How we use information
We use this information to provide astrology consultations, horoscopes, bookings, customer support, service improvements, and legal compliance. We do not sell your personal information.

3. Sharing
We may share data with service providers who assist our operations (e.g. hosting, payments) under strict confidentiality, or when required by law.

4. Security
We take reasonable measures to protect your data. No method of transmission over the Internet is 100% secure.

5. Your choices
You may contact us to access, correct, or delete certain personal information where applicable law allows.

6. Contact
For privacy questions, use the contact details provided on our Contact page.`,
  },
  'terms-conditions': {
    title: 'Terms & Conditions',
    content: `These Terms & Conditions ("Terms") govern your use of Astro With You services and website. By using our services, you agree to these Terms.

1. Services
We provide astrology-related content, consultations, and related features. Availability may change. We may update these Terms from time to time.

2. Not professional advice
Astrology and related guidance are for informational and personal reflection purposes only. They are not a substitute for medical, legal, financial, or other professional advice. You are responsible for your own decisions.

3. Accounts and conduct
You agree to provide accurate information where required and not to misuse the platform, other users, or our staff.

4. Bookings and payments
Fees, cancellation policies, and refunds (if any) are as stated at the time of purchase or booking. Payment processing may be handled by third parties subject to their terms.

5. Intellectual property
Content on this site is owned by us or our licensors. You may not copy or redistribute it without permission except as allowed by law.

6. Limitation of liability
To the fullest extent permitted by law, we are not liable for indirect or consequential damages arising from use of the services.

7. Contact
For questions about these Terms, please reach us through our Contact page.`,
  },
};

const ALLOWED_SLUGS = Object.keys(DEFAULTS);

class LegalPageController {
  static async getBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      if (!ALLOWED_SLUGS.includes(slug)) {
        req.errorStatus = 404;
        throw new Error('Page not found');
      }
      let row = await LegalPage.findOne({ where: { slug } });
      if (!row) {
        const d = DEFAULTS[slug];
        row = await LegalPage.create({
          slug,
          title: d.title,
          content: d.content,
        });
      }
      res.json({
        status: true,
        data: {
          slug: row.slug,
          title: row.title,
          content: row.content,
          updated_at: row.updated_at,
        },
      });
    } catch (e) {
      next(e);
    }
  }
}

export { ALLOWED_SLUGS, DEFAULTS };
export default LegalPageController;
