export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

export interface ResumeData {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  location: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  skills: {
    product: string[];
    technical: string[];
    ai: string[];
  };
  experience: Experience[];
  projects: Project[];
  education: {
    school: string;
    degree: string;
    year: string;
  }[];
  volunteer: {
    title: string;
    category: string;
    period: string;
    description: string;
    photos?: string[];
  }[];
}
