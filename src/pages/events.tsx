import { Helmet } from 'react-helmet-async';
import SectionHeading from '../components/ui/SectionHeading.tsx';
import makeWorkshops from '../components/workshopsElement.tsx';
import { services } from '../data/services.tsx';

export default function EventsPage() {
  return (
    <>
      <Helmet>
        <title>About EAL/EAP | Iris + Insight</title>
        <meta name="description" content="Listing of upcoming events at Iris + Insight." />
        <link rel="canonical" href="https://irisandinsight.com/events" />
      </Helmet>

      <section className="bg-brand-bg py-16 px-6">
        <div className="mx-auto max-w-[800px]">
          <SectionHeading eyebrow="Work With Us" title="Upcoming Events" />
          {services.map((service) => {
            if (service.workshops != null) {
              return makeWorkshops('', service.workshops);
            }
          })}
        </div>
      </section>
    </>
  );
}
