
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ResumeForm } from "@/components/resume/form";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { useAuth } from "@/context/AuthContext";
import { ResumeData } from "@/types";
import { dummyResumeData } from "@/lib/dummy-data";
import { Button } from "@/components/ui/button";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";
import { v4 as uuidv4 } from "uuid";

const ResumeCreationPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState<ResumeData>(dummyResumeData);
  const previewRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  
  if (!user) {
    navigate("/login");
    return null;
  }
  
  const handleSave = (data: ResumeData) => {
    // In a real app, this would save to a backend
    setResumeData(data);
    
    // Simulate saving to backend
    setTimeout(() => {
      navigate("/dashboard");
    }, 500);
  };
  
  // This new function handles real-time updates from the form
  const handleFormUpdate = (data: ResumeData) => {
    setResumeData(data);
  };
  
  const handleExportPdf = async () => {
    if (!previewRef.current) return;
    
    try {
      setIsGeneratingPdf(true);
      
      // Use html-to-image to convert the resume preview to a PNG
      const dataUrl = await toPng(previewRef.current, { 
        quality: 1,
        width: 816, // 8.5 inches * 96 DPI
        height: 1056, // 11 inches * 96 DPI
        style: {
          margin: '0',
          padding: '0'
        }
      });
      
      // Create a filename based on the resume title or a default name
      const filename = `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume_${new Date().toISOString().split('T')[0]}.png`;
      
      // Save the image
      saveAs(dataUrl, filename);
    } catch (error) {
      console.error("Error exporting resume:", error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentUser={user} />
      
      <main className="flex-grow pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Create Your Resume</h1>
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={handleExportPdf}
              disabled={isGeneratingPdf}
            >
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {isGeneratingPdf ? "Exporting..." : "Export as PDF"}
            </Button>
          </div>
        </div>
        
        <div className="lg:flex gap-6">
          {/* Left side: Form */}
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <ResumeForm 
              initialData={resumeData} 
              onSave={handleSave}
              onChange={handleFormUpdate} 
            />
          </div>
          
          {/* Right side: Preview */}
          <div className="lg:w-1/2 lg:sticky lg:top-20 h-[calc(100vh-160px)]">
            <div className="bg-gray-100 p-4 h-full rounded-lg overflow-auto">
              <div className="h-full" ref={previewRef}>
                <ResumePreview data={resumeData} />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ResumeCreationPage;
