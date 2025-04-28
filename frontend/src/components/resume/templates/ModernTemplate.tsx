
import { ResumeData } from "@/types";

interface TemplateProps {
  data: ResumeData;
}

export function ModernTemplate({ data }: TemplateProps) {
  const { personalInfo, experience, education, skills } = data;
  
  return (
    <div className="bg-white w-full h-full p-8 text-gray-800 text-sm">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{personalInfo.fullName}</h1>
        <p className="text-xl text-blue-600 mb-3">{personalInfo.title}</p>
        
        <div className="flex flex-wrap text-gray-600 gap-x-4 gap-y-1">
          {personalInfo.email && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {personalInfo.email}
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {personalInfo.phone}
            </div>
          )}
          
          {personalInfo.location && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {personalInfo.location}
            </div>
          )}
        </div>
      </div>
      
      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-1 mb-3">
            Professional Summary
          </h2>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </div>
      )}
      
      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-1 mb-3">
            Work Experience
          </h2>
          
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-900">{exp.position}</h3>
                  <span className="text-gray-600 text-sm">
                    {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    {' - '}
                    {exp.isCurrentRole ? 'Present' : exp.endDate && new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
                
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">{exp.company}</span>
                  {exp.location && <span className="text-gray-600">{exp.location}</span>}
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
          <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-1 mb-3">
            Education
          </h2>
          
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-900">{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</h3>
                  <span className="text-gray-600 text-sm">
                    {edu.startDate && new Date(edu.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    {' - '}
                    {edu.endDate && new Date(edu.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
                
                <div className="text-gray-700 mb-2">{edu.institution}</div>
                
                {edu.description && <p className="text-gray-700">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-1 mb-3">
            Skills
          </h2>
          
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
