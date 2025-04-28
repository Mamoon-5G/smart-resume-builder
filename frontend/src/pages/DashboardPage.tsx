
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import { ResumeData } from "@/types";

// Mock resume data for demonstration
const mockResumes: ResumeData[] = [
  {
    id: "1",
    personalInfo: {
      fullName: "John Smith",
      email: "john.smith@example.com",
      phone: "555-123-4567",
      location: "San Francisco, CA",
      title: "Senior Full Stack Developer",
      summary: "Experienced developer with over 5 years of experience in building web applications."
    },
    experience: [],
    education: [],
    skills: ["JavaScript", "React", "Node.js"],
    templateId: "modern",
    createdAt: new Date("2023-05-15"),
    updatedAt: new Date("2023-05-15")
  },
  {
    id: "2",
    personalInfo: {
      fullName: "John Smith",
      email: "john.smith@example.com",
      phone: "555-123-4567",
      location: "San Francisco, CA",
      title: "UX Designer",
      summary: "Creative designer focused on user experience and interface design."
    },
    experience: [],
    education: [],
    skills: ["UI/UX", "Figma", "Adobe XD"],
    templateId: "creative",
    createdAt: new Date("2023-06-22"),
    updatedAt: new Date("2023-06-22")
  }
];

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  
  useEffect(() => {
    // In a real app, this would fetch the user's resumes from an API
    // For this demo, we'll use the mock data
    setResumes(mockResumes);
  }, []);
  
  if (!user) {
    // Redirect to login if not authenticated
    navigate("/login");
    return null;
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentUser={user} onLogout={logout} />
      
      <main className="flex-grow pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Your Resumes</h1>
          <Link to="/resume/new">
            <Button>
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Resume
            </Button>
          </Link>
        </div>
        
        {resumes.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No resumes yet</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new resume.</p>
            <div className="mt-6">
              <Link to="/resume/new">
                <Button>
                  <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create New Resume
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resumes.map((resume) => (
              <div key={resume.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow border border-gray-200">
                <div className="p-5">
                  <h3 className="text-lg font-medium text-gray-900 truncate">
                    {resume.personalInfo.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Last updated: {resume.updatedAt instanceof Date 
                      ? resume.updatedAt.toLocaleDateString() 
                      : new Date(resume.updatedAt as unknown as string).toLocaleDateString()}
                  </p>
                  <div className="flex mt-4 space-x-2">
                    <Link to={`/resume/edit/${resume.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        Edit
                      </Button>
                    </Link>
                    <Link to={`/resume/preview/${resume.id}`} className="flex-1">
                      <Button className="w-full">
                        Preview
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Create New Resume Card */}
            <Link to="/resume/new">
              <div className="bg-gray-50 rounded-lg border border-dashed border-gray-300 hover:bg-gray-100 transition-colors h-full flex flex-col items-center justify-center p-5 cursor-pointer">
                <svg className="h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Create new resume</h3>
              </div>
            </Link>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default DashboardPage;
