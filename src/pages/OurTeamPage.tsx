import { Helmet } from 'react-helmet-async';
import SectionHeading from '../components/ui/SectionHeading';
import Card from '../components/ui/Card';
import { team } from '../data/team';
import { bonusAnimals, horses } from '../data/horses.ts';
import ImageCard from '../components/ui/ImageCard.tsx';

export default function OurTeam() {
  return (
    <>
      <Helmet>
        <title>Our Team | Iris + Insight</title>
        <meta
          name="description"
          content="Meet Kelsey and Sareena — two licensed therapists passionate about equine-assisted services."
        />
        <link rel="canonical" href="https://irisandinsight.com/about" />
      </Helmet>

      <section className="bg-brand-bg py-16 px-6">
        <div className="mx-auto max-w-[1200px]">
          <SectionHeading
            eyebrow="Our Team"
            title="About Us"
            subtitle="Two licensed therapists, one shared passion."
          />

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {team.map((member) => (
              <Card key={member.name}>
                <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-6">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="h-36 w-36 shrink-0 rounded-full object-cover border-2 border-brand-gray-light"
                    width={144}
                    height={144}
                    loading="lazy"
                    style={
                      member.imagePosition ? { objectPosition: member.imagePosition } : undefined
                    }
                  />
                  <div>
                    <h3 className="font-display text-xl font-medium text-brand-charcoal">
                      {member.name}
                    </h3>
                    <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal mt-1">
                      {member.role}
                    </p>
                    <div
                      className={`font-body text-sm leading-relaxed mt-3 ${member.placeholder ? 'italic text-brand-gray' : 'text-brand-charcoal-muted'}`}
                    >
                      {member.bio.split('\n\n').map((para, i) => (
                        <p key={i} className={i > 0 ? 'mt-3' : ''}>
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {meetTheHorsesPage()}
    </>
  );
}

function meetTheHorsesPage() {
  return (
    <>
      <section className="bg-brand-bg py-16 px-6">
        <div className="mx-auto max-w-[1200px]">
          <SectionHeading
            eyebrow="Our Herd"
            title="Meet the Horses"
            subtitle="The intuitive partners who make the work possible."
          />

          {/* Intro */}
          <Card className="mt-12">
            <p className="font-body text-base leading-relaxed text-brand-charcoal-muted">
              The horses at Iris + Insight are more than animals — they are intuitive partners in
              the therapeutic process. Their sensitivity, honesty, and calm presence help create
              powerful moments of connection, self-awareness, and personal growth. Each horse in our
              herd brings a unique spirit and plays an important role in supporting connection,
              healing, and growth.
            </p>
          </Card>

          {/* Horse profile cards */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {horses.map((horse) => (
              <ImageCard
                key={horse.name}
                imageSrc={horse.photo}
                imageAlt={`${horse.name}${horse.fullName ? ` (${horse.fullName})` : ''} — therapy horse at Iris + Insight`}
                imagePosition={horse.imagePosition}
                title={horse.name}
                subtitle={horse.fullName}
                description={horse.description || undefined}
              />
            ))}
          </div>

          {/* Bonus animals */}
          <div className="mt-14">
            <h3 className="font-display text-2xl font-medium text-brand-charcoal text-center mb-6">
              Friends of the Herd
            </h3>
            <div className="flex justify-center">
              {bonusAnimals.map((animal) => (
                <div key={animal.name} className="w-full max-w-sm">
                  <ImageCard
                    imageSrc={animal.photo}
                    imageAlt={`${animal.name} at Iris + Insight`}
                    imagePosition={animal.imagePosition}
                    title={animal.name}
                    description={animal.description || undefined}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
