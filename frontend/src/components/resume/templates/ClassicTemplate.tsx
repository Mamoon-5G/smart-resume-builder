
import { ResumeData } from "@/types";

interface TemplateProps {
  data: ResumeData;
}

export function ClassicTemplate({ data }: TemplateProps) {
  const { personalInfo, experience, education, skills } = data;
  
  return (
    <div className="bg-white w-full h-full p-8 text-gray-800 text-sm flex flex-col">
      {/* Header */}
      <div className="text-center mb-6 pb-4 border-b-2 border-gray-300">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{personalInfo.fullName}</h1>
        <p className="text-lg text-gray-600 mb-3">{personalInfo.title}</p>
        
        <div className="flex flex-wrap justify-center text-gray-700 gap-4">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
        </div>
      </div>
      
      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase">
            Summary
          </h2>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </div>
      )}
      
      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase">
            Experience
          </h2>
          
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-900">{exp.position}</h3>
                  <span className="text-gray-700 italic">
                    {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    {' - '}
                    {exp.isCurrentRole ? 'Present' : exp.endDate && new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
                
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-800">{exp.company}</span>
                  {exp.location && <span className="text-gray-700">{exp.location}</span>}
                </div>
                
                <p className="text-gray-700">
                  {exp.enhancedDescription || exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase">
            Education
          </h2>
          
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-900">{edu.institution}</h3>
                  <span className="text-gray-700 italic">
                    {edu.startDate && new Date(edu.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    {' - '}
                    {edu.endDate && new Date(edu.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
                
                <div className="font-semibold text-gray-800 mb-2">
                  {edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}
                </div>
                
                {edu.description && <p className="text-gray-700">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase">
            Skills
          </h2>
          
          <p className="text-gray-700">
            {skills.join(" • ")}
          </p>
        </div>
      )}
    </div>
  );
}
