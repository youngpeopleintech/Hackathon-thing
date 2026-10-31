import { NextRequest } from 'next/server';
import { handleBoardGet, handleBoardPost, isOrganiserEmailAllowed } from '../team-board-gate';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';

const organiserConfig = {
  cookieName: 'ypit_team_board_organiser',
  htmlFile: 'team-board-organiser.html',
  title: 'Organiser Team Board',
  description: 'Enter the approved organiser email address to access the internal team board.',
  isEmailAllowed: isOrganiserEmailAllowed,
};

export async function GET(request: NextRequest) {
  return handleBoardGet(request, organiserConfig);
}

export async function POST(request: NextRequest) {
  return handleBoardPost(request, organiserConfig);
}
