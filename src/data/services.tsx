import * as React from 'react';

export interface Service {
  icon: string;
  name: string;
  description: string;
  extraDescription: React.JSX.Element;
  workshops?: Workshop[];
  footer: string;
}

export interface Workshop {
  // The name that will be shown for the workshop.
  name: string;
  // The date that will be shown for the workshop.
  // Does not have to be a "literal" date, any string works.
  date: string;
  dateNotes?: string;
  // Must point to an image in the public folder in the form /assets/path/to/image.jpg
  image: string;
  // The date the workshop should no longer shop up on the website.
  // Include the time and timezone (E.G. 2026-07-17T00:00:00-05:00)
  cutoff: Date;
  // The url to the signup for the workshop.
  signupUrl?: string;
  // If the workshop should be shown.
  shouldShow: (cutoffDate: Date) => boolean;
}

function shouldShow(cutOffDate: Date): boolean {
  return new Date() < cutOffDate;
}

export const services: Service[] = [
  {
    icon: '🐴',
    name: 'EAL Sessions',
    description: 'Experiential learning with horses',
    extraDescription: (
      <div>
        <p>
          These are flexible learning opportunities, and we are happy to work with you to set up
          something that works for you. They can help work toward a goal, improve insight, or
          strengthen connections.
        </p>
        <p>
          Examples <i>could</i> be:
        </p>
        <ul style={{ listStyle: 'disc' }}>
          <li>
            An individual wanting to improve body awareness, social-emotional awareness, or life
            skills.
          </li>
          <li>
            A family or other relationship wanting to gain insight into patterns, improve
            communication, or improve connection.
          </li>
          <li>
            A group of friends wanting to explore boundaries, trust, and communication with people
            they know and are comfortable with.
          </li>
          <li>
            A parent and child looking for a fun and different experience to make memories and
            foster their relationship.
          </li>
          <li>A group of parents wanting to have a space to focus on themselves and just “be.”</li>
        </ul>
        <p>Cost:</p>
        <p>Individual sessions (60 minutes): $150</p>
        <p>Individual sessions (90 minutes): $175</p>
        <p>Couple/Family sessions (60 minutes): $175</p>
        <p>Couple/Family sessions (90 minutes): $200</p>
        <p>
          *If you have a group you would like to do this with, we are happy to provide a group
          discount.
        </p>
      </div>
    ),
    footer: 'Contact us directly to ask about availability, scheduling, and pricing.',
  },
  {
    icon: '💬',
    name: 'EAP Sessions',
    description: 'Equine-assisted psychotherapy',
    extraDescription: (
      <div>
        <p>Ongoing therapy sessions utilizing the benefits of horses.</p>
        <p>Cost:</p>
        <p>Initial session: $250</p>
        <p>Individual sessions (60 minutes): $200</p>
        <p>Individual sessions (90 minutes): $225</p>
        <p>Couple/Family sessions (60 minutes): $225</p>
        <p>Couple/Family sessions (90 minutes): $250</p>
      </div>
    ),
    footer: 'Contact us directly to ask about availability and scheduling.',
  },
  {
    icon: '🏢',
    name: 'Corporate Partnerships',
    description: 'Team building & leadership development',
    extraDescription: (
      <div>
        <p>
          Looking for team building? A leadership retreat? A different and fun event? Contact us
          today!
        </p>
      </div>
    ),
    footer: 'Contact us directly to ask about availability, scheduling, and pricing.',
  },
  {
    icon: '🎓',
    name: 'Workshops',
    description: 'Group learning experiences',
    extraDescription: (
      <div>
        <p>
          A group setting with different themes. Keep an eye on our social media or website for
          different opportunities.
        </p>
        <p>
          *We can also create workshops for special groups. Contact us if you have a group you would
          like to do this with for a discounted rate.
        </p>
      </div>
    ),
    workshops: [
      {
        name: 'Equine-Assisted Learning & Therapy Workshop for Mental Health Professionals and Students',
        date: 'October 9, 2026 4PM to 6PM',
        // Must point to an image in the public folder in the form /assets/path/to/image.jpg
        // Be warned, a slash (/) in the file name is converted to a colon (:).
        image: '/assets/images/workshops/10-9-26-ProfessionalAndStudent.png',
        // cutoff must be in the format of yyyy-mm-ddThh:mm:ss-hh:hh
        cutoff: new Date('2026-10-01T00:00:00-05:00'),
        signupUrl:
          'https://docs.google.com/forms/d/e/1FAIpQLSexGjv1HJSG5GziIynwDSdfdQZyUlZ2f7i4iMGclmFPF0Jgcg/viewform',
        shouldShow,
      },
      {
        name: "You're Invited to Our Open House!",
        date: 'October 9, 2026 6:30PM to 8PM',
        // Must point to an image in the public folder in the form /assets/path/to/image.jpg
        // Be warned, a slash (/) in the file name is converted to a colon (:).
        image: '/assets/images/workshops/10-9-26-OpenHouse.png',
        // cutoff must be in the format of yyyy-mm-ddThh:mm:ss-hh:hh
        cutoff: new Date('2026-10-09T00:00:00-05:00'),
        shouldShow,
      },
      {
        name: 'Stronger Together: Building Connection Through Horses',
        date: 'October 15, 2026 6PM to 7:30PM',
        dateNotes: '**Price per couple**',
        // Must point to an image in the public folder in the form /assets/path/to/image.jpg
        // Be warned, a slash (/) in the file name is converted to a colon (:).
        image: '/assets/images/workshops/10-15-26-Couples.png',
        // cutoff must be in the format of yyyy-mm-ddThh:mm:ss-hh:hh
        cutoff: new Date('2026-10-08T00:00:00-05:00'),
        signupUrl:
          'https://docs.google.com/forms/d/e/1FAIpQLSdO4rS9j0EGk1i1w8Oea5zMGruuK6cKhSc5BcYDeQJ3EmR8HA/viewform',
        shouldShow,
      },
      {
        name: "The Seasons Within Women's Workshop",
        date: 'October 16, 2026 3PM to 4:30PM',
        // Must point to an image in the public folder in the form /assets/path/to/image.jpg
        // Be warned, a slash (/) in the file name is converted to a colon (:).
        image: '/assets/images/workshops/10-16-26-TheSeasonsWomensWorkshop.png',
        // cutoff must be in the format of yyyy-mm-ddThh:mm:ss-hh:hh
        cutoff: new Date('2026-10-09T00:00:00-05:00'),
        signupUrl:
          'https://docs.google.com/forms/d/e/1FAIpQLSd-sCQOkF89OxXZBQAnWyiXzY4Eie2gIenQAFjn46JdWr1WmA/viewform',
        shouldShow,
      },
    ],
    footer: 'Contact us directly to ask about availability, scheduling, and pricing.',
  },
];

export const clientTags: string[] = [
  'Adolescents',
  'Adults',
  'Couples',
  'Families',
  'Businesses',
  'LGBTQ+',
  'Corporate Teams',
];
