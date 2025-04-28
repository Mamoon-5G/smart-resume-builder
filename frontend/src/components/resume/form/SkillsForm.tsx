
import { useState } from "react";
import { ExperienceItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { suggestSkills } from "@/lib/ai-helpers";

interface SkillsFormProps {
  skills: string[];
  experience: ExperienceItem[];
  updateResumeData: (skills: string[]) => void;
  onBack: () => void;
  onNext: () => void;
}

export function SkillsForm({ skills, experience, updateResumeData, onBack, onNext }: SkillsFormProps) {
  const [skillInput, setSkillInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [aiEnhancing, setAiEnhancing] = useState<boolean>(false);

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      updateResumeData([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };
  
  const removeSkill = (index: number) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    updateResumeData(updatedSkills);
  };
  
  const enhanceWithAI = async () => {
    setAiEnhancing(true);
    
    try {
      // Combine all experience descriptions to suggest relevant skills
      const allExperience = experience.map(exp => exp.description).join(" ");
      const suggestedSkills = await suggestSkills(allExperience);
      setSuggestions(suggestedSkills.filter(skill => !skills.includes(skill)));
    } catch (error) {
      console.error("Error enhancing with AI:", error);
    } finally {
      setAiEnhancing(false);
    }
  };
  
  const addSuggestedSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      updateResumeData([...skills, skill]);
      
      // Remove from suggestions
      setSuggestions(suggestions.filter(s => s !== skill));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={enhanceWithAI}
          disabled={experience.length === 0 || aiEnhancing}
        >
          <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          {aiEnhancing ? "Getting suggestions..." : "Suggest Skills with AI"}
        </Button>
      </div>
      
      {/* AI Suggestions */}
      {suggestions.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center mb-2">
            <svg className="w-5 h-5 text-blue-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3 className="text-sm font-medium text-blue-800">AI Suggested Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((skill, index) => (
              <div
                key={index}
                onClick={() => addSuggestedSkill(skill)}
                className="bg-white text-blue-700 text-sm px-3 py-1 rounded-full border border-blue-300 cursor-pointer hover:bg-blue-600 hover:text-white transition-colors"
              >
                + {skill}
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
            Add Skills
          </label>
          <div className="flex">
            <Input
              id="skills"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Enter a skill (e.g., JavaScript, Project Management)"
              className="rounded-r-none"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
            />
            <Button 
              onClick={addSkill} 
              className="rounded-l-none"
              disabled={!skillInput.trim()}
            >
              Add
            </Button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Your Skills
          </label>
          
          {skills.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No skills added yet</h3>
              <p className="mt-1 text-sm text-gray-500">Start adding skills or use the AI to suggest some.</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <div key={index} className="group bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full flex items-center">
                  {skill}
                  <button
                    onClick={() => removeSkill(index)}
                    className="ml-1 text-gray-500 hover:text-red-600"
                  >
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back: Education
        </Button>
        
        <Button onClick={onNext}>
          Next: Template
          <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
