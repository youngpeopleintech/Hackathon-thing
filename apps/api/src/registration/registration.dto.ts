import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ArrayMinSize,
} from "class-validator";

export class CreateRegistrationDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @IsIn([
    "hackathon-participant",
    "conference-attendee",
    "mentor-speaker",
    "volunteer",
    "sponsor-partner",
    "just-exploring",
  ], { each: true })
  interests: string[];

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsIn(["16-20", "21-25", "25+"])
  ageRange: string;

  @IsOptional()
  @IsString()
  @IsIn(["male", "female", "prefer-not-to-say"])
  gender?: string;

  @IsString()
  @IsOptional()
  @IsIn(['in-person', 'virtual', 'undecided'])
  participationType?: string;

  @IsString()
  @IsNotEmpty()
  cityCountry: string;

  // Hackathon-specific fields (optional, only required if hackathon-participant)
  @IsBoolean()
  @IsOptional()
  hasIdea?: boolean;

  @IsString()
  @IsOptional()
  problemStatement?: string;

  @IsString()
  @IsOptional()
  proposedSolution?: string;

  @IsString()
  @IsIn([
    "health-tech",
    "fintech",
    "ai-emerging-tech",
    "edutech",
    "climate-sustainability",
  ])
  @IsOptional()
  hackathonTrack?: string;

  @IsString()
  @IsOptional()
  uniqueImpact?: string;

  // Skills & Background
  @IsString()
  @IsIn([
    "frontend-developer",
    "backend-developer",
    "fullstack-developer",
    "mobile-developer",
    "ai-ml-engineer",
    "data-scientist-analyst",
    "ui-ux-designer",
    "product-manager",
    "devops-cloud",
    "cybersecurity",
    "researcher-academic",
    "business-strategy",
    "other",
  ])
  primarySkill: string;

  @IsString()
  @IsOptional()
  primarySkillOther?: string;

  @IsString()
  @IsIn([
    "curious-beginner",
    "beginner",
    "intermediate",
    "advanced",
    "non-technical",
  ])
  aiSkillLevel: string;

  @IsBoolean()
  @IsOptional()
  hasHackathonExperience?: boolean;

  @IsString()
  @IsOptional()
  toolsTechnologies?: string;

  @IsNumber()
  @Min(1)
  @Max(7)
  @IsOptional()
  teamSize?: number;

  @IsString()
  @IsOptional()
  teamMembers?: string;
}

export class CreateWaitlistDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  name?: string;
}
