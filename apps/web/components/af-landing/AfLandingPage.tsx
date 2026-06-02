'use client';

import { useEffect, useState } from 'react';
import './ypit-af-landing.css';
import { AfAbout } from './AfAbout';
import { AfAnnouncementBar } from './AfAnnouncementBar';
import { AfConference } from './AfConference';
import { AfFooterCta } from './AfFooterCta';
import { AfFaq } from './AfFaq';
import { AfHero } from './AfHero';
import { AfJoinPaths } from './AfJoinPaths';
import { AfManifestoOverlay } from './AfManifestoOverlay';
import { AfMarquee } from './AfMarquee';
import { AfMentors } from './AfMentors';
import { AfNavbar } from './AfNavbar';
import { AfPartners } from './AfPartners';
import { AfProgramme } from './AfProgramme';
import { AfSchedule } from './AfSchedule';
import { AfSiteFooter } from './AfSiteFooter';
import { AfSpeakers } from './AfSpeakers';
import { AfTracks } from './AfTracks';
import { AfWorkshops } from './AfWorkshops';

export function AfLandingPage() {
  const [isManifestoOpen, setIsManifestoOpen] = useState(false);

  // Open on direct link (e.g. theartificialfuture.com/#manifesto)
  useEffect(() => {
    if (window.location.hash === '#manifesto') setIsManifestoOpen(true);
  }, []);

  // Keep URL in sync with overlay state
  useEffect(() => {
    if (isManifestoOpen) {
      history.pushState(null, '', '#manifesto');
    } else if (window.location.hash === '#manifesto') {
      history.pushState(null, '', window.location.pathname);
    }
  }, [isManifestoOpen]);

  return (
    <div className="ypitAfLanding">
      <AfManifestoOverlay isOpen={isManifestoOpen} onClose={() => setIsManifestoOpen(false)} />
      <AfNavbar />
      <AfHero />
      <AfMarquee />
      <AfAbout onOpenManifesto={() => setIsManifestoOpen(true)} />
      <AfProgramme />
      <AfConference />
      <AfSpeakers />
      <AfTracks />
      <AfSchedule />
      <AfMentors />
      <AfWorkshops />
      <AfJoinPaths />
      <AfFaq />
      <AfPartners />
      <AfFooterCta />
      <AfSiteFooter />
    </div>
  );
}
