
import { v4 as uuidv4 } from "uuid";
import { EducationItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EducationFormProps {
  education: EducationItem[];
  updateResumeData: (education: EducationItem[]) => void;
  onBack: () => void;
  onNext: () => void;
}

export const emptyEducationItem: EducationItem = {
  id: "",
  institution: "",
  degree: "",
  fieldOfStudy: "",
  startDate: "",
  endDate: "",
  description: ""
};

export function EducationForm({ education, updateResumeData, onBack, onNext }: EducationFormProps) {
  const addEducation = () => {
    const newEducation = { ...emptyEducationItem, id: uuidv4() };
    updateResumeData([...education, newEducation]);
  };
  
  const updateEducation = (index: number, field: string, value: string) => {
    const updatedEducation = [...education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };
    updateResumeData(updatedEducation);
  };
  
  const removeEducation = (index: number) => {
    const updatedEducation = [...education];
    updatedEducation.splice(index, 1);
    updateResumeData(updatedEducation);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Education</h2>
      
      {education.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No education added yet</h3>
          <p className="mt-1 text-sm text-gray-500">Add your educational background.</p>
          <div className="mt-6">
            <Button onClick={addEducation}>
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Education
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {education.map((edu, index) => (
            <div key={edu.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Education {index + 1}</h3>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => removeEducation(index)} 
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
                    Institution
                  </label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => updateEducation(index, "institution", e.target.value)}
                    placeholder="University or School Name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Degree
                  </label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(index, "degree", e.target.value)}
                    placeholder="Bachelor of Science, High School Diploma, etc."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Field of Study
                  </label>
                  <Input
                    value={edu.fieldOfStudy}
                    onChange={(e) => updateEducation(index, "fieldOfStudy", e.target.value)}
                    placeholder="Computer Science, Business, etc."
                  />
                </div>
                
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <Input
                      type="month"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(index, "startDate", e.target.value)}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <Input
                      type="month"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(index, "endDate", e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <Textarea
                    value={edu.description}
                    onChange={(e) => updateEducation(index, "description", e.target.value)}
                    placeholder="Special achievements, GPA, relevant coursework, etc."
                    className="min-h-[120px]"
                  />
                </div>
              </div>
            </div>
          ))}
          
          <Button onClick={addEducation} variant="outline" className="w-full">
            <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Another Education
          </Button>
        </div>
      )}
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back: Work Experience
        </Button>
        
        <Button onClick={onNext}>
          Next: Skills
          <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
