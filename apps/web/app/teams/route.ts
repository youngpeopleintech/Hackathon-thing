import { NextRequest } from 'next/server';
import { handleBoardGet, handleBoardPost, isParticipantEmailAllowed } from './team-board-gate';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';

const participantConfig = {
  cookieName: 'ypit_team_board_participant',
  htmlFile: 'team-board.html',
  title: 'Hackathon Team Board',
  description: 'Enter the email address you registered with to access your team board.',
  isEmailAllowed: isParticipantEmailAllowed,
};

export async function GET(request: NextRequest) {
  return handleBoardGet(request, participantConfig);
}

export async function POST(request: NextRequest) {
  return handleBoardPost(request, participantConfig);
}
