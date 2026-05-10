import Image from 'next/image';
import { Reveal } from './Reveal';

interface Partner {
  name: string;
  src: string;
  imgStyle?: React.CSSProperties;
  imgClassName?: string;
}

const PARTNERS: Partner[] = [
  { name: 'Paystack', src: '/images/af/partners/paystack.png' },
  {
    name: 'African Fintech Foundry',
    src: '/images/af/partners/african-fintech-foundry.png',
    imgStyle: { height: '72px', maxWidth: '180px' },
  },
  { name: 'Oracle Academy', src: '/images/af/partners/oracle-academy.png' },
  { name: 'Enyata Community', src: '/images/af/partners/enyata.png' },
  { name: 'TechCabal', src: '/images/af/partners/techcabal.png' },
  { name: 'Cencori', src: '/images/af/partners/cencori.png' },
  { name: 'PyData', src: '/images/af/partners/pydata.png' },
  { name: 'CafeOne', src: '/images/af/partners/cafeone.svg' },
  { name: 'Remostart', src: '/images/af/partners/remostart.svg' },
  {
    name: 'Tonative',
    src: '/images/af/partners/tonative.png',
    imgStyle: { height: '100px', maxWidth: '220px' },
  },
  { name: 'TRI AI', src: '/images/af/partners/tri-ai.png' },
  {
    name: 'iAfrica',
    src: '/images/af/partners/iafrica.png',
    imgStyle: { filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.3))' },
    imgClassName: 'logo-no-blend',
  },
  { name: 'NexoAfrica', src: '/images/af/partners/nexo.png' },
];

export function AfPartners() {
  return (
    <section id="partners" className="section section-cream">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">Partners & Sponsors</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="section-headline">
            The organisations making
            <br />
            The Artificial Future possible.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="section-sub">
            We are grateful to the partners who believe in what we are building. More announcements coming soon.
          </p>
        </Reveal>

        <div className="partner-marquee-wrap">
          <div className="partner-marquee-track">
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <div key={`${p.name}-${i}`} className="partner-marquee-item">
                <Image
                  src={p.src}
                  alt={p.name}
                  width={160}
                  height={80}
                  className={p.imgClassName}
                  style={{
                    objectFit: 'contain',
                    width: 'auto',
                    height: '40px',
                    maxWidth: '140px',
                    ...p.imgStyle,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <Reveal delay={0.25} className="partner-cta">
          <div>
            <h3>Interested in partnering with The Artificial Future?</h3>
            <p>Capital, technology, utility, and people partnerships available.</p>
          </div>
          <a href="mailto:hello@youngpeopleintech.com" className="btn-primary" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
            Get in touch →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
