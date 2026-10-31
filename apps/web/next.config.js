/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    '/teams/organiser': ['./data/team-board-organiser.html', './data/team-board-organiser.json'],
  },
};

module.exports = nextConfig;
