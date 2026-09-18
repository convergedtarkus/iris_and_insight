import ValueCard from '../ui/ValueCard';
import prideHorseshoes from '/assets/images/pride_horseshoes _nobackground.png';

export default function InclusionStatement() {
  return (
    <section className="bg-brand-off-white border-y border-brand-gray-light py-16 px-6">
      <div className="mx-auto max-w-[1200px]">
        <div className="text-center mb-10">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal mb-4">
            Inclusion Statement
          </p>
          <p className="font-body text-base text-brand-charcoal-muted max-w-3xl mx-auto leading-relaxed">
            Iris + Insight is committed to creating a safe, welcoming, and affirming environment for
            all individuals regardless of race, ethnicity, gender identity, sexual orientation, age,
            religion, ability, or socioeconomic status. We believe that healing and growth are for
            everyone, and we honor the unique strengths and experiences each person brings. Our work
            is rooted in respect, cultural humility, and the belief that every person — and every
            horse — has something valuable to offer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <ValueCard
            title="Inclusivity"
            description="We welcome and affirm all people, honoring the diverse backgrounds and identities of those we serve."
          />
          <ValueCard
            title="Respect"
            description="We approach every individual — human and horse — with dignity, empathy, and an open heart."
          />
          <ValueCard
            title="Resourcefulness"
            description="We creatively adapt our services to meet the unique needs and goals of each client."
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '25px' }}>
        <img
          src={prideHorseshoes}
          alt="Collection of pride collected horseshoes"
          fetchPriority="low"
          loading="lazy"
          width={150}
        />
      </div>
    </section>
  );
}
