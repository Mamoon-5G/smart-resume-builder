
import { ResumeData } from "@/types";
import { ModernTemplate } from "./templates/ModernTemplate";
import { ClassicTemplate } from "./templates/ClassicTemplate";
import { CreativeTemplate } from "./templates/CreativeTemplate";
import { MinimalTemplate } from "./templates/MinimalTemplate";
import { memo } from "react";

interface ResumePreviewProps {
  data: ResumeData;
}

// Using memo to prevent unnecessary re-renders when props haven't changed
export const ResumePreview = memo(function ResumePreview({ data }: ResumePreviewProps) {
  const { templateId } = data;
  
  const renderTemplate = () => {
    switch (templateId) {
      case "modern":
        return <ModernTemplate data={data} />;
      case "classic":
        return <ClassicTemplate data={data} />;
      case "creative":
        return <CreativeTemplate data={data} />;
      case "minimal":
        return <MinimalTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="w-full h-full overflow-auto">
        {renderTemplate()}
      </div>
    </div>
  );
});
