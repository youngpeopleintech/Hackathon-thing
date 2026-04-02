export type FaqCategory = 'general' | 'hackathon' | 'workshops' | 'conference';

export interface FaqItem {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
}

export const FAQ_CATEGORIES: { id: FaqCategory; label: string }[] = [
  { id: 'general', label: 'General' },
  { id: 'hackathon', label: 'Hackathon' },
  { id: 'workshops', label: 'Workshops' },
  { id: 'conference', label: 'Conference' },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'g1',
    category: 'general',
    question: 'Is this event free?',
    answer:
      'The hackathon and all workshops are completely free. The conference on June 13 requires a paid ticket. We keep the programme free because cost should not be a barrier for young people in tech.',
  },
  {
    id: 'g2',
    category: 'general',
    question: 'Where is the event?',
    answer:
      'The conference takes place at The Civic Centre, Lagos Island, Nigeria. The hackathon and workshops will be held across multiple locations in Lagos — full details shared with registered participants ahead of the event.',
  },
  {
    id: 'g3',
    category: 'general',
    question: 'Do I need prior experience in AI?',
    answer:
      'No — just come curious. The programme is designed for participants at all levels. Workshops are accessible, mentors are on hand throughout, and the hackathon tracks are open-ended enough for different skill levels.',
  },
  {
    id: 'h1',
    category: 'hackathon',
    question: 'Do I need a team to register?',
    answer:
      'No. Register as an individual. We will facilitate team formation during the opening session for anyone who wants to find teammates. Teams are between 2 and 4 people.',
  },
  {
    id: 'h2',
    category: 'hackathon',
    question: 'What can I build?',
    answer:
      'Anything that meaningfully uses AI and fits within one of the four challenge tracks: Economic Access, Local Language & Culture, Education & Skill Building, or Healthcare Access. Projects must start during the hackathon week.',
  },
  {
    id: 'h3',
    category: 'hackathon',
    question: 'How are projects judged?',
    answer:
      'A panel of judges will assess projects on innovation, technical execution, real-world impact, and presentation quality. The full judging criteria will be published ahead of the event.',
  },
  {
    id: 'h4',
    category: 'hackathon',
    question: 'Can I keep working on my project after the hackathon?',
    answer:
      'Yes, and we encourage it. What you build is yours. The programme is designed to give the strongest projects a path forward through the Launchpad.',
  },
  {
    id: 'w1',
    category: 'workshops',
    question: 'Do I need to be in the hackathon to attend workshops?',
    answer:
      'No. Workshops are open to everyone. You can register for workshops only if you prefer not to participate in the hackathon. Some workshops are in-person during hackathon weekends.',
  },
  {
    id: 'w2',
    category: 'workshops',
    question: 'Will sessions be recorded?',
    answer: 'We are working on this. We will confirm details ahead of the event.',
  },
  {
    id: 'c1',
    category: 'conference',
    question: 'Do I need to be a hackathon participant to attend?',
    answer: 'No. The conference on June 13 is a standalone event open to all ticket holders.',
  },
  {
    id: 'c2',
    category: 'conference',
    question: 'Will there be networking time?',
    answer:
      'Yes. The conference schedule includes dedicated networking breaks and a closing reception.',
  },
];
