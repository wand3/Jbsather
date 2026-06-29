import type { Certification, Experience, Language, Skill, Education, SocialLink } from "../../schemas/user.js"; 

// export interface ResumeSection {
//     id: string;
//     type: 'personal' | 'summary' | 'experience' | 'educations' | 'skills' | 'certifications' | 'custom';
//     title: string;
//     data?: any; // Type varies by section
// }

export interface ResumeContent {
    userId: string;
    title: string;
    personalInfo: {
        fullName: string;
        email: string;
        phone?: string;
        location?: string;
        website?: string;
    };
    summary?: string;
    // sections?: ResumeSection[];
    
}

export interface Resume {
    id: string;
    userId: string;
    title: string;
    templateId?: string;
    themeColor?: string;
    // content: ResumeContent;
    createdAt: string;
    updatedAt: string;
}

export interface Application {
    id: string;
    userId: string;
    company: string;
    position: string;
    status: 'applied' | 'interviewing' | 'offered' | 'rejected';
    url: string | null;
    notes: string | null;
    dateApplied: string;
}