import type { Metadata } from 'next';
import { AfNavbar } from '@/components/af-landing/AfNavbar';
import { AfSiteFooter } from '@/components/af-landing/AfSiteFooter';
import '@/components/af-landing/ypit-af-landing.css';
import { TeamsBrowser } from './TeamsBrowser';
import './teams.css';

export const metadata: Metadata = {
  title: 'What teams built — The Artificial Future',
  description:
    'A public record of what hackathon teams shipped at The Artificial Future, Lagos, May 30 – June 6, 2026.',
};

export default function TeamsPage() {
  return (
    <div className="ypitAfLanding">
      <AfNavbar />
      <main className="teams-page">
        <TeamsBrowser />
      </main>
      <AfSiteFooter />
    </div>
  );
}
