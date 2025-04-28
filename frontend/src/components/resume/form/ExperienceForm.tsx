
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ExperienceItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { enhanceJobDescription } from "@/lib/ai-helpers";

interface ExperienceFormProps {
  experience: ExperienceItem[];
  updateResumeData: (experience: ExperienceItem[]) => void;
  onBack: () => void;
  onNext: () => void;
}

export const emptyExperienceItem: ExperienceItem = {
  id: "",
  company: "",
  position: "",
  location: "",
  startDate: "",
  endDate: "",
  isCurrentRole: false,
  description: ""
};

export function ExperienceForm({ experience, updateResumeData, onBack, onNext }: ExperienceFormProps) {
  const [aiEnhancing, setAiEnhancing] = useState<boolean>(false);

  const addExperience = () => {
    const newExperience = { ...emptyExperienceItem, id: uuidv4() };
    updateResumeData([...experience, newExperience]);
  };
  
  const updateExperience = (index: number, field: string, value: string | boolean) => {
    const updatedExperience = [...experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value
    };
    
    // If updating the current role, clear end date
    if (field === "isCurrentRole" && value === true) {
      updatedExperience[index].endDate = "";
    }
    
    updateResumeData(updatedExperience);
  };
  
  const removeExperience = (index: number) => {
    const updatedExperience = [...experience];
    updatedExperience.splice(index, 1);
    updateResumeData(updatedExperience);
  };

  const enhanceWithAI = async (index: number) => {
    setAiEnhancing(true);
    
    try {
      const jobDescription = experience[index].description;
      const enhancedDescription = await enhanceJobDescription(jobDescription);
      
      const updatedExperience = [...experience];
      updatedExperience[index] = {
        ...updatedExperience[index],
        enhancedDescription
      };
      
      updateResumeData(updatedExperience);
    } catch (error) {
      console.error("Error enhancing with AI:", error);
    } finally {
      setAiEnhancing(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
      
      {experience.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No work experience added yet</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding your work history.</p>
          <div className="mt-6">
            <Button onClick={addExperience}>
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Work Experience
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {experience.map((exp, index) => (
            <div key={exp.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Position {index + 1}</h3>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => removeExperience(index)} 
                  className="text-red-600 hover:text-red-700"
                >
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(index, "company", e.target.value)}
                    placeholder="Company Name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position
                  </label>
                  <Input
                    value={exp.position}
                    onChange={(e) => updateExperience(index, "position", e.target.value)}
                    placeholder="Job Title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <Input
                    value={exp.location}
                    onChange={(e) => updateExperience(index, "location", e.target.value)}
                    placeholder="City, State"
                  />
                </div>
                
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <Input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <Input
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                      disabled={exp.isCurrentRole}
                    />
                  </div>
                </div>
                
                <div className="sm:col-span-2">
                  <div className="flex items-center space-x-2 mb-4">
                    <Checkbox 
                      id={`current-role-${index}`}
                      checked={exp.isCurrentRole}
                      onCheckedChange={(checked) => 
                        updateExperience(index, "isCurrentRole", checked === true)
                      }
                    />
                    <label
                      htmlFor={`current-role-${index}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I currently work here
                    </label>
                  </div>
                </div>
                
                <div className="sm:col-span-2">
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Job Description
                    </label>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => enhanceWithAI(index)}
                      disabled={!exp.description || aiEnhancing}
                    >
                      {aiEnhancing ? "Enhancing..." : "Enhance with AI"}
                    </Button>
                  </div>
                  <Textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(index, "description", e.target.value)}
                    placeholder="Describe your responsibilities and achievements..."
                    className="min-h-[120px]"
                  />
                  
                  {exp.enhancedDescription && (
                    <div className="mt-3">
                      <div className="flex items-start mb-1">
                        <svg className="w-5 h-5 text-blue-600 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="text-sm font-medium text-blue-600">AI Enhanced Version</span>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-md text-sm text-gray-800 relative">
                        {exp.enhancedDescription}
                        <button 
                          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                          onClick={() => updateExperience(index, "description", exp.enhancedDescription || "")}
                          title="Use this version"
                        >
                          <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          <Button onClick={addExperience} variant="outline" className="w-full">
            <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Another Position
          </Button>
        </div>
      )}
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back: Personal Information
        </Button>
        
        <Button onClick={onNext}>
          Next: Education
          <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
