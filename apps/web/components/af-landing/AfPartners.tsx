import Image from 'next/image';
import { Reveal } from './Reveal';

const PARTNERS = [
  { name: 'Paystack', src: '/images/af/partners/paystack.png' },
  { name: 'African Fintech Foundry', src: '/images/af/partners/african-fintech-foundry.png' },
  { name: 'Oracle Academy', src: '/images/af/partners/oracle-academy.png' },
  { name: 'FiberOne', src: '/images/af/partners/fiberone.jpg' },
  { name: 'Dochase Digital', src: '/images/af/partners/dochase-digital.webp' },
  { name: 'Cencori', src: '/images/af/partners/cencori.png' },
  { name: 'Remostart', src: '/images/af/partners/remostart.png' },
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
                <Image src={p.src} alt={p.name} width={120} height={48} style={{ objectFit: 'contain', width: 'auto', height: 'auto', maxWidth: '120px', maxHeight: '44px' }} />
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
