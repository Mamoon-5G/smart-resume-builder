
import { useState } from "react";
import { ResumeData } from "@/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { enhanceSummary } from "@/lib/ai-helpers";

interface PersonalInfoFormProps {
  personalInfo: ResumeData['personalInfo'];
  updateResumeData: (personalInfo: ResumeData['personalInfo']) => void;
  onNext: () => void;
}

export function PersonalInfoForm({ personalInfo, updateResumeData, onNext }: PersonalInfoFormProps) {
  const [aiEnhancing, setAiEnhancing] = useState<boolean>(false);

  const updatePersonalInfo = (field: string, value: string) => {
    updateResumeData({
      ...personalInfo,
      [field]: value
    });
  };

  const enhanceWithAI = async () => {
    setAiEnhancing(true);
    
    try {
      const enhancedSummary = await enhanceSummary(personalInfo.summary);
      updatePersonalInfo("summary", enhancedSummary);
    } catch (error) {
      console.error("Error enhancing with AI:", error);
    } finally {
      setAiEnhancing(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <Input
            id="fullName"
            value={personalInfo.fullName}
            onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
            placeholder="John Smith"
          />
        </div>
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Professional Title
          </label>
          <Input
            id="title"
            value={personalInfo.title}
            onChange={(e) => updatePersonalInfo("title", e.target.value)}
            placeholder="Senior Software Developer"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={personalInfo.email}
            onChange={(e) => updatePersonalInfo("email", e.target.value)}
            placeholder="john.smith@example.com"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <Input
            id="phone"
            value={personalInfo.phone}
            onChange={(e) => updatePersonalInfo("phone", e.target.value)}
            placeholder="555-123-4567"
          />
        </div>
        
        <div className="sm:col-span-2">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <Input
            id="location"
            value={personalInfo.location}
            onChange={(e) => updatePersonalInfo("location", e.target.value)}
            placeholder="San Francisco, CA"
          />
        </div>
        
        <div className="sm:col-span-2">
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
              Professional Summary
            </label>
            <Button 
              size="sm" 
              variant="outline"
              onClick={enhanceWithAI}
              disabled={!personalInfo.summary || aiEnhancing}
            >
              {aiEnhancing ? "Enhancing..." : "Enhance with AI"}
            </Button>
          </div>
          <Textarea
            id="summary"
            value={personalInfo.summary}
            onChange={(e) => updatePersonalInfo("summary", e.target.value)}
            placeholder="Briefly describe your professional background and key strengths..."
            className="min-h-[120px]"
          />
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button onClick={onNext}>
          Next: Work Experience
          <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
