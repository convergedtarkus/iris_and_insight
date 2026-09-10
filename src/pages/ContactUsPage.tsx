import { Helmet } from 'react-helmet-async';
import SectionHeading from '../components/ui/SectionHeading';
import Card from '../components/ui/Card';
import ContactForm from '../components/sections/ContactForm';

const facebookSVGPath = (
  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
);
const instagramSVGPath = (
  <path
    d="M295.42,6c-53.2,2.51-89.53,11-121.29,23.48-32.87,12.81-60.73,30-88.45,57.82S40.89,143,28.17,175.92c-12.31,31.83-20.65,68.19-23,121.42S2.3,367.68,2.56,503.46,3.42,656.26,6,709.6c2.54,53.19,11,89.51,23.48,121.28,12.83,32.87,30,60.72,57.83,88.45S143,964.09,176,976.83c31.8,12.29,68.17,20.67,121.39,23s70.35,2.87,206.09,2.61,152.83-.86,206.16-3.39S799.1,988,830.88,975.58c32.87-12.86,60.74-30,88.45-57.84S964.1,862,976.81,829.06c12.32-31.8,20.69-68.17,23-121.35,2.33-53.37,2.88-70.41,2.62-206.17s-.87-152.78-3.4-206.1-11-89.53-23.47-121.32c-12.85-32.87-30-60.7-57.82-88.45S862,40.87,829.07,28.19c-31.82-12.31-68.17-20.7-121.39-23S637.33,2.3,501.54,2.56,348.75,3.4,295.42,6m5.84,903.88c-48.75-2.12-75.22-10.22-92.86-17-23.36-9-40-19.88-57.58-37.29s-28.38-34.11-37.5-57.42c-6.85-17.64-15.1-44.08-17.38-92.83-2.48-52.69-3-68.51-3.29-202s.22-149.29,2.53-202c2.08-48.71,10.23-75.21,17-92.84,9-23.39,19.84-40,37.29-57.57s34.1-28.39,57.43-37.51c17.62-6.88,44.06-15.06,92.79-17.38,52.73-2.5,68.53-3,202-3.29s149.31.21,202.06,2.53c48.71,2.12,75.22,10.19,92.83,17,23.37,9,40,19.81,57.57,37.29s28.4,34.07,37.52,57.45c6.89,17.57,15.07,44,17.37,92.76,2.51,52.73,3.08,68.54,3.32,202s-.23,149.31-2.54,202c-2.13,48.75-10.21,75.23-17,92.89-9,23.35-19.85,40-37.31,57.56s-34.09,28.38-57.43,37.5c-17.6,6.87-44.07,15.07-92.76,17.39-52.73,2.48-68.53,3-202.05,3.29s-149.27-.25-202-2.53m407.6-674.61a60,60,0,1,0,59.88-60.1,60,60,0,0,0-59.88,60.1M245.77,503c.28,141.8,115.44,256.49,257.21,256.22S759.52,643.8,759.25,502,643.79,245.48,502,245.76,245.5,361.22,245.77,503m90.06-.18a166.67,166.67,0,1,1,167,166.34,166.65,166.65,0,0,1-167-166.34"
    transform="translate(-2.5 -2.5)"
  />
);

export default function ContactUsPage() {
  return (
    <>
      <Helmet>
        <title>Contact Us | Iris + Insight</title>
        <meta
          name="description"
          content="Get in touch with Iris + Insight to learn more about our equine-assisted services."
        />
        <link rel="canonical" href="https://irisandinsight.com/contact" />
      </Helmet>

      <section className="bg-brand-bg py-16 px-6">
        <div className="mx-auto max-w-[1200px]">
          <SectionHeading
            eyebrow="Get in Touch"
            title="Contact Us"
            subtitle="We'd love to hear from you."
          />

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Form */}
            <Card>
              <ContactForm />
            </Card>

            {/* Contact info */}
            <Card>
              <h3 className="font-display text-2xl font-medium text-brand-charcoal mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div>
                  <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal mb-2">
                    Email
                  </p>
                  <a
                    href="mailto:irisandinsight@gmail.com"
                    className="inline-flex items-center gap-2 font-body text-sm text-brand-teal underline underline-offset-2 hover:text-brand-teal-dark focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 rounded-sm transition-colors py-1"
                  >
                    <svg
                      aria-hidden="true"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    irisandinsight@gmail.com
                  </a>
                </div>
                <div>
                  <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal mb-2">
                    Phone
                  </p>
                  <a
                    href="tel:+15154281728"
                    className="inline-flex items-center gap-2 font-body text-sm text-brand-teal underline underline-offset-2 hover:text-brand-teal-dark focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 rounded-sm transition-colors py-1"
                  >
                    <svg
                      aria-hidden="true"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    515-428-1728
                  </a>
                </div>
                <div>
                  <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal mb-2">
                    Location
                  </p>
                  <p className="font-body text-sm text-brand-charcoal-muted">Central Iowa</p>
                </div>
                <div>
                  <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal mb-2">
                    Social Media
                  </p>
                  <a
                    href="https://www.facebook.com/share/1JTUw2LJGZ/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Iris + Insight on Facebook (opens in new tab)"
                    className="inline-flex items-center gap-2 font-body text-sm text-brand-teal underline underline-offset-2 hover:text-brand-teal-dark focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 rounded-sm transition-colors py-1"
                  >
                    <svg
                      aria-hidden="true"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="shrink-0"
                    >
                      {facebookSVGPath}
                    </svg>
                    Iris + Insight on Facebook
                    <span className="sr-only">(opens in new tab)</span>
                  </a>
                  <p>
                    <a
                      href="https://www.instagram.com/irisandinsight/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Iris + Insight on Instagram (opens in new tab)"
                      className="inline-flex items-center gap-2 font-body text-sm text-brand-teal underline underline-offset-2 hover:text-brand-teal-dark focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 rounded-sm transition-colors py-1"
                    >
                      <svg
                        aria-hidden="true"
                        width="16"
                        height="16"
                        viewBox="0 0 1000 1000"
                        fill="currentColor"
                        className="shrink-0"
                      >
                        {instagramSVGPath}
                      </svg>
                      Iris + Insight on Instagram
                      <span className="sr-only">(opens in new tab)</span>
                    </a>
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
