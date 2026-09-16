// Takes in a list of Workshop elements and creates a div to hold them all.
import type { Workshop } from '../data/services.tsx';

export default function makeWorkshops(panelId: string, workshops: Workshop[]) {
  const children = [];
  for (const workshop of workshops) {
    if (workshop != null && workshop.shouldShow(workshop.cutoff)) {
      children.push(makeWorkshopElement(panelId, workshop));
    }
  }

  if (children.length == 0) {
    return (
      <div key={panelId} className="container">
        <div id={panelId} className="mt-5 pt-5 border-t border-brand-gray-light text-center"></div>
        <span
          style={{
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          No events at this time. Check back soon or contact us with inquiries!
        </span>
      </div>
    );
  }

  return (
    <div key={panelId} className="container">
      {children}
    </div>
  );
}

// Takes in a single Workshop and makes the div element for its information.
function makeWorkshopElement(panelId: string, workshop: Workshop) {
  return (
    <div
      id={panelId}
      key={workshop.name}
      className="mt-5 pt-5 border-t border-brand-gray-light text-center"
    >
      <>
        <p>{workshop.name}</p>
        <p>{workshop.date}</p>
        {workshop.dateNotes != null && <p>{workshop.dateNotes}</p>}
        <img
          src={workshop.image}
          alt="Workshop Flyer"
          fetchPriority="high"
          loading="eager"
          width={900}
          height={1200}
        />
        {workshop.signupUrl != null && (
          <a
            href={workshop.signupUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-block bg-brand-teal text-brand-white font-body text-sm font-medium px-5 py-2 rounded-full hover:bg-brand-teal-dark transition-colors duration-150"
          >
            Register
          </a>
        )}
      </>
    </div>
  );
}
