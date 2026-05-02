import Image from 'next/image';
import Link from 'next/link';

export function AfSiteFooter() {
  return (
    <footer>
      <div>
        <Image src="/ypit-logo-black.png" alt="YPIT" height={36} width={90} style={{ objectFit: 'contain', width: 'auto' }} className="footer-logo" />
        <span className="footer-tagline">— Young People In Tech · 2026</span>
        <p className="footer-org-credit">
          The Artificial Future is an event by{' '}
          <a href="https://www.youngpeopleintech.com" target="_blank" rel="noopener noreferrer">
            Young People In Tech
          </a>
        </p>
      </div>
      <div className="footer-links">
        <Link href="/">Home</Link>
        <a href="#about">About</a>
        <a href="#programme">Event</a>
        <a href="https://luma.com/1zien2bm" target="_blank" rel="noopener noreferrer">Register</a>
        <a href="mailto:partnerships@youngpeopleintech.com" className="email">
          partnerships@youngpeopleintech.com
        </a>
      </div>
    </footer>
  );
}
