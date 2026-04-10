import { Reveal } from './Reveal';

const TRACKS = [
  {
    num: '01',
    tag: 'Economic & Financial Access',
    title: 'Helping to make money reach more people.',
    body: 'Fintech in Africa is not a solved problem. There are still processes that need to be optimised for scale, people without bank accounts, informal traders outside financial infrastructure, and legacy institutions sitting on data AI could help unlock.',
  },
  {
    num: '02',
    tag: 'Local Language & Culture',
    title: 'AI that actually speaks the way Africans speak.',
    body: 'Most AI tools were not built with Yoruba, Igbo, Hausa, Pidgin, Swahili, or Arabic in mind. Build something genuinely useful to people in their own language.',
  },
  {
    num: '03',
    tag: 'Education & Skill Building',
    title: 'Learning on a continent where access is unequal.',
    body: 'Inconsistent connectivity. Overstretched teachers. Learners who need to work while they study. Build tools designed around real African constraints.',
  },
  {
    num: '04',
    tag: 'Healthcare Access',
    title: 'Healthcare that works around African infrastructure.',
    body: 'Hospitals that cannot always be relied on. Supply chains under pressure. Communities where care does not reach. Build around weak infrastructure — not despite it.',
  },
];

export function AfTracks() {
  return (
    <section id="tracks" className="section section-white">
      <div className="section-inner">
        <div className="tracks-intro">
          <div>
            <Reveal>
              <div className="section-label">Hackathon Tracks</div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="section-headline">
                Problem areas,
                <br />
                not prescriptive
                <br />
                <span style={{ color: 'var(--coral)' }}>briefs.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="section-sub" style={{ alignSelf: 'end', paddingBottom: 8 }}>
            We give you a focus area and trust you to figure out what is possible within it. The experienced engineer can
            build something technically ambitious. The enthusiastic beginner can build something simpler but still
            genuinely useful. Both are valid. Both matter.
          </Reveal>
        </div>
        <div className="tracks-grid">
          {TRACKS.map((t, i) => {
            const variant = i === 0 || i === 3 ? 'track-card--squared' : 'track-card--fluted';
            return (
            <Reveal key={t.num} delay={0.05 * (i + 1)} className={`track-card ${variant}`}>
              <div className="track-bg-num">{t.num}</div>
              <div className="track-tag">{t.tag}</div>
              <h3>{t.title}</h3>
              <p>{t.body}</p>
            </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
