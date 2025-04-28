
import { useState } from "react";
import { ResumeData } from "@/types";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { ExperienceForm } from "./ExperienceForm";
import { EducationForm } from "./EducationForm";
import { SkillsForm } from "./SkillsForm";
import { TemplateSelector } from "./TemplateSelector";
import { Button } from "@/components/ui/button";

interface ResumeFormProps {
  initialData?: ResumeData;
  onSave: (data: ResumeData) => void;
  onChange?: (data: ResumeData) => void;
}

export const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    title: "",
    summary: ""
  },
  experience: [],
  education: [],
  skills: [],
  templateId: "modern"
};

export function ResumeForm({ initialData = defaultResumeData, onSave, onChange }: ResumeFormProps) {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [activeSection, setActiveSection] = useState<string>("personal");

  // Helper function to update resumeData and trigger onChange if provided
  const updateResumeData = (newData: ResumeData) => {
    setResumeData(newData);
    // Send real-time updates to parent component if onChange is provided
    if (onChange) {
      onChange(newData);
    }
  };

  const saveResume = () => {
    onSave(resumeData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Navigation */}
      <div className="flex overflow-x-auto mb-6 border-b">
        <button
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
            activeSection === "personal"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveSection("personal")}
        >
          Personal Information
        </button>
        
        <button
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
            activeSection === "experience"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveSection("experience")}
        >
          Work Experience
        </button>
        
        <button
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
            activeSection === "education"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveSection("education")}
        >
          Education
        </button>
        
        <button
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
            activeSection === "skills"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveSection("skills")}
        >
          Skills
        </button>
        
        <button
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
            activeSection === "template"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveSection("template")}
        >
          Template
        </button>
      </div>

      {/* Form Sections */}
      {activeSection === "personal" && (
        <PersonalInfoForm
          personalInfo={resumeData.personalInfo}
          updateResumeData={(personalInfo) => updateResumeData({ ...resumeData, personalInfo })}
          onNext={() => setActiveSection("experience")}
        />
      )}

      {activeSection === "experience" && (
        <ExperienceForm
          experience={resumeData.experience}
          updateResumeData={(experience) => updateResumeData({ ...resumeData, experience })}
          onBack={() => setActiveSection("personal")}
          onNext={() => setActiveSection("education")}
        />
      )}

      {activeSection === "education" && (
        <EducationForm
          education={resumeData.education}
          updateResumeData={(education) => updateResumeData({ ...resumeData, education })}
          onBack={() => setActiveSection("experience")}
          onNext={() => setActiveSection("skills")}
        />
      )}

      {activeSection === "skills" && (
        <SkillsForm
          skills={resumeData.skills}
          experience={resumeData.experience}
          updateResumeData={(skills) => updateResumeData({ ...resumeData, skills })}
          onBack={() => setActiveSection("education")}
          onNext={() => setActiveSection("template")}
        />
      )}

      {activeSection === "template" && (
        <TemplateSelector
          templateId={resumeData.templateId}
          updateResumeData={(templateId) => updateResumeData({ ...resumeData, templateId })}
          onBack={() => setActiveSection("skills")}
          onSave={saveResume}
        />
      )}
    </div>
  );
}
