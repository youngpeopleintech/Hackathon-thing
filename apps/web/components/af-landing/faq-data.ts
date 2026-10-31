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
    question: 'Was the event free?',
    answer:
      'The hackathon and the workshops were free. The conference on June 13 required a paid ticket. The build programme stayed free so cost would not be a barrier.',
  },
  {
    id: 'g2',
    category: 'general',
    question: 'Where did it happen?',
    answer:
      'The conference was at The Civic Centre, Lagos Island. The hackathon and workshops ran across Lagos, with remote participation for the build week.',
  },
  {
    id: 'g3',
    category: 'general',
    question: 'Did you need prior experience in AI?',
    answer:
      'No. The programme was built for every level. Workshops were accessible, mentors were in the room, and the tracks were open enough for different skill levels.',
  },
  {
    id: 'h1',
    category: 'hackathon',
    question: 'Did you need a team to take part?',
    answer:
      'No. People registered as individuals. Teams of 2 to 4 formed during the opening session.',
  },
  {
    id: 'h2',
    category: 'hackathon',
    question: 'What did teams build?',
    answer:
      'Projects that used AI inside one of the challenge tracks: Economic Access, Local Language & Culture, Education & Skill Building, or Healthcare Access. Work started during the hackathon week.',
  },
  {
    id: 'h3',
    category: 'hackathon',
    question: 'How were projects judged?',
    answer:
      'Judges looked at innovation, technical execution, real-world impact, and how the work was presented.',
  },
  {
    id: 'h4',
    category: 'hackathon',
    question: 'Could teams keep working after the hackathon?',
    answer:
      'Yes. What a team built belongs to that team. The strongest projects were pointed toward a path forward through the Launchpad.',
  },
  {
    id: 'w1',
    category: 'workshops',
    question: 'Did you have to be in the hackathon to attend workshops?',
    answer:
      'No. Workshops were open to everyone, including people who were not on a hackathon team.',
  },
  {
    id: 'w2',
    category: 'workshops',
    question: 'Will sessions be recorded?',
    answer: 'Some sessions may be shared later. The impact report is the place we will collect what is available.',
  },
  {
    id: 'c1',
    category: 'conference',
    question: 'Did you need to be a hackathon participant to attend the conference?',
    answer: 'No. June 13 was a standalone day for ticket holders.',
  },
  {
    id: 'c2',
    category: 'conference',
    question: 'Will there be networking time?',
    answer:
      'Yes. The conference schedule includes dedicated networking breaks and a closing reception.',
  },
];
