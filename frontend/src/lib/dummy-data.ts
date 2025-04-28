
import { ResumeData, ExperienceItem, EducationItem } from "@/types";
import { v4 as uuidv4 } from "uuid";

export const dummyExperience: ExperienceItem[] = [
  {
    id: uuidv4(),
    company: "Tech Solutions Inc.",
    position: "Senior Developer",
    location: "San Francisco, CA",
    startDate: "2020-03",
    endDate: "",
    isCurrentRole: true,
    description: "Led development team in creating web applications for clients.",
    enhancedDescription: "Led a cross-functional development team of 8 engineers, architecting and deploying enterprise-grade web applications that increased client operational efficiency by 35%."
  },
  {
    id: uuidv4(),
    company: "Digital Innovations",
    position: "Web Developer",
    location: "Boston, MA",
    startDate: "2018-01",
    endDate: "2020-02",
    isCurrentRole: false,
    description: "Worked on frontend development using React.",
    enhancedDescription: "Engineered responsive front-end interfaces using React.js and Redux, resulting in a 28% improvement in user engagement metrics and a 15% reduction in bounce rates across company platforms."
  }
];

export const dummyEducation: EducationItem[] = [
  {
    id: uuidv4(),
    institution: "University of Technology",
    degree: "Master of Science",
    fieldOfStudy: "Computer Science",
    startDate: "2016-09",
    endDate: "2018-05",
    description: "Specialized in Artificial Intelligence and Machine Learning"
  },
  {
    id: uuidv4(),
    institution: "State University",
    degree: "Bachelor of Science",
    fieldOfStudy: "Software Engineering",
    startDate: "2012-09",
    endDate: "2016-05",
    description: "Graduated with honors, GPA 3.8/4.0"
  }
];

export const dummyResumeData: ResumeData = {
  personalInfo: {
    fullName: "John Smith",
    email: "john.smith@example.com",
    phone: "555-123-4567",
    location: "San Francisco, CA",
    title: "Senior Full Stack Developer",
    summary: "Experienced developer with over 5 years of experience in building web applications."
  },
  experience: dummyExperience,
  education: dummyEducation,
  skills: ["JavaScript", "React", "Node.js", "TypeScript", "GraphQL", "AWS", "Docker", "CI/CD", "Agile Methodologies"],
  templateId: "modern"
};
