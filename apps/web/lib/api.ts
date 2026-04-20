import type { RegistrationData, RegistrationResponse } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dev-api.theartificialfuture.com/api';

export async function submitRegistration(data: RegistrationData): Promise<RegistrationResponse> {
  const response = await fetch(`${API_URL}/registration`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Registration failed. Please try again.');
  }

  return response.json();
}

export async function getRegistrationStats(): Promise<{ total: number; byTrack: Record<string, number> }> {
  const response = await fetch(`${API_URL}/registration/stats`);

  if (!response.ok) {
    throw new Error('Failed to fetch registration stats');
  }

  return response.json();
}

export async function submitWaitlist(email: string, name?: string): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${API_URL}/registration/waitlist`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, name }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to join waitlist. Please try again.');
  }

  return response.json();
}
