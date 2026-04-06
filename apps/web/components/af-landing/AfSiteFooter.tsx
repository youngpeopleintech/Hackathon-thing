import Image from 'next/image';
import Link from 'next/link';

export function AfSiteFooter() {
  return (
    <footer>
      <div>
        <Image src="/ypit-logo-white.png" alt="YPIT" height={36} width={90} style={{ objectFit: 'contain', width: 'auto' }} className="footer-logo" />
        <span className="footer-tagline">— Young People In Tech · 2026</span>
      </div>
      <div className="footer-links">
        <Link href="/">Home</Link>
        <a href="#about">About</a>
        <a href="#programme">Event</a>
        <Link href="/register">Register</Link>
        <a href="mailto:hello@youngpeopleintech.com" className="email">
          hello@youngpeopleintech.com
        </a>
      </div>
    </footer>
  );
}
