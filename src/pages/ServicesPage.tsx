import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SectionHeading from '../components/ui/SectionHeading';
import Card from '../components/ui/Card';
import { services, clientTags } from '../data/services';
import makeWorkshops from '../components/workshopsElement.tsx';

export default function ServicesPage() {
  const [openService, setOpenService] = useState<string | null>(null);

  const toggle = (name: string) => setOpenService((prev) => (prev === name ? null : name));

  return (
    <>
      <Helmet>
        <title>Services | Iris + Insight</title>
        <meta
          name="description"
          content="Personalized equine-assisted therapy for individuals, couples, families, and businesses."
        />
        <link rel="canonical" href="https://irisandinsight.com/services" />
      </Helmet>

      <section className="bg-brand-bg py-16 px-6">
        <div className="mx-auto max-w-[1200px]">
          <SectionHeading
            eyebrow="How We Help"
            title="Services"
            subtitle="Personalized approaches tailored to your needs and goals."
          />

          {/* Who We Serve */}
          <Card className="mt-12">
            <h3 className="font-display text-2xl font-medium text-brand-charcoal mb-3">
              Who We Serve
            </h3>
            <p className="font-body text-base leading-relaxed text-brand-charcoal-muted">
              At Iris + Insight, clients get two licensed therapists who care deeply about the work
              they do. We work with adolescents, adults, couples, families, and businesses —
              personalizing and tailoring our approaches to fit different needs and goals.
            </p>
            <p className="font-body text-base leading-relaxed text-brand-charcoal-muted mt-4">
              We are passionate about serving those looking for new approaches to personal and
              professional growth, including the LGBTQ+ community, underrepresented populations, and
              corporate teams.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {clientTags.map((tag) => (
                <span
                  key={tag}
                  className="bg-brand-teal-light text-brand-charcoal font-body text-sm font-medium px-4 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Card>

          {/* Focus Areas */}
          <Card className="mt-6">
            <h3 className="font-display text-2xl font-medium text-brand-charcoal mb-3">
              Our Focus Areas
            </h3>
            <p className="font-body text-base leading-relaxed text-brand-charcoal-muted">
              Building self-esteem, strengthening relationships, improving communication,
              encouraging teamwork, and fostering a sense of self-worth — all through the unique and
              intuitive language of horses.
            </p>
          </Card>

          {/* Service cards grid */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((service) => {
              const isOpen = openService === service.name;
              const panelId = `service-panel-${service.name.replace(/\s+/g, '-').toLowerCase()}`;
              return (
                <button
                  key={service.name}
                  onClick={() => toggle(service.name)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal rounded-xl"
                >
                  <Card
                    className={`transition-shadow duration-200 hover:shadow-md ${isOpen ? 'ring-2 ring-brand-teal' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-teal-light text-2xl">
                          <span aria-hidden="true">{service.icon}</span>
                        </div>
                        <h3 className="font-body text-base font-semibold text-brand-charcoal">
                          {service.name}
                        </h3>
                        <p className="font-body text-sm text-brand-charcoal-muted mt-1">
                          {service.description}
                        </p>
                      </div>
                      <span
                        aria-hidden="true"
                        className="ml-3 mt-1 text-brand-teal font-body text-lg leading-none select-none"
                      >
                        {isOpen ? '−' : '+'}
                      </span>
                    </div>
                    {isOpen && (
                      // Apply the extra description
                      <div style={{ paddingTop: '20px' }}>{service.extraDescription}</div>
                    )}
                    {isOpen &&
                      // Make the workshops for this service (if they exist)
                      service.workshops != null &&
                      makeWorkshops(panelId, service.workshops)}
                    <p
                      // Make the footer that each service has.
                      className="font-body text-sm text-brand-charcoal-muted"
                      style={{ paddingTop: '40px' }}
                    >
                      {service.footer},
                    </p>

                    <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                      <Link
                        to="/contact"
                        onClick={(e) => e.stopPropagation()}
                        className={`inline-block font-body text-sm font-medium px-5 py-2 rounded-full transition-colors duration-150 bg-brand-teal text-brand-white hover:bg-brand-teal-dark`}
                      >
                        Get in Touch
                      </Link>
                    </div>
                  </Card>
                </button>
              );
            })}
          </div>

          {/* Opportunities */}
          <div className="mt-10 text-center">
            <p className="font-body text-sm font-medium text-brand-charcoal-muted">
              EAL/EAP &nbsp;|&nbsp; Workshops &nbsp;|&nbsp; Corporate Partnerships
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
