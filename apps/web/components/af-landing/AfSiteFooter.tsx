import Link from 'next/link';

export function AfSiteFooter() {
  return (
    <footer>
      <div>
        <img src="/ypit-logo-black.png" alt="YPIT" height={36} width={90} style={{ objectFit: 'contain', width: 'auto' }} className="footer-logo" />
        <span className="footer-tagline">— Young People In Tech · 2026</span>
        <p className="footer-org-credit">
          The Artificial Future is an event by{' '}
          <a href="https://www.youngpeopleintech.com" target="_blank" rel="noopener noreferrer">
            Young People In Tech
          </a>
        </p>
      </div>
      <div className="footer-links">
        <Link href="/#hero">Home</Link>
        <Link href="/#about">About</Link>
        <Link href="/#programme">Event</Link>
        <Link href="/teams">Teams</Link>
        <Link href="/#impact">Impact report</Link>
        <a href="mailto:partnerships@youngpeopleintech.com" className="email">
          partnerships@youngpeopleintech.com
        </a>
      </div>
    </footer>
  );
}
