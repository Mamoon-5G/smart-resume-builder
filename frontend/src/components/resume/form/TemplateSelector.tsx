
import { Button } from "@/components/ui/button";

interface TemplateSelectorProps {
  templateId: string;
  updateResumeData: (templateId: string) => void;
  onBack: () => void;
  onSave: () => void;
}

export function TemplateSelector({ templateId, updateResumeData, onBack, onSave }: TemplateSelectorProps) {
  const templates = ["modern", "classic", "creative", "minimal"];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Choose a Template</h2>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {templates.map((template) => (
          <div 
            key={template}
            onClick={() => updateResumeData(template)}
            className={`cursor-pointer overflow-hidden rounded-lg border-2 transition-all ${
              templateId === template 
                ? "border-blue-600 ring-2 ring-blue-600 ring-opacity-50" 
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="relative pb-[140%]">
              <img
                src={`/templates/${template}.png`}
                alt={`${template} template`}
                className="absolute inset-0 h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://via.placeholder.com/400x560/f3f4f6/4b5563?text=${template.charAt(0).toUpperCase() + template.slice(1)}+Template`;
                }}
              />
              
              <div className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${
                templateId === template ? "opacity-100" : "opacity-0"
              }`}>
                <div className="rounded-full bg-white p-2">
                  <svg className="w-6 h-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 text-center">
              <h3 className="font-medium text-gray-900 capitalize">{template}</h3>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back: Skills
        </Button>
        
        <Button onClick={onSave}>
          <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          Save Resume
        </Button>
      </div>
    </div>
  );
}
