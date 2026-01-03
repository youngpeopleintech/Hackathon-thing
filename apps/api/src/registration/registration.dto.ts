import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsBoolean,
  IsNumber,
  IsIn,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

export class CreateRegistrationDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsIn(['16-20', '21-25', '25+'])
  ageRange: string;

  @IsString()
  @IsIn(['male', 'female', 'prefer-not-to-say'])
  gender: string;

  @IsString()
  @IsNotEmpty()
  cityCountry: string;

  @IsString()
  @IsNotEmpty()
  problemStatement: string;

  @IsString()
  @IsNotEmpty()
  proposedSolution: string;

  @IsString()
  @IsIn(['health-tech', 'fintech', 'ai-emerging-tech', 'edutech', 'climate-sustainability'])
  hackathonTrack: string;

  @IsString()
  @IsNotEmpty()
  uniqueImpact: string;

  @IsString()
  @IsIn(['frontend-developer', 'backend-developer', 'mobile-developer', 'ui-ux-designer', 'product-manager', 'data-analyst-ml', 'other'])
  primarySkill: string;

  @IsBoolean()
  hasHackathonExperience: boolean;

  @IsString()
  @IsOptional()
  toolsTechnologies?: string;

  @IsNumber()
  @Min(1)
  @Max(7)
  teamSize: number;

  @IsString()
  @IsOptional()
  teamMembers?: string;
}

