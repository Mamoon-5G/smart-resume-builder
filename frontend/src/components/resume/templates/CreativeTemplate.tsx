
import { ResumeData } from "@/types";

interface TemplateProps {
  data: ResumeData;
}

export function CreativeTemplate({ data }: TemplateProps) {
  const { personalInfo, experience, education, skills } = data;
  
  return (
    <div className="bg-white w-full h-full flex text-gray-800 text-sm">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-blue-600 text-white p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">{personalInfo.fullName}</h1>
          <p className="text-blue-200">{personalInfo.title}</p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3 border-b border-blue-500 pb-1">Contact</h2>
          <div className="space-y-2">
            {personalInfo.email && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">{personalInfo.email}</span>
              </div>
            )}
            
            {personalInfo.phone && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm">{personalInfo.phone}</span>
              </div>
            )}
            
            {personalInfo.location && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm">{personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3 border-b border-blue-500 pb-1">Skills</h2>
            <div className="space-y-2">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-300 mr-2"></div>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-3 border-b border-blue-500 pb-1">Education</h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <h3 className="font-medium">{edu.institution}</h3>
                  <p className="text-blue-200 text-sm mb-1">{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</p>
                  <p className="text-sm text-blue-200">
                    {edu.startDate && new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric' })}
                    {' - '}
                    {edu.endDate && new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric' })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Main Content */}
      <div className="w-2/3 p-8">
        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-blue-600 mb-3 pb-1 border-b-2 border-blue-600">Profile</h2>
            <p className="text-gray-700">{personalInfo.summary}</p>
          </div>
        )}
        
        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-3 pb-1 border-b-2 border-blue-600">Experience</h2>
            
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-blue-200">
                  <div className="absolute w-3 h-3 bg-blue-600 rounded-full left-[-0.375rem] top-1.5"></div>
                  <h3 className="font-bold text-gray-900">{exp.position}</h3>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-blue-600">{exp.company}</span>
                    <span className="text-gray-600 text-sm">
                      {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      {' - '}
                      {exp.isCurrentRole ? 'Present' : exp.endDate && new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-2">
                    {exp.enhancedDescription || exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
