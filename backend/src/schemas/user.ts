export interface User {
  user_id: string;
  name: string;
  email: string;
  avatar?: string;
  passwd: string;
  isAuthenticated: boolean;
  bio:               string;
  headline:          string;
  location:          string;
  yearsOfExperience: number;
  currentRole:       string;
  profileImageUrl:   string;
  preferredWorkEnv:  string;
  availability:      string;

  createdAt: Date;
  updatedAt?: Date;

  certifications?: Certification[];
  experiences?: Experience[];
  skills?: Skill[];
  languages?: Language[];
  socialLinks?: SocialLink[];
  personalityTraits?: PersonalityTrait[];
};

// ---------------------------
// Hard facts: Education
// ---------------------------
export interface Education {
  id: string;
  userId: string;
  name: string;
  degree?: string;
  classOfCertificate?: string;
  issuingInstitution: string;
  startDate: Date | null;
  endDate: Date | null;
  issueDate: Date | null;
  credentialId?: string | null;
  url?: string | null;
  created_at: Date;
  updated_at: Date | null;

  // Relations
  user?: User;
}

// ---------------------------
// Hard facts: Certifications
// ---------------------------
export interface Certification {
  id: string;
  userId: string;
  name: string;
  issuingOrganization: string;
  issueDate: Date | null;
  expirationDate: Date | null;
  credentialId: string | null;
  url: string | null;
  created_at: Date;
  updated_at: Date | null;

  // Relations
  user?: User;
}

// ---------------------------
// Dynamic experiences (roles)
// ---------------------------
export interface Experience {
  id: string;
  userId: string;
  role: string;
  company: string;
  startDate: Date | null;
  endDate: Date | null;
  current: boolean;
  description: string | null;
  contextTags: string[];
  created_at: Date;
  updated_at: Date | null;

  // Relations
  user?: User;
  experienceStories?: ExperienceStory[];
}

// ---------------------------
// Micro stories (STAR / failure / leadership)
// ---------------------------
export interface ExperienceStory {
  id: string;
  experienceId: string;
  trigger: string;
  storyText: string;
  created_at: Date;
  updated_at: Date | null;

  // Relations
  experience?: Experience;
}

// ---------------------------
// Enriched persona: Skills (with proficiency)
// ---------------------------
export interface Skill {
  id: string;
  userId: string;
  name: string;
  category: string | null;
  proficiency: string | null;
  yearsOfExperience: number | null;
  created_at: Date;
  updated_at: Date | null;

  // Relations
  user?: User;
}

// ---------------------------
// Enriched persona: Languages spoken
// ---------------------------
export interface Language {
  id: string;
  userId: string;
  name: string;
  proficiency: string;
  created_at: Date;
  updated_at: Date | null;

  // Relations
  user?: User;
}

// ---------------------------
// Enriched persona: Social / professional links
// ---------------------------
export interface SocialLink {
  id: string;
  userId: string;
  platform: string;
  url: string;
  created_at: Date;
  updated_at: Date | null;

  // Relations
  user?: User;
}

// ---------------------------
// User Persona / PersonalityTrait
// ---------------------------
export interface PersonalityTrait {
  id: string;
  userId: string;
  voice_tone: string | null;
  negative_constraints: string[];
  attitude: string | null;
  trait: string | null;
  description: string | null;
  source: string | null;
  created_at: Date;
  updated_at: Date | null;

  // Relations
  user?: User;
}
