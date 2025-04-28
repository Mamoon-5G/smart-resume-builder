
import { ResumeData } from "@/types";

interface TemplateProps {
  data: ResumeData;
}

export function MinimalTemplate({ data }: TemplateProps) {
  const { personalInfo, experience, education, skills } = data;
  
  return (
    <div className="bg-white w-full h-full p-8 text-gray-800 text-sm max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1 uppercase tracking-wider">{personalInfo.fullName}</h1>
        <p className="text-gray-600">{personalInfo.title}</p>
        
        <div className="mt-2 flex justify-center space-x-4 text-gray-600 text-sm">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>
      
      <div className="border-t border-gray-200"></div>
      
      {/* Summary */}
      {personalInfo.summary && (
        <div className="my-4">
          <p className="text-gray-700 text-center">{personalInfo.summary}</p>
        </div>
      )}
      
      <div className="border-t border-gray-200"></div>
      
      {/* Experience */}
      {experience.length > 0 && (
        <div className="my-4">
          <h2 className="text-md font-semibold text-gray-900 text-center uppercase tracking-wider mb-4">
            Experience
          </h2>
          
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                  <span className="text-gray-600">
                    {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    {' - '}
                    {exp.isCurrentRole ? 'Present' : exp.endDate && new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
                
                <div className="text-gray-700 mb-1">
                  {exp.company}{exp.location ? `, ${exp.location}` : ''}
                </div>
                
                <p className="text-gray-700">
                  {exp.enhancedDescription || exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="border-t border-gray-200"></div>
      
      {/* Education */}
      {education.length > 0 && (
        <div className="my-4">
          <h2 className="text-md font-semibold text-gray-900 text-center uppercase tracking-wider mb-4">
            Education
          </h2>
          
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-gray-900">{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</h3>
                  <span className="text-gray-600">
                    {edu.startDate && new Date(edu.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    {' - '}
                    {edu.endDate && new Date(edu.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
                
                <div className="text-gray-700 mb-1">{edu.institution}</div>
                
                {edu.description && <p className="text-gray-700">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="border-t border-gray-200"></div>
      
      {/* Skills */}
      {skills.length > 0 && (
        <div className="my-4">
          <h2 className="text-md font-semibold text-gray-900 text-center uppercase tracking-wider mb-4">
            Skills
          </h2>
          
          <div className="text-center">
            <p className="text-gray-700">
              {skills.join(" · ")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
