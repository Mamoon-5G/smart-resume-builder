
import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { useAuth } from "@/context/AuthContext";
import { ResumeData } from "@/types";
import { dummyResumeData } from "@/lib/dummy-data";
import { Button } from "@/components/ui/button";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";

const ResumePreviewPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  
  useEffect(() => {
    // In a real app, this would fetch the resume data from an API
    // For this demo, we'll use the dummy data
    if (id === "1" || id === "2") {
      // Simulate API call delay
      setTimeout(() => {
        setResumeData({
          ...dummyResumeData,
          id
        });
      }, 300);
    } else {
      navigate("/dashboard");
    }
  }, [id, navigate]);
  
  if (!user) {
    navigate("/login");
    return null;
  }
  
  const handleEdit = () => {
    navigate(`/resume/edit/${id}`);
  };
  
  const handleExportPdf = async () => {
    if (!previewRef.current || !resumeData) return;
    
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
  
  if (!resumeData) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar currentUser={user} />
        
        <main className="flex-grow pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading resume...</p>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentUser={user} />
      
      <main className="flex-grow pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Resume Preview</h1>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleEdit}>
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Resume
            </Button>
            
            <Button 
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
        
        <div className="mx-auto max-w-4xl h-[calc(100vh-200px)] bg-gray-100 p-4 rounded-lg">
          <div className="h-full" ref={previewRef}>
            <ResumePreview data={resumeData} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ResumePreviewPage;
