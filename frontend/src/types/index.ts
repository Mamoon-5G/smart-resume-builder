// src/types/index.ts

// User information after login/signup
export interface User {
  id: string;
  name: string;
  email: string;
  photoURL?: string; // Optional field for profile picture
}

// Resume Data structure
export interface ResumeData {
  id?: string;
  userId?: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    title: string;
    summary: string;
  };
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  templateId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Experience item in resume
export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrentRole: boolean;
  description: string;
  enhancedDescription?: string; // Optional enhanced description for better formatting
}

// Education item in resume
export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description: string;
}

// Template for resume generation
export interface Template {
  id: string;
  name: string;
  description: string;
  previewImage: string;
}

// Authentication status of the user
export type AuthStatus = "authenticated" | "unauthenticated" | "loading";
