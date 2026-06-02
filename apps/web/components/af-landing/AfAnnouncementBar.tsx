'use client';

const TEXT = 'Conference tickets now available · June 13 · The Civic Centre';
const REPEATS = 8;

export function AfAnnouncementBar() {
  return (
    <a
      href="https://eventornigeria.com/explore/ypit-af"
      target="_blank"
      rel="noopener noreferrer"
      className="announcement-bar"
    >
      <div className="announcement-track">
        {Array.from({ length: REPEATS }).map((_, i) => (
          <span key={i} className="announcement-item">
            {TEXT}
            <span className="announcement-sep" aria-hidden>→</span>
          </span>
        ))}
      </div>
    </a>
  );
}
