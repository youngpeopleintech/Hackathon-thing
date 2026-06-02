'use client';

import './ypit-af-landing.css';
import { AfAbout } from './AfAbout';
import { AfAnnouncementBar } from './AfAnnouncementBar';
import { AfConference } from './AfConference';
import { AfFooterCta } from './AfFooterCta';
import { AfFaq } from './AfFaq';
import { AfHero } from './AfHero';
import { AfJoinPaths } from './AfJoinPaths';
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
  return (
    <div className="ypitAfLanding">
      <AfAnnouncementBar />
      <AfNavbar />
      <AfHero />
      <AfMarquee />
      <AfAbout />
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
