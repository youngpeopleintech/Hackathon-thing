import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { HACKATHON_TRACK_LABELS } from "@ypit/shared";
import { EmailService } from "../email/email.service";
import { SupabaseService } from "../supabase/supabase.service";
import { CreateRegistrationDto } from "./registration.dto";

interface RegistrationRecord {
  id: string;
  full_name: string;
  email: string;
  age_range: string;
  gender: string;
  city_country: string;
  problem_statement: string;
  proposed_solution: string;
  hackathon_track: string;
  unique_impact: string;
  primary_skill: string;
  has_hackathon_experience: boolean;
  tools_technologies: string | null;
  team_size: number;
  team_members: string | null;
  created_at: string;
  confirmation_sent: boolean;
}

@Injectable()
export class RegistrationService {
  constructor(
    private supabaseService: SupabaseService,
    private emailService: EmailService,
  ) {}

  async createRegistration(
    dto: CreateRegistrationDto,
  ): Promise<{ success: boolean; message: string; registrationId: string }> {
    const supabase = this.supabaseService.getClient();

    // Check if email already exists
    const { data: existingUser } = await supabase
      .from("registrations")
      .select("id")
      .eq("email", dto.email)
      .single();

    if (existingUser) {
      throw new ConflictException(
        "This email address is already registered for the hackathon.",
      );
    }

    // Insert new registration
    const { data, error } = await supabase
      .from("registrations")
      .insert({
        full_name: dto.fullName,
        email: dto.email,
        age_range: dto.ageRange,
        gender: dto.gender,
        city_country: dto.cityCountry,
        problem_statement: dto.problemStatement,
        proposed_solution: dto.proposedSolution,
        hackathon_track: dto.hackathonTrack,
        unique_impact: dto.uniqueImpact,
        primary_skill: dto.primarySkill,
        has_hackathon_experience: dto.hasHackathonExperience,
        tools_technologies: dto.toolsTechnologies || null,
        team_size: dto.teamSize,
        team_members: dto.teamMembers || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      throw new InternalServerErrorException(
        "Failed to create registration. Please try again.",
      );
    }

    const registration = data as RegistrationRecord;

    // Send confirmation email
    const trackLabel =
      HACKATHON_TRACK_LABELS[
        dto.hackathonTrack as keyof typeof HACKATHON_TRACK_LABELS
      ] || dto.hackathonTrack;

    const emailSent = await this.emailService.sendConfirmationEmail({
      to: dto.email,
      name: dto.fullName,
      registrationId: registration.id,
      hackathonTrack: trackLabel,
      teamSize: dto.teamSize,
    });

    // Update confirmation status
    if (emailSent) {
      await supabase
        .from("registrations")
        .update({ confirmation_sent: true })
        .eq("id", registration.id);
    }

    return {
      success: true,
      message: "Registration successful! Check your email for confirmation.",
      registrationId: registration.id,
    };
  }

  async getRegistrationStats(): Promise<{
    total: number;
    byTrack: Record<string, number>;
  }> {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from("registrations")
      .select("hackathon_track");

    if (error) {
      throw new InternalServerErrorException(
        "Failed to fetch registration stats.",
      );
    }

    const stats = {
      total: data?.length || 0,
      byTrack: {} as Record<string, number>,
    };

    data?.forEach((reg: { hackathon_track: string }) => {
      const track = reg.hackathon_track;
      stats.byTrack[track] = (stats.byTrack[track] || 0) + 1;
    });

    return stats;
  }
}
